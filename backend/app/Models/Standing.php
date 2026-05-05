<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Standing extends Model
{
    use HasFactory;

    protected $fillable = [
        'tournament_id',
        'player_id',
        'matches_played',
        'won',
        'drawn',
        'lost',
        'goals_for',
        'goals_against',
        'goal_difference',
        'points',
    ];

    protected function casts(): array
    {
        return [
            'matches_played' => 'integer',
            'won' => 'integer',
            'drawn' => 'integer',
            'lost' => 'integer',
            'goals_for' => 'integer',
            'goals_against' => 'integer',
            'goal_difference' => 'integer',
            'points' => 'integer',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /* ── Relationships ─────────────────────────────────── */

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    /* ── Scopes ─────────────────────────────────────────── */

    public function scopeForTournament($query, int $tournamentId)
    {
        return $query->where('tournament_id', $tournamentId);
    }

    public function scopeRanked($query)
    {
        return $query->orderByDesc('points')
                     ->orderByDesc('goal_difference')
                     ->orderByDesc('goals_for');
    }
}
