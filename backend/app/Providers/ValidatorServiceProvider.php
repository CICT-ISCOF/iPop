<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;
use Exception;

class ValidatorServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
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
            if($value instanceof UploadedFile) {
                return true;
            }
            try {
                file_get_contents($value);
                return true;
            } catch(Exception $e) {
                return false;
            }
        });

        Validator::extend('base64', function($attribute, $value, $parameters, $validator) {
            return base64_encode(base64_decode($value, true)) === $value;
        });
    }
}
