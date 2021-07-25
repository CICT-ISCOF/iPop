<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AgeDependencyRatioController;
use App\Http\Controllers\AgeDistributionAgeDependencyRatioController;
use App\Http\Controllers\AgeDistributionController;
use App\Http\Controllers\AgeDistributionRatioController;
use App\Http\Controllers\AgeProfileController;
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
use App\Http\Controllers\MPCFDCPersonnelController;
use App\Http\Controllers\MPCFDCTeamController;
use App\Http\Controllers\MTCMMembersController;
use App\Http\Controllers\MunicipalityADController;
use App\Http\Controllers\MunicipalOfficialController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OtherController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PersonnelDirectoryController;
use App\Http\Controllers\PMCAgeGroupController;
use App\Http\Controllers\PMCAMISController;
use App\Http\Controllers\PMCCSController;
use App\Http\Controllers\PMCESSController;
use App\Http\Controllers\PMCKFPController;
use App\Http\Controllers\PMOCController;
use App\Http\Controllers\PMOCTeamController;
use App\Http\Controllers\PopulationChartController;
use App\Http\Controllers\PopulationPyramidController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProfileSummaryController;
use App\Http\Controllers\ProgramAreaController;
use App\Http\Controllers\ProvincialOfficialController;
use App\Http\Controllers\QuickLinksController;
use App\Http\Controllers\RecordController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SBMemberController;
use App\Http\Controllers\SBMPTCController;
use App\Http\Controllers\SBMPTCFocalPersonController;
use App\Http\Controllers\SBMPTCPersonnelController;
use App\Http\Controllers\SBMPTCTeamController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceOfferController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\TechnicalNotesController;
use App\Http\Controllers\TeenageBirthIncidenceGraphController;
use App\Http\Controllers\TomtomController;
use App\Http\Controllers\TopPopulationController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPermissionController;
use App\Http\Controllers\UserRoleController;
use App\Models\File;

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
        Route::get('/municipality-code', [LocationController::class, 'getMuncipalityCode']);
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
        Route::apiResource('uploads', UploadController::class);
        Route::get('for-approvals', [UploadController::class, 'approvals']);
        Route::apiResource('others', OtherController::class);



        // Comments
        Route::apiResource('comments', CommentController::class)->except(['index']);

        // Bulk data
        Route::get('/bulk', [BulkController::class, 'requests']);
        Route::get('/bulk/{id}', [BulkController::class, 'view',]);
        Route::get('/bulk/self', [BulkController::class, 'self',]);
        Route::post('/bulk', [BulkController::class, 'insert',]);
        Route::post('/bulk/one', [BulkController::class, 'insertOne',]);
        Route::post('/bulk/{bulkImportRequest}/approve', [BulkController::class, 'approve']);

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

    Route::get('/statistic-profiles/by-municipality', [ProfileController::class, 'byMunicipality']);
    Route::get('/birth-statistics/summary', [BirthStatisticController::class, 'summary']);
    Route::get('/death-statistics/summary', [DeathStatisticController::class, 'summary']);
    Route::get('/migration-statistics/summary', [MigrationStatisticController::class, 'summary']);

    Route::get('/articles/today', [ArticleController::class, 'today']);
    Route::get('/articles/week', [ArticleController::class, 'week']);
    Route::get('/articles/month', [ArticleController::class, 'month']);
    Route::get('/approvals/count', [ApprovalController::class, 'count']);
    
    

    Route::apiResources([
        'articles' => ArticleController::class,
        'sbmptcs' => SBMPTCController::class,
        'sbmptc-personnel' => SBMPTCPersonnelController::class,
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
        'age-distribution-statistics' => AgeDistributionController::class,
        'top-populations' => TopPopulationController::class,
        'pmc-age-group' => PMCAgeGroupController::class,
        'pmc-ess' => PMCESSController::class,
        'pmc-amis' => PMCAMISController::class,
        'pmc-kfp' => PMCKFPController::class,
        'pmc-ccs' => PMCCSController::class,
        'pmc-personel' => MPCFDCPersonnelController::class,
        // Municipality Age Distribution and Age Dependency
        'm-ad' => MunicipalityADController::class,
        'population-chart' => PopulationChartController::class,
        'population-pyramid' => PopulationPyramidController::class,
        'age-profile' => AgeProfileController::class,
        'profile-summary' => ProfileSummaryController::class,
        // Extras
        'quick-links' => QuickLinksController::class,
        'technical-notes' => TechnicalNotesController::class,
        'personnel-directory' => PersonnelDirectoryController::class,
        'age-distribution-ratio' => AgeDistributionRatioController::class,
        'age-dependency-ratio' => AgeDependencyRatioController::class,
        // New ( Book Reference )
        'adaadr' => AgeDistributionAgeDependencyRatioController::class,
        
    ]);
    Route::get('birth-statistics-by-municipality',[BirthStatisticController::class,'byMunicipality']);
        
        

    Route::get('/statistic-profile/total', [ProfileController::class, 'total']);

    // Delete 1 award media
    Route::delete('/awards/medias/{media}', [AwardController::class, 'deleteAwardMedia']);

    // Delete 1 file
    Route::delete('/file/{id}', [FileController::class, 'destroy']);

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
