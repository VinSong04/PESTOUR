<?php

return [
    'default' => env('APP_NAME', 'PESTOUR'),
    'prefix' => env('CACHE_PREFIX', 'pestour_cache_'),

    'stores' => [
        'file' => [
            'driver' => 'file',
            'path' => storage_path('framework/cache/data'),
            'lock_path' => storage_path('framework/cache/data'),
        ],
    ],
];
