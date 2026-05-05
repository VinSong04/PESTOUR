<?php

namespace App\Providers;

use App\Models\Match_;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     */
    public function boot(): void
    {
        // Bind {match} route parameter to the Match_ model
        // (since the class name differs from the param name)
        Route::model('match', Match_::class);

        parent::boot();
    }
}
