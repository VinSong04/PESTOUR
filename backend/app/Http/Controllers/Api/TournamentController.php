<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tournament;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TournamentController extends Controller
{
    /**
     * GET /api/tournaments
     *
     * List all tournaments with optional status filter.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Tournament::query();

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $tournaments = $query->orderByDesc('created_at')->get();

        return response()->json($tournaments);
    }

    /**
     * GET /api/tournaments/{id}
     *
     * Show a single tournament with its standings and match count.
     */
    public function show(Tournament $tournament): JsonResponse
    {
        $tournament->load([
            'standings' => fn($q) => $q->with('player')->ranked(),
            'matches' => fn($q) => $q->with(['homePlayer', 'awayPlayer'])->orderBy('match_date'),
        ]);

        return response()->json($tournament);
    }

    /**
     * POST /api/admin/tournaments
     *
     * Create a new tournament (Admin only).
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'sometimes|in:upcoming,ongoing,completed',
        ]);

        $tournament = Tournament::create($validated);

        return response()->json($tournament, 201);
    }

    /**
     * PUT /api/admin/tournaments/{id}
     *
     * Update a tournament (Admin only).
     */
    public function update(Request $request, Tournament $tournament): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'status' => 'sometimes|in:upcoming,ongoing,completed',
        ]);

        $tournament->update($validated);

        return response()->json($tournament);
    }

    /**
     * DELETE /api/admin/tournaments/{id}
     *
     * Delete a tournament and all related data (Admin only).
     */
    public function destroy(Tournament $tournament): JsonResponse
    {
        $tournament->delete();

        return response()->json(['message' => 'Tournament deleted successfully.']);
    }
}
