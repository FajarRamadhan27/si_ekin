<?php

use App\Http\Controllers\AssesmentController;
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

    // Employee
    Route::get('employee', [UserController::class, 'getEmployee']);
    Route::post('employee', [UserController::class, 'create']);
    Route::delete('employee', [UserController::class, 'delete']);
    Route::get('employee/ava', [UserController::class, 'getAva']);
    Route::get('employee/getTotalEmployee', [UserController::class, 'getTotalEmployee']);
    Route::get('employee/findUser/{key}', [UserController::class, 'findUser']);
    Route::put('employee/{id}', [UserController::class, 'update']);
    Route::get('employee/{id}', [UserController::class, 'getDetailEmployee']);
    Route::put('employee/{id}/changePassword', [UserController::class, 'changePassword']);
    Route::put('employee/{id}/activeYn', [UserController::class, 'changeActiveYn']);

    // Assessment
    Route::get('assessments/{period}', [AssesmentController::class, 'index']);
    Route::get('assessments/getUserAssessmentByPeriod/{userId}/{period}', [AssesmentController::class, 'getUserAssessmentByPeriod']);
    Route::get('assessments/kpi/getKpiIndex', [AssesmentController::class, 'kpiIndex']);
    Route::get('assessments/rank/{period}', [AssesmentController::class, 'getRank']);
    Route::get('assessments/approval/{period}', [AssesmentController::class, 'assessmentsApproval']);
    Route::put('assessments', [AssesmentController::class, 'edit']);
    Route::put('assessments/bulkShowYn', [AssesmentController::class, 'bulkShowYn']);
    Route::put('assessments/bulkApprove', [AssesmentController::class, 'bulkApprove']);
    Route::put('assessments/{id}/showYn', [AssesmentController::class, 'showAssessmentYn']);
    Route::put('assessments/{id}/approveYn', [AssesmentController::class, 'approveAssessmentsYn']);
    Route::get('assessments/history/{id_user}/{period}', [AssesmentController::class, 'assessmentHistory']);
    Route::delete('assessments/{id}', [AssesmentController::class, 'deleteAssessment']);
});
