<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Match_;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MatchController extends Controller
{
    /**
     * GET /api/matches
     *
     * List matches with optional filters (tournament_id, status).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Match_::with(['homePlayer', 'awayPlayer', 'tournament']);

        if ($request->has('tournament_id')) {
            $query->where('tournament_id', $request->tournament_id);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $matches = $query->orderBy('match_date')->get();

        return response()->json($matches);
    }

    /**
     * GET /api/matches/{id}
     *
     * Show a single match with full details.
     */
    public function show(Match_ $match): JsonResponse
    {
        $match->load(['homePlayer', 'awayPlayer', 'tournament']);

        return response()->json($match);
    }

    /**
     * POST /api/admin/matches
     *
     * Create a new match (Admin only).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
            'home_player_id' => 'required|exists:players,id',
            'away_player_id' => 'required|exists:players,id|different:home_player_id',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'status' => 'sometimes|in:scheduled,live,completed,cancelled',
            'match_date' => 'nullable|date',
        ]);

        $match = Match_::create($validated);
        $match->load(['homePlayer', 'awayPlayer']);

        return response()->json($match, 201);
    }

    /**
     * PUT /api/admin/matches/{id}
     *
     * Update a match — typically used to record scores.
     * This triggers the MatchObserver which auto-recalculates standings.
     */
    public function update(Request $request, Match_ $match): JsonResponse
    {
        $validated = $request->validate([
            'home_player_id' => 'sometimes|exists:players,id',
            'away_player_id' => 'sometimes|exists:players,id',
            'home_score' => 'nullable|integer|min:0',
            'away_score' => 'nullable|integer|min:0',
            'status' => 'sometimes|in:scheduled,live,completed,cancelled',
            'match_date' => 'nullable|date',
        ]);

        $match->update($validated);
        $match->load(['homePlayer', 'awayPlayer']);

        return response()->json($match);
    }

    /**
     * PUT /api/admin/matches/{id}/score
     *
     * Convenience endpoint: update only the score and auto-complete the match.
     * This is the primary way admins will record match results.
     */
    public function updateScore(Request $request, Match_ $match): JsonResponse
    {
        $validated = $request->validate([
            'home_score' => 'required|integer|min:0',
            'away_score' => 'required|integer|min:0',
        ]);

        $match->update([
            'home_score' => $validated['home_score'],
            'away_score' => $validated['away_score'],
            'status' => 'completed',
        ]);

        $match->load(['homePlayer', 'awayPlayer']);

        return response()->json([
            'match' => $match,
            'message' => 'Score updated. Standings have been automatically recalculated.',
        ]);
    }

    /**
     * DELETE /api/admin/matches/{id}
     *
     * Delete a match (Admin only).
     */
    public function destroy(Match_ $match): JsonResponse
    {
        $tournamentId = $match->tournament_id;
        $match->delete();

        // Trigger a standings recalculation by creating a dummy event
        // Since we deleted the match, we need to manually trigger recalc
        $this->recalculateStandingsForTournament($tournamentId);

        return response()->json(['message' => 'Match deleted. Standings recalculated.']);
    }

    /**
     * Manually recalculate standings after a match deletion.
     */
    private function recalculateStandingsForTournament(int $tournamentId): void
    {
        $matches = Match_::where('tournament_id', $tournamentId)
            ->where('status', 'completed')
            ->whereNotNull('home_score')
            ->whereNotNull('away_score')
            ->get();

        $standings = \App\Models\Standing::where('tournament_id', $tournamentId)->get();

        // Reset all standings
        foreach ($standings as $standing) {
            $standing->update([
                'matches_played' => 0,
                'won' => 0,
                'drawn' => 0,
                'lost' => 0,
                'goals_for' => 0,
                'goals_against' => 0,
                'goal_difference' => 0,
                'points' => 0,
            ]);
        }

        // Re-aggregate from remaining matches
        $stats = [];
        foreach ($matches as $m) {
            foreach ([$m->home_player_id, $m->away_player_id] as $pid) {
                if (!isset($stats[$pid])) {
                    $stats[$pid] = [
                        'matches_played' => 0, 'won' => 0, 'drawn' => 0, 'lost' => 0,
                        'goals_for' => 0, 'goals_against' => 0, 'goal_difference' => 0, 'points' => 0,
                    ];
                }
            }

            $stats[$m->home_player_id]['matches_played']++;
            $stats[$m->away_player_id]['matches_played']++;
            $stats[$m->home_player_id]['goals_for'] += $m->home_score;
            $stats[$m->home_player_id]['goals_against'] += $m->away_score;
            $stats[$m->away_player_id]['goals_for'] += $m->away_score;
            $stats[$m->away_player_id]['goals_against'] += $m->home_score;

            if ($m->home_score > $m->away_score) {
                $stats[$m->home_player_id]['won']++;
                $stats[$m->home_player_id]['points'] += 3;
                $stats[$m->away_player_id]['lost']++;
            } elseif ($m->away_score > $m->home_score) {
                $stats[$m->away_player_id]['won']++;
                $stats[$m->away_player_id]['points'] += 3;
                $stats[$m->home_player_id]['lost']++;
            } else {
                $stats[$m->home_player_id]['drawn']++;
                $stats[$m->home_player_id]['points'] += 1;
                $stats[$m->away_player_id]['drawn']++;
                $stats[$m->away_player_id]['points'] += 1;
            }
        }

        foreach ($stats as $playerId => $s) {
            $s['goal_difference'] = $s['goals_for'] - $s['goals_against'];
            \App\Models\Standing::updateOrCreate(
                ['tournament_id' => $tournamentId, 'player_id' => $playerId],
                $s
            );
        }
    }
}
