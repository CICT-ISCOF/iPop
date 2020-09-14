<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\File;

Route::post('/test', function(Request $request) {
    return $request->all();
});

Route::get('/test', function(Request $request) {
    return [];
});

Route::put('/test/{id}', function(Request $request, $id) {
    return $id;
});

Route::delete('/test/{id}', function(Request $request, $id) {
    return $id;
});

Route::prefix('/auth')->group(function () {
    Route::post('/login', 'Auth\LoginController@authenticate');
});

Route::prefix('/location')->group(function () {
    Route::get('/regions', 'LocationController@regions');
    Route::get('/provinces', 'LocationController@provinces');
    Route::get('/municipalities', 'LocationController@municipalities');
    Route::get('/barangays', 'LocationController@barangays');
    Route::get('/search', 'LocationController@search');
});

Route::options('/logs/visit', 'LogController@visit');

Route::middleware(['auth:sanctum', 'restrict.blocked'])->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('/register', 'Auth\RegisterController@register');
        Route::get('/logout', 'Auth\LoginController@logout');
    });

    Route::apiResource('users', 'UserController');
    Route::get('/search/users', 'SearchController@users');
    Route::get('/search/records', 'SearchController@records');
    Route::get('/search/status', 'SearchController@status');

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
    Route::apiResource('cpdb', 'CPDBController');
    Route::apiResource('records', 'RecordController')->except([
        'store',
        'destroy',
    ]);
    Route::prefix('/statistics')->group(function () {
        Route::get('/general', 'StatisticsController@index');
        Route::get('/population', 'StatisticsController@population');
        Route::get('/totals', 'StatisticsController@totals');
        Route::get('/genders', 'StatisticsController@genders');
        Route::get('/municipality', 'StatisticsController@municipality');
        Route::get('/months', 'StatisticsController@months');
        Route::get('/distributions', 'StatisticsController@distributions');
        Route::get('/filter', 'StatisticsController@filter');
    });

    // Comments
    Route::apiResource('comments', 'CommentController')->except(['index']);
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
