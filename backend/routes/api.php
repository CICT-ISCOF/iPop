<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


/*-------------------------------------------------------------------------
 								API Routes
-------------------------------------------------------------------------*/


Route::apiResource('link', 'LinkController');

Route::prefix('/auth')->group(function () {
    Route::post('/login', 'Auth\LoginController@authenticate');
    Route::post('/register', 'Auth\RegisterController@register');
});

Route::get('/file/{file}', 'FileController@stream');
Route::get('/download/{file}', 'FileController@download');
