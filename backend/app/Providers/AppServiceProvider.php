<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\UploadedFile;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('isFile', function (
            $attribute,
            $value,
            $parameters,
            $validator
        ) {
            return is_string($value) || $value instanceof UploadedFile;
        });
    }
}
