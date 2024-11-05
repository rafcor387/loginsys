<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    // Obtener todas las categorías
    public function index()
    {
        $categorias = Categoria::all(); // Obtiene todas las categorías
        return response()->json($categorias);
    }

    // Obtener una categoría específica
    public function show($id)
    {
        return Categoria::findOrFail($id); // Devuelve la categoría o un error 404
    }

    // Crear una nueva categoría
    public function store(Request $request)
    {
        // Validación de los campos
        $request->validate([
            'nombre' => [
                'required',
                'regex:/^[a-zA-Z0-9. ]+$/', // Solo letras y números
                'max:30',
                'not_regex:/^\s*$/' // No permite solo espacios en blanco
            ],
            'descripcion' => [
                'nullable',
                'string',
                'max:200',
                'not_regex:/^\s*$/' // No permite solo espacios en blanco
            ]
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.regex' => 'El nombre solo debe contener letras, números, espacios y puntos.',
            'descripcion.max' => 'La descripción no debe exceder los 200 caracteres.',
            'not_regex' => 'El campo no debe contener solo espacios en blanco.'
        ]);

        try {
            $categoria = Categoria::create($request->all()); // Crea una nueva categoría
            return response()->json($categoria, 201); // Devuelve la categoría creada con código 201
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error al crear la categoría', 'error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear la categoría'], 500);
        }
    }

    // Actualizar una categoría existente
    public function update(Request $request, $id)
    {
        // Validación de los campos para actualizar
        $request->validate([
            'nombre' => [
                'required',
                'regex:/^[a-zA-Z0-9. ]+$/', // Solo letras y números
                'max:30',
                'not_regex:/^\s*$/'
            ],
            'descripcion' => [
                'nullable',
                'string',
                'max:200',
                'not_regex:/^\s*$/'
            ]
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.regex' => 'El nombre solo debe contener letras, números, espacios y puntos.',
            'descripcion.max' => 'La descripción no debe exceder los 200 caracteres.',
            'not_regex' => 'El campo no debe contener solo espacios en blanco.'
        ]);

        try {
            $categoria = Categoria::findOrFail($id); // Busca la categoría o lanza un error 404
            $categoria->update($request->all()); // Actualiza la categoría
            return response()->json($categoria, 200); // Devuelve la categoría actualizada
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar la categoría'], 500);
        }
    }

    // Eliminar una categoría
    public function destroy($id)
    {
        $categoria = Categoria::find($id); // Busca la categoría

        if ($categoria) {
            $categoria->delete(); // Elimina la categoría
            return response()->json(['message' => 'Categoría eliminada correctamente'], 200);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }
}


