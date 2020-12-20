<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AwardController;
use App\Http\Controllers\BarangayOfficialController;
use App\Http\Controllers\BirthController;
use App\Http\Controllers\BirthStatisticController;
use App\Http\Controllers\BulkController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\ChartController;
use App\Http\Controllers\DeathController;
use App\Http\Controllers\CPDBController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CountController;
use App\Http\Controllers\DeathStatisticController;
use App\Http\Controllers\MarriageController;
use App\Http\Controllers\InMigrationController;
use App\Http\Controllers\OutMigrationController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\IncidenceController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\MigrationRateController;
use App\Http\Controllers\MigrationStatisticController;
use App\Http\Controllers\ModelPermissionController;
use App\Http\Controllers\MonthChartController;
use App\Http\Controllers\MPCFDCController;
use App\Http\Controllers\MPCFDCTeamController;
use App\Http\Controllers\MTCMMembersController;
use App\Http\Controllers\MunicipalOfficialController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PMOCController;
use App\Http\Controllers\PMOCTeamController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramAreaController;
use App\Http\Controllers\ProvincialOfficialController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SBMemberController;
use App\Http\Controllers\SBMPTCController;
use App\Http\Controllers\SBMPTCFocalPersonController;
use App\Http\Controllers\SBMPTCTeamController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceOfferController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\TeenageBirthIncidenceGraphController;
use App\Http\Controllers\TomtomController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\UserRoleController;

Route::middleware('throttle:60,1')->group(function () {
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
        Route::get('/search/geocode', [TomtomController::class, 'search']);
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

        // Comments
        Route::apiResource('comments', CommentController::class)->except(['index']);

        // Bulk data
        Route::post('/bulk', [BulkController::class, 'insert',]);
        Route::post('/bulk/one', [BulkController::class, 'insertOne',]);


        // Sockets
        Route::get('/sockets/all', [ChannelController::class, 'index']);
        Route::get('/sockets/comments', [ChannelController::class, 'comments']);
        Route::get('/sockets/record', [ChannelController::class, 'record']);

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

    Route::prefix('/statistics')->group(function () {
        Route::get('/general', [StatisticsController::class, 'index']);
        Route::get('/population', [StatisticsController::class, 'population']);
        Route::get('/totals', [StatisticsController::class, 'totals']);
        Route::get('/genders', [StatisticsController::class, 'genders']);
        Route::get('/municipality', [
            StatisticsController::class,
            'municipality',
        ]);
        Route::get('/months', [StatisticsController::class, 'months']);
        Route::get('/distributions', [
            StatisticsController::class,
            'distributions',
        ]);
        Route::get('/filter', [StatisticsController::class, 'filter']);
    });

    Route::get('/counts', [CountController::class, 'count']);
    Route::get('/counts/type', [CountController::class, 'countByType']);

    Route::prefix('/officials')->group(function () {
        Route::apiResources([
            'municipalities' => MunicipalOfficialController::class,
            'barangays' => BarangayOfficialController::class,
        ]);
    });

    Route::apiResources([
        'articles' => ArticleController::class,
        'sbmptcs' => SBMPTCController::class,
        'sbmptcs-teams' => SBMPTCTeamController::class,
        'sbmptcs-focal-persons' => SBMPTCFocalPersonController::class,
        'mtcms' => MTCMMembersController::class,
        'approvals' => ApprovalController::class,
        'birth-statistics' => BirthStatisticController::class,
        'death-statistics' => DeathStatisticController::class,
        'migration-rates' => MigrationRateController::class,
        'migration-statistics' => MigrationStatisticController::class,
        'mpcfdcs' => MPCFDCController::class,
        'mpcfdc-teams' => MPCFDCTeamController::class,
        'pmoccs' => PMOCController::class,
        'pmocc-teams' => PMOCTeamController::class,
        'provincial-officials' => ProvincialOfficialController::class,
        'sb-members' => SBMemberController::class,
        'teenage-birth-incidence-graphs' => TeenageBirthIncidenceGraphController::class,
        'activities' => ActivityController::class,
        'awards' => AwardController::class,
        'program-areas' => ProgramAreaController::class,
        'services' => ServiceController::class,
        'service-offers' => ServiceOfferController::class,
        'statistic-profiles' => ProfileController::class,
        'charts' => ChartController::class,
        'incidences' => IncidenceController::class,
        'month-charts' => MonthChartController::class,
    ]);

    // Delete 1 award media
    Route::delete('/awards/medias/{media}', [AwardController::class, 'deleteAwardMedia']);

    // Delete 1 program area file
    Route::delete('/program-areas/activity-files/{file}', [ActivityController::class, 'deleteActivityFile']);

    // CMS
    Route::apiResource('sliders', SliderController::class);

    // Notifications
    Route::get('/notifications', [NotificationController::class, 'all']);
    Route::post('/notifications/{notification}', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/all', [NotificationController::class, 'markAllAsRead']);
});

// Public Files
// Ex. http://localhost:8000/file/public/1
// Ex. http://localhost:8000/file/public/download/1
Route::prefix('/file/public')->group(function () {
    Route::get('/{file}', [FileController::class, 'streamPublic']);
    Route::get('/download/{file}', [FileController::class, 'downloadPublic']);
});

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
