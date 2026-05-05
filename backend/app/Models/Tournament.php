<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tournament extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /* ── Relationships ─────────────────────────────────── */

    public function matches(): HasMany
    {
        return $this->hasMany(Match_::class, 'tournament_id');
    }

    public function standings(): HasMany
    {
        return $this->hasMany(Standing::class, 'tournament_id');
    }

    /* ── Scopes ─────────────────────────────────────────── */

    public function scopeOngoing($query)
    {
        return $query->where('status', 'ongoing');
    }

    public function scopeUpcoming($query)
    {
        return $query->where('status', 'upcoming');
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }
}
