<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Marca;
use \Illuminate\Validation\ValidationException;
use \Illuminate\Database\QueryException;

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
        try {
            $validatedData = $request->validate([
                'nombre' => [
                    'required',
                    'regex:/^[a-zA-Z0-9 ]+$/', // Solo letras y números
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
                    'regex:/^[0-9]{7,15}$/', // Only digits, between 7 and 15 digits
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
                'pais.required' => 'El país es obligatorio.',
                'pais.regex' => 'El país solo debe contener letras.',
                'email.required' => 'El email es obligatorio.',
                'email.regex' => 'El email solo debe ser de dominio Gmail, Yahoo o Outlook.',
                'direccion.required' => 'La dirección es obligatorio.',
                'direccion.regex' => 'La dirección solo debe contener letras y números.',
                'telefono.required' => 'El teléfono es obligatorio.',
                'telefono.regex' => 'El teléfono debe contener entre 7 y 15 dígitos.',
                'not_regex' => 'El campo no debe contener solo espacios en blanco.',
                'descripcion.max' => 'La descripcion no puede ser mas de 200 caracteres'
            ]);

            $marca = Marca::create($validatedData);

            return response()->json([
                'message' => 'Marca creada con éxito',
                'nuevo empleado' => $marca
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['messageError' => 'Error de validación', 'validationError' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['messageError' => 'Error con la base de datos', 'error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Error al crear el empleado', 'detailsError' => $e], 500);
        }
    }

    // Actualizar una marca existente
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => [
                    'required',
                    'regex:/^[a-zA-Z0-9 ]+$/', // Solo letras y números
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
                    'regex:/^[0-9]{7,15}$/', // Only digits, between 7 and 15 digits
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
                'telefono.required' => 'El teléfono es obligatorio.',
                'telefono.regex' => 'El teléfono debe contener entre 7 y 15 dígitos.',
                'not_regex' => 'El campo no debe contener solo espacios en blanco.'
            ]);

            $marca = Marca::findOrFail($id); // Busca la marca o lanza un error 404
            $marca->update($validatedData); // Actualiza la marca
            return response()->json([
                'message' => 'Marca actualizada con éxito',
                'marca actualizada' => $marca
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['messageError' => 'Error de validación', 'validationError' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['messageError' => 'Error con la base de datos', 'errordb' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Error al editar la marca', 'detailsError' => $e], 500);
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
