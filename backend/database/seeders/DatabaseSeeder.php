<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tournament;
use App\Models\Player;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database with initial data for a fresh season.
     */
    public function run(): void
    {
        // ── Create Admin User ──────────────────────────
        User::create([
            'name' => 'Admin',
            'email' => 'admin@pestour.com',
            'password' => Hash::make('pestour2026'),
            'is_admin' => true,
        ]);

        // ── Create default tournament ──────────────────
        $tournament = Tournament::create([
            'name' => 'PALLET EFOOTBALL Summer 2026',
            'status' => 'upcoming',
        ]);

        // ── Pre-register sample players ────────────────
        $players = [
            ['name' => 'Player 1', 'in_game_name' => 'PRO_1', 'team_name' => 'FC Barcelona'],
            ['name' => 'Player 2', 'in_game_name' => 'PRO_2', 'team_name' => 'Real Madrid'],
            ['name' => 'Player 3', 'in_game_name' => 'PRO_3', 'team_name' => 'Manchester City'],
            ['name' => 'Player 4', 'in_game_name' => 'PRO_4', 'team_name' => 'Bayern Munich'],
        ];

        foreach ($players as $p) {
            Player::create($p);
        }

        $this->command->info('✅ Database seeded: 1 admin, 1 tournament, 4 sample players.');
    }
}
