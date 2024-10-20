<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\RepuestoController;
use App\Http\Controllers\EmpleadoController;

use App\Http\Controllers\Auth\VerifyEmailController;
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

// Rutas públicas (sin protección de autenticación)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/*
Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');
*/
// Rutas protegidas por Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Obtener el usuario autenticado
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // Obtener el email del usuario autenticado
    Route::get('/user/email', [AuthController::class, 'getUserEmail']);
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    /*
    Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->name('verification.send');
*/

    Route::apiResource('empleados', EmpleadoController::class);

    Route::apiResource('repuestos', RepuestoController::class);

});
