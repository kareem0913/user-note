<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\ResetPassword;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerfiyEmailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [ForgotPassword::class, 'forgotPassword']);
Route::post('/reset-password', [ResetPassword::class, 'reset']);
Route::post('/verify-email', [VerfiyEmailController::class, 'verifyEmail']);

// Route::patch('/reset-password', [ResetPassword::class, 'reset']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/profile', [UserController::class, 'getUser']);
    Route::post('/profile', [UserController::class, 'update']);
    // Route::put('/profile', [UserController::class, 'update']);

    // tasks routes
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks/{task}', [TaskController::class, 'show']);
    // Route::put('/tasks/{task}', [TaskController::class, 'update']);
    Route::post('/tasks/{task}', [TaskController::class, 'update']);
    Route::put('tasks/toggle-complete/{task}', [TaskController::class, 'toggleCompleted']);
    Route::delete('/tasks/{task}', [TaskController::class, 'destroy']);
});



Route::get('/test', [AuthController::class, 'test']);
