<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;

class MarcaController extends Controller
{
    // Obtener todas las marcas
    public function index()
    {
        $marcas = Marca::all(); // Obtiene todas las marcas
        return response()->json($marcas);
    }

    // Obtener una marca específica
    public function show($id)
    {
        return Marca::findOrFail($id); // Devuelve la marca o un error 404
    }

    // Crear una nueva marca
    public function store(Request $request)
    {
        // Validación de los campos
        $request->validate([
            'nombre' => [
                'required',
                'regex:/^[a-zA-Z0-9]+$/', // Solo letras y números
                'max:30',
                'not_regex:/^\s*$/' // No permite solo espacios en blanco
            ],
            'pais' => [
                'required',
                'regex:/^[a-zA-Z\s]+$/', // Solo letras
                'max:30',
                'not_regex:/^\s*$/' // No permite solo espacios en blanco
            ],
            'email' => [
                'required',
                'email',
                'regex:/(.*)@(gmail|yahoo|outlook)\.com$/i', // Solo Gmail, Yahoo o Outlook
                'unique:marcas,email',
                'not_regex:/^\s*$/'
            ],
            'direccion' => [
                'required',
                'regex:/^[a-zA-Z0-9\s]+$/', // Solo letras y números
                'max:60',
                'not_regex:/^\s*$/'
            ],
            'telefono' => [
                'required',
                'digits_between:1,15', // Solo números, máximo 15 caracteres
                'not_regex:/^\s*$/'
            ],
            'sitio_web' => [
                'nullable',
                'string',
                'max:30'
            ],
            'descripcion' => [
                'nullable',
                'string',
                'max:200',
                'not_regex:/^\s*$/'
            ]
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.regex' => 'El nombre solo debe contener letras y números.',
            'pais.regex' => 'El país solo debe contener letras.',
            'email.regex' => 'El email solo debe ser de dominio Gmail, Yahoo o Outlook.',
            'direccion.regex' => 'La dirección solo debe contener letras y números.',
            'telefono.digits_between' => 'El teléfono debe tener entre 1 y 15 caracteres numéricos.',
            'not_regex' => 'El campo no debe contener solo espacios en blanco.'
        ]);

        try {
            $marca = Marca::create($request->all()); // Crea una nueva marca
            return response()->json($marca, 201); // Devuelve la marca creada con código 201
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error al crear la marca', 'error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear la marca'], 500);
        }
    }

    // Actualizar una marca existente
    public function update(Request $request, $id)
    {
        // Validación de los campos para actualizar
        $request->validate([
            'nombre' => [
                'required',
                'regex:/^[a-zA-Z0-9]+$/', // Solo letras y números
                'max:30',
                'not_regex:/^\s*$/'
            ],
            'pais' => [
                'required',
                'regex:/^[a-zA-Z\s]+$/', // Solo letras
                'max:30',
                'not_regex:/^\s*$/'
            ],
            'email' => [
                'required',
                'email',
                'regex:/(.*)@(gmail|yahoo|outlook)\.com$/i', // Solo Gmail, Yahoo o Outlook
                'unique:marcas,email,' . $id,
                'not_regex:/^\s*$/'
            ],
            'direccion' => [
                'required',
                'regex:/^[a-zA-Z0-9\s]+$/', // Solo letras y números
                'max:60',
                'not_regex:/^\s*$/'
            ],
            'telefono' => [
                'required',
                'digits_between:1,15', // Solo números, máximo 15 caracteres
                'not_regex:/^\s*$/'
            ],
            'sitio_web' => [
                'nullable',
                'string',
                'max:30'
            ],
            'descripcion' => [
                'nullable',
                'string',
                'max:200',
                'not_regex:/^\s*$/'
            ]
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.regex' => 'El nombre solo debe contener letras y números.',
            'pais.regex' => 'El país solo debe contener letras.',
            'email.regex' => 'El email solo debe ser de dominio Gmail, Yahoo o Outlook.',
            'direccion.regex' => 'La dirección solo debe contener letras y números.',
            'telefono.digits_between' => 'El teléfono debe tener entre 1 y 15 caracteres numéricos.',
            'not_regex' => 'El campo no debe contener solo espacios en blanco.'
        ]);

        try {
            $marca = Marca::findOrFail($id); // Busca la marca o lanza un error 404
            $marca->update($request->all()); // Actualiza la marca
            return response()->json($marca, 200); // Devuelve la marca actualizada
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar la marca'], 500);
        }
    }

    // Eliminar una marca
    public function destroy($id)
    {
        $marca = Marca::find($id); // Busca la marca

        if ($marca) {
            $marca->delete(); // Elimina la marca
            return response()->json(['message' => 'Marca eliminada correctamente'], 200);
        } else {
            return response()->json(['message' => 'Marca no encontrada'], 404);
        }
    }
}
