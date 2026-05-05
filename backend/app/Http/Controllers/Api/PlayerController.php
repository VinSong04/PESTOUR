<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Player;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * GET /api/players
     *
     * List all players with optional active filter.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Player::query();

        if ($request->has('active')) {
            $query->where('is_active', filter_var($request->active, FILTER_VALIDATE_BOOLEAN));
        }

        $players = $query->orderBy('name')->get();

        return response()->json($players);
    }

    /**
     * GET /api/players/{id}
     *
     * Show a single player with their standings across tournaments.
     */
    public function show(Player $player): JsonResponse
    {
        $player->load(['standings.tournament']);

        return response()->json($player);
    }

    /**
     * POST /api/admin/players
     *
     * Create a new player (Admin only).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'in_game_name' => 'nullable|string|max:255',
            'team_name' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
        ]);

        $player = Player::create($validated);

        return response()->json($player, 201);
    }

    /**
     * PUT /api/admin/players/{id}
     *
     * Update a player (Admin only).
     */
    public function update(Request $request, Player $player): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'in_game_name' => 'nullable|string|max:255',
            'team_name' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
        ]);

        $player->update($validated);

        return response()->json($player);
    }

    /**
     * DELETE /api/admin/players/{id}
     *
     * Delete a player (Admin only).
     */
    public function destroy(Player $player): JsonResponse
    {
        $player->delete();

        return response()->json(['message' => 'Player deleted successfully.']);
    }
}
