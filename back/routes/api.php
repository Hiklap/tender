<?php

use App\Http\Controllers\ExercisesController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\OrdersController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SchedulesController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpKernel\Profiler\Profile;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signup', [RegisterController::class, 'store'])->middleware('guest');
Route::post('/login', [LoginController::class, 'store'])->middleware('guest');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile/update', [ProfileController::class, 'update']);

    Route::get('/exercises', [ExercisesController::class, 'index']);
    Route::get('/exercises/{exercise}', [ExercisesController::class, 'show']);
    Route::post('/exercises', [ExercisesController::class, 'store']);

    Route::get('/orders', [OrdersController::class, 'index']);
    Route::get('/orders/{order}', [OrdersController::class, 'show']);
    Route::post('/orders', [OrdersController::class, 'store']);
    Route::put('/orders/{order}', [OrdersController::class, 'update']);
    Route::delete('/orders/{order}', [OrdersController::class, 'destroy']);
    Route::get('/my-orders', [OrdersController::class, 'myOrders']);

    Route::get('/schedules', [SchedulesController::class, 'index']);
    Route::get('/schedules/{schedule}', [SchedulesController::class, 'show']);
    Route::post('/schedules', [SchedulesController::class, 'store']);

});