<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Match_ model (underscore suffix to avoid PHP reserved word conflict).
 *
 * The table name is 'matches' — the class is aliased as Match_ purely
 * because `match` is a reserved keyword in PHP 8.x.
 */
class Match_ extends Model
{
    use HasFactory;

    protected $table = 'matches';

    protected $fillable = [
        'tournament_id',
        'home_player_id',
        'away_player_id',
        'home_score',
        'away_score',
        'status',
        'match_date',
    ];

    protected function casts(): array
    {
        return [
            'home_score' => 'integer',
            'away_score' => 'integer',
            'match_date' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /* ── Relationships ─────────────────────────────────── */

    public function tournament(): BelongsTo
    {
        return $this->belongsTo(Tournament::class);
    }

    public function homePlayer(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'home_player_id');
    }

    public function awayPlayer(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'away_player_id');
    }

    /* ── Scopes ─────────────────────────────────────────── */

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopeScheduled($query)
    {
        return $query->where('status', 'scheduled');
    }

    public function scopeForTournament($query, int $tournamentId)
    {
        return $query->where('tournament_id', $tournamentId);
    }

    /* ── Helpers ─────────────────────────────────────────── */

    /**
     * Check if this match has a recorded score.
     */
    public function hasScore(): bool
    {
        return $this->home_score !== null && $this->away_score !== null;
    }

    /**
     * Determine the winner. Returns null for a draw.
     */
    public function getWinnerAttribute(): ?Player
    {
        if (!$this->hasScore()) return null;
        if ($this->home_score > $this->away_score) return $this->homePlayer;
        if ($this->away_score > $this->home_score) return $this->awayPlayer;
        return null; // Draw
    }
}
