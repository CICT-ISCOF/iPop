<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*-------------------------------------------------------------------------
 								API Routes
-------------------------------------------------------------------------*/

Route::apiResource('links', 'LinkController');

Route::prefix('/auth')->group(function () {
    Route::post('/login', 'Auth\LoginController@authenticate');
    Route::post('/register', 'Auth\RegisterController@register');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', 'UserController');
});

Route::get('/file/{file}', 'FileController@stream');
Route::get('/download/{file}', 'FileController@download');
