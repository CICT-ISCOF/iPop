<?php

use Illuminate\Support\Facades\Route;

Route::prefix('/auth')->group(function () {
    Route::post('/login', 'Auth\LoginController@authenticate');
});

Route::options('/logs/visit', 'LogController@visit');

Route::middleware(['auth:sanctum', 'restrict.blocked'])->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('/register', 'Auth\RegisterController@register');
        Route::get('/logout', 'Auth\LoginController@logout');
    });

    Route::apiResource('users', 'UserController');
    Route::get('/search', 'SearchController@search');

    // CMS
    Route::apiResource('links', 'LinkController');
    Route::apiResource('cards', 'CardController');
    Route::apiResource('texts', 'TextController');
    Route::apiResource('medias', 'SingleMediaController');
    Route::post('/sliders', 'SliderTableController@store');
    Route::delete('/sliders/{sliderTable}', 'SliderTableController@destroy');
    Route::post('/grids', 'GridTableController@store');
    Route::delete('/grids/{gridTable}', 'GridTableController@destroy');

    Route::resource('cpdb','CPDBController');


    // Files
    // Private Files
    // Ex. http://localhost:8000/file/private/1
    // Ex. http://localhost:8000/file/private/download/1
    Route::prefix('/file/private')->group(function () {
        Route::get('/{file}', 'FileController@streamPrivate');
        Route::get('/download/{file}', 'FileController@downloadPrivate');
    });

    // User Logs
    Route::get('/logs', 'LogController@index');
    Route::delete('/logs/{log}', 'LogController@destroy');
    Route::delete('/logs/clear', 'LogController@clear');

    // Statistics
    Route::apiResource('births', 'BirthController');
    Route::apiResource('deaths', 'DeathController');
    Route::apiResource('in-migrations', 'InMigrationController');
    Route::apiResource('out-migrations', 'OutMigrationController');
    Route::apiResource('marriages', 'MarriageController');
});

// Public Files
// Ex. http://localhost:8000/file/public/1
// Ex. http://localhost:8000/file/public/download/1
Route::prefix('/file/public')->group(function () {
    Route::get('/{file}', 'FileController@streamPublic');
    Route::get('/download/{file}', 'FileController@downloadPublic');
});

Route::fallback(function () {
    return response('', 404);
});
