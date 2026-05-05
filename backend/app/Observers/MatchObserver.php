<?php

namespace App\Observers;

use App\Models\Match_;
use App\Models\Standing;

/**
 * MatchObserver
 *
 * Automatically recalculates the standings table whenever a match score
 * is created or updated. This observer listens to `created` and `updated`
 * events on the Match_ model.
 *
 * Strategy: Full recalculation per tournament
 * ──────────────────────────────────────────────
 * Instead of incremental updates (which are error-prone with score edits),
 * we recalculate ALL standings for the affected tournament from scratch
 * on every change. This guarantees correctness.
 *
 * For a tournament-scale system (≤100 matches), this is negligible cost.
 */
class MatchObserver
{
    /**
     * Handle the Match_ "created" event.
     */
    public function created(Match_ $match): void
    {
        $this->recalculateStandings($match);
    }

    /**
     * Handle the Match_ "updated" event.
     */
    public function updated(Match_ $match): void
    {
        // Only recalculate if scores or status were actually changed
        if (
            $match->wasChanged('home_score') ||
            $match->wasChanged('away_score') ||
            $match->wasChanged('status')
        ) {
            $this->recalculateStandings($match);
        }
    }

    /**
     * Recalculate all standings for the tournament that this match belongs to.
     *
     * Approach:
     * 1. Fetch all completed matches for the tournament
     * 2. Aggregate stats per player
     * 3. Upsert standings rows
     */
    private function recalculateStandings(Match_ $match): void
    {
        $tournamentId = $match->tournament_id;

        // Get all completed matches for this tournament
        $matches = Match_::where('tournament_id', $tournamentId)
            ->where('status', 'completed')
            ->whereNotNull('home_score')
            ->whereNotNull('away_score')
            ->get();

        // Collect all unique player IDs involved in this tournament's matches
        $playerIds = $matches->pluck('home_player_id')
            ->merge($matches->pluck('away_player_id'))
            ->unique()
            ->values();

        // Also include players that already have standing rows (they may have 0 matches now)
        $existingPlayerIds = Standing::where('tournament_id', $tournamentId)
            ->pluck('player_id');
        $allPlayerIds = $playerIds->merge($existingPlayerIds)->unique()->values();

        // Initialize stats for every player
        $stats = [];
        foreach ($allPlayerIds as $playerId) {
            $stats[$playerId] = [
                'matches_played' => 0,
                'won' => 0,
                'drawn' => 0,
                'lost' => 0,
                'goals_for' => 0,
                'goals_against' => 0,
                'goal_difference' => 0,
                'points' => 0,
            ];
        }

        // Aggregate match results
        foreach ($matches as $m) {
            $homeId = $m->home_player_id;
            $awayId = $m->away_player_id;
            $homeScore = $m->home_score;
            $awayScore = $m->away_score;

            // Ensure both players have stat entries
            if (!isset($stats[$homeId])) continue;
            if (!isset($stats[$awayId])) continue;

            // Matches played
            $stats[$homeId]['matches_played']++;
            $stats[$awayId]['matches_played']++;

            // Goals
            $stats[$homeId]['goals_for'] += $homeScore;
            $stats[$homeId]['goals_against'] += $awayScore;
            $stats[$awayId]['goals_for'] += $awayScore;
            $stats[$awayId]['goals_against'] += $homeScore;

            // Win / Draw / Loss + Points
            if ($homeScore > $awayScore) {
                // Home win
                $stats[$homeId]['won']++;
                $stats[$homeId]['points'] += 3;
                $stats[$awayId]['lost']++;
            } elseif ($awayScore > $homeScore) {
                // Away win
                $stats[$awayId]['won']++;
                $stats[$awayId]['points'] += 3;
                $stats[$homeId]['lost']++;
            } else {
                // Draw
                $stats[$homeId]['drawn']++;
                $stats[$homeId]['points'] += 1;
                $stats[$awayId]['drawn']++;
                $stats[$awayId]['points'] += 1;
            }
        }

        // Calculate goal differences and upsert standings
        foreach ($stats as $playerId => $s) {
            $s['goal_difference'] = $s['goals_for'] - $s['goals_against'];

            Standing::updateOrCreate(
                [
                    'tournament_id' => $tournamentId,
                    'player_id' => $playerId,
                ],
                $s
            );
        }
    }
}
