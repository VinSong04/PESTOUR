<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Standing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StandingController extends Controller
{
    /**
     * GET /api/standings
     *
     * Get standings for a specific tournament.
     * Requires tournament_id query parameter.
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
        ]);

        $standings = Standing::where('tournament_id', $request->tournament_id)
            ->with('player')
            ->ranked()
            ->get()
            ->map(function ($standing) {
                return [
                    'id' => $standing->id,
                    'tournament_id' => $standing->tournament_id,
                    'player' => [
                        'id' => $standing->player->id,
                        'name' => $standing->player->name,
                        'in_game_name' => $standing->player->in_game_name,
                        'team_name' => $standing->player->team_name,
                    ],
                    'matches_played' => $standing->matches_played,
                    'won' => $standing->won,
                    'drawn' => $standing->drawn,
                    'lost' => $standing->lost,
                    'goals_for' => $standing->goals_for,
                    'goals_against' => $standing->goals_against,
                    'goal_difference' => $standing->goal_difference,
                    'points' => $standing->points,
                ];
            });

        return response()->json($standings);
    }

    /**
     * GET /api/standings/live/{tournamentId}
     *
     * Public endpoint for live standings — designed for the frontend
     * StandingsPage to poll or stream.
     */
    public function live(int $tournamentId): JsonResponse
    {
        $standings = Standing::where('tournament_id', $tournamentId)
            ->with('player')
            ->ranked()
            ->get();

        return response()->json([
            'tournament_id' => $tournamentId,
            'standings' => $standings,
            'last_updated' => now()->toIso8601String(),
        ]);
    }

    /**
     * POST /api/admin/standings/initialize
     *
     * Initialize standings for all players in a tournament.
     * Call this when starting a new tournament to pre-populate
     * the standings table with zero-stat rows.
     */
    public function initialize(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'tournament_id' => 'required|exists:tournaments,id',
            'player_ids' => 'required|array|min:1',
            'player_ids.*' => 'exists:players,id',
        ]);

        $created = [];
        foreach ($validated['player_ids'] as $playerId) {
            $standing = Standing::firstOrCreate(
                [
                    'tournament_id' => $validated['tournament_id'],
                    'player_id' => $playerId,
                ],
                [
                    'matches_played' => 0,
                    'won' => 0,
                    'drawn' => 0,
                    'lost' => 0,
                    'goals_for' => 0,
                    'goals_against' => 0,
                    'goal_difference' => 0,
                    'points' => 0,
                ]
            );
            $created[] = $standing;
        }

        return response()->json([
            'message' => count($created) . ' standings initialized.',
            'standings' => $created,
        ], 201);
    }
}
