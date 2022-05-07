<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [UserController::class, 'register']);
Route::post('login',    [UserController::class, 'login']);

Route::middleware('sanctum')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'dashboard']);
    Route::get('employee', [UserController::class, 'getEmployee']);

    Route::post('employee', [UserController::class, 'create']);
    Route::delete('employee', [UserController::class, 'delete']);
    Route::get('employee/ava', [UserController::class, 'getAva']);
    Route::put('employee/{id}', [UserController::class, 'update']);
    Route::get('employee/{id}', [UserController::class, 'getDetailEmployee']);
    Route::put('employee/{id}/changePassword', [UserController::class, 'changePassword']);
    Route::get('assessments/{period}', [UserController::class, 'getAssessments']);
});
