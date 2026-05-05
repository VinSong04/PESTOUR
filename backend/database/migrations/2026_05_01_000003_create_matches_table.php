<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tournament_id')->constrained('tournaments')->onDelete('cascade');
            $table->foreignId('home_player_id')->constrained('players')->onDelete('cascade');
            $table->foreignId('away_player_id')->constrained('players')->onDelete('cascade');
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->enum('status', ['scheduled', 'live', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamp('match_date')->nullable();
            $table->timestamps();

            // Indexes for common queries
            $table->index('tournament_id');
            $table->index('status');
            $table->index(['tournament_id', 'status']);
            $table->index(['tournament_id', 'home_player_id']);
            $table->index(['tournament_id', 'away_player_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('matches');
    }
};
