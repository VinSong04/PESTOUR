<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MatchController;
use App\Http\Controllers\Api\PlayerController;
use App\Http\Controllers\Api\StandingController;
use App\Http\Controllers\Api\TournamentController;
use Illuminate\Support\Facades\Route;

/*
|──────────────────────────────────────────────────────────────────
| PESTOUR API Routes
|──────────────────────────────────────────────────────────────────
|
| Public routes:  accessible without authentication
| Auth routes:    require Sanctum token
| Admin routes:   require Sanctum token + is_admin flag
|
*/

// ═══════════════════════════════════════════════════════
// PUBLIC ROUTES — No authentication required
// ═══════════════════════════════════════════════════════

Route::prefix('v1')->group(function () {

    // ── Auth ───────────────────────────────────────────
    Route::post('/login', [AuthController::class, 'login']);

    // ── Tournaments (read-only) ────────────────────────
    Route::get('/tournaments', [TournamentController::class, 'index']);
    Route::get('/tournaments/{tournament}', [TournamentController::class, 'show']);

    // ── Players (read-only) ────────────────────────────
    Route::get('/players', [PlayerController::class, 'index']);
    Route::get('/players/{player}', [PlayerController::class, 'show']);

    // ── Matches (read-only) ────────────────────────────
    Route::get('/matches', [MatchController::class, 'index']);
    Route::get('/matches/{match}', [MatchController::class, 'show']);

    // ── Standings (live, public) ───────────────────────
    Route::get('/standings', [StandingController::class, 'index']);
    Route::get('/standings/live/{tournamentId}', [StandingController::class, 'live']);

    // ═══════════════════════════════════════════════════
    // AUTHENTICATED ROUTES — Require valid Sanctum token
    // ═══════════════════════════════════════════════════

    Route::middleware('auth:sanctum')->group(function () {

        // ── Auth ───────────────────────────────────────
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me', [AuthController::class, 'me']);

        // ═══════════════════════════════════════════════
        // ADMIN ROUTES — Require auth + admin middleware
        // ═══════════════════════════════════════════════

        Route::middleware('admin')->prefix('admin')->group(function () {

            // ── Tournament Management ──────────────────
            Route::post('/tournaments', [TournamentController::class, 'store']);
            Route::put('/tournaments/{tournament}', [TournamentController::class, 'update']);
            Route::delete('/tournaments/{tournament}', [TournamentController::class, 'destroy']);

            // ── Player Management ──────────────────────
            Route::post('/players', [PlayerController::class, 'store']);
            Route::put('/players/{player}', [PlayerController::class, 'update']);
            Route::delete('/players/{player}', [PlayerController::class, 'destroy']);

            // ── Match Management ───────────────────────
            Route::post('/matches', [MatchController::class, 'store']);
            Route::put('/matches/{match}', [MatchController::class, 'update']);
            Route::put('/matches/{match}/score', [MatchController::class, 'updateScore']);
            Route::delete('/matches/{match}', [MatchController::class, 'destroy']);

            // ── Standings Admin ────────────────────────
            Route::post('/standings/initialize', [StandingController::class, 'initialize']);
        });
    });
});
