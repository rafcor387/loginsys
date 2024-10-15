<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'name.required' => 'El campo de nombre es obligatorio.',
            'email.required' => 'El campo de correo electrónico es obligatorio.',
            'email.email' => 'Por favor, introduce una dirección de correo válida.',
            'password.required' => 'El campo de contraseña es obligatorio.',
            'password.confirmed' => 'Las contraseñas no coinciden.',
            'password.min' => 'El campo de contraseña debe tener al menos 8 caracteres.',
            'email.unique' => 'El campo email ya fue tomado.',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Envía el correo de verificación
        //event(new Registered($user));
        // Iniciar sesión al usuario

        $user->sendEmailVerificationNotification();


        return response()->json(['message' => 'Usuario registrado. Revisa tu correo para verificar tu cuenta.']);
    }

    // Login de usuario
    public function login(Request $request)
    {
        // Validación de los campos de email y password
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ], [
            'email.required' => 'El campo de correo electrónico es obligatorio.',
            'email.email' => 'Por favor, introduce una dirección de correo válida.',
            'password.required' => 'El campo de contraseña es obligatorio.',
        ]);


        // Verifica si las credenciales son correctas
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $user = Auth::user();

        // Verifica si el usuario tiene el correo electrónico verificado
        if (is_null($user->email_verified_at)) {
            return response()->json(['message' => 'Debes verificar tu correo electrónico para iniciar sesión'], 403);
        }

        // Crea y devuelve el token de autenticación si el correo está verificado
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login exitoso',
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    //acceder al usuario logueado
    public function getUserEmail(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => 'No estás autenticado.'], 401);
        }

        return response()->json(['email' => $request->user()->email]);
    }

    //cerrar la sesion de usuario
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout exitoso']);
    }

}
