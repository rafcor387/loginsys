<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Http\Controllers\RepuestoController;
use App\Http\Controllers\ProveedorController;
use App\Http\Controllers\DetalleRepuestoProveedorController;

use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\User\PostController;
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



    Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->name('verification.send');



});

Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])
    ->middleware(['signed'])
    ->name('verification.verify');


// Rutas para Repuestos
Route::apiResource('repuestos', RepuestoController::class);

// Rutas para Proveedores
Route::apiResource('proveedores', ProveedorController::class);

// Rutas para DetalleRepuestoProveedor
Route::apiResource('detalle-repuesto-proveedor', DetalleRepuestoProveedorController::class);
Route::put('/repuestos/{id}', [RepuestoController::class, 'update']);
Route::delete('/repuestos/{id}', [RepuestoController::class, 'destroy']);
