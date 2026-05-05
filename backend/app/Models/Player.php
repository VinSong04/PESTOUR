<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'in_game_name',
        'team_name',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /* ── Relationships ─────────────────────────────────── */

    public function homeMatches(): HasMany
    {
        return $this->hasMany(Match_::class, 'home_player_id');
    }

    public function awayMatches(): HasMany
    {
        return $this->hasMany(Match_::class, 'away_player_id');
    }

    public function standings(): HasMany
    {
        return $this->hasMany(Standing::class, 'player_id');
    }

    /* ── Scopes ─────────────────────────────────────────── */

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /* ── Accessors ──────────────────────────────────────── */

    /**
     * Get all matches (home + away) for this player.
     */
    public function getAllMatchesAttribute()
    {
        return Match_::where('home_player_id', $this->id)
            ->orWhere('away_player_id', $this->id)
            ->get();
    }
}
