<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BirthController;
use App\Http\Controllers\BulkController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\DeathController;
use App\Http\Controllers\CPDBController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\MarriageController;
use App\Http\Controllers\InMigrationController;
use App\Http\Controllers\OutMigrationController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\ModelPermissionController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\StatisticController;
use App\Http\Controllers\StatisticNoteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\UserRoleController;

Route::prefix('/auth')->group(function () {
    Route::post('/login', [LoginController::class, 'authenticate']);
    Route::post('/register/viewer', [RegisterController::class, 'viewer']);
});

Route::prefix('/location')->group(function () {
    Route::get('/regions', [LocationController::class, 'regions']);
    Route::get('/provinces', [LocationController::class, 'provinces']);
    Route::get('/municipalities', [
        LocationController::class,
        'municipalities',
    ]);
    Route::get('/barangays', [LocationController::class, 'barangays']);
    Route::get('/search', [LocationController::class, 'search']);
});

Route::options('/logs/visit', [LogController::class, 'visit']);

Route::middleware(['auth:sanctum', 'restrict.blocked'])->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('/register', [RegisterController::class, 'register']);
        Route::get('/logout', [LoginController::class, 'logout']);
    });

    Route::apiResource('users', UserController::class);
    Route::get('/search/users', [SearchController::class, 'users']);
    Route::get('/search/records', [SearchController::class, 'records']);
    Route::get('/search/status', [SearchController::class, 'status']);
    Route::get('/search/logs', [SearchController::class, 'logs']);

    // Files
    // Private Files
    // Ex. http://localhost:8000/file/private/1
    // Ex. http://localhost:8000/file/private/download/1
    Route::prefix('/file/private')->group(function () {
        Route::get('/{file}', [FileController::class, 'streamPrivate']);
        Route::get('/download/{file}', [
            FileController::class,
            'downloadPrivate',
        ]);
    });

    // User Logs
    Route::get('/logs', [LogController::class, 'index']);
    Route::delete('/logs/{log}', [LogController::class, 'destroy']);
    Route::delete('/logs/clear', [LogController::class, 'clear']);

    Route::apiResource('births', BirthController::class);
    Route::apiResource('deaths', DeathController::class);
    Route::apiResource('in-migrations', InMigrationController::class);
    Route::apiResource('out-migrations', OutMigrationController::class);
    Route::apiResource('marriages', MarriageController::class);
    Route::apiResource('cpdb', CPDBController::class);
    Route::apiResource('records', RecordController::class)->except([
        'store',
        'destroy',
    ]);

    Route::get('/counts', [CountController::class, 'count']);
    Route::get('/counts/type', [CountController::class, 'countByType']);

    // Comments
    Route::apiResource('comments', CommentController::class)->except(['index']);

    // Bulk data
    Route::post('/bulk', [BulkController::class, 'insert',]);
    Route::post('/bulk/one', [BulkController::class, 'insertOne',]);


    // Sockets
    Route::get('/sockets/all', [ChannelController::class, 'index']);
    Route::get('/sockets/comments', [ChannelController::class, 'comments']);
    Route::get('/sockets/record', [ChannelController::class, 'record']);

    // Statistics
    Route::apiResource('statistics', StatisticController::class);
    Route::prefix('/statistics')->apiResource('notes', StatisticNoteController::class);

    // Security
    Route::apiResource('roles', RoleController::class)->except('update');
    Route::prefix('/roles')->group(function () {
        Route::post('/assign', [UserRoleController::class, 'assign']);
        Route::post('/remove', [UserRoleController::class, 'remove']);
    });

    Route::apiResource('permissions', PermissionController::class)->except('update');
    Route::prefix('/permissions')->group(function () {
        Route::apiResource('models', ModelPermissionController::class)->except('update');
        Route::post('/assign', [UserPermissionController::class, 'assign']);
        Route::post('/remove', [UserPermissionController::class, 'remove']);
    });
});



// Public Files
// Ex. http://localhost:8000/file/public/1
// Ex. http://localhost:8000/file/public/download/1
Route::prefix('/file/public')->group(function () {
    Route::get('/{file}', [FileController::class, 'streamPublic']);
    Route::get('/download/{file}', [FileController::class, 'downloadPublic']);
});
