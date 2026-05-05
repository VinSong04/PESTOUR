<?php

namespace App\Providers;

use App\Models\Match_;
use App\Observers\MatchObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Register the Match observer for automatic standings recalculation
        Match_::observe(MatchObserver::class);
    }
}
