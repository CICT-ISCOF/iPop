<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('/login', 'Auth\LoginController@authenticate');
    Route::post('/register', 'Auth\RegisterController@register');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('users', 'UserController');

    // CMS
    Route::apiResource('links', 'LinkController');
    Route::apiResource('cards', 'CardController');
    Route::apiResource('texts', 'TextController');
    Route::apiResource('medias', 'SingleMediaController');
    Route::post('/sliders', 'SliderTableController@store');
    Route::delete('/sliders/{sliderTable}', 'SliderTableController@destroy');
    Route::post('/grids', 'GridTableController@store');
    Route::delete('/grids/{gridTable}', 'GridTableController@destroy');

    // Files
    Route::prefix('/file/private')->group(function () {
        Route::get('/{file}', 'FileController@streamPrivate');
        Route::get('/download/{file}', 'FileController@downloadPrivate');
    });
});

Route::prefix('/file/public')->group(function () {
    Route::get('/{file}', 'FileController@streamPublic');
    Route::get('/download/{file}', 'FileController@downloadPublic');
});

Route::fallback(function () {
    return response('', 404);
});
