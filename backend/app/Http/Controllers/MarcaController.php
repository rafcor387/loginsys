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
            'nombre' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'email' => 'required|email|unique:marcas,email',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:15',
            'sitio_web' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:255',
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            // Puedes agregar más mensajes personalizados aquí
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
            'nombre' => 'required|string|max:100',
            'pais' => 'required|string|max:100',
            'email' => 'required|email|unique:marcas,email,'.$id,
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:15',
            'sitio_web' => 'nullable|string|max:255',
            'descripcion' => 'nullable|string|max:255',
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            // Puedes agregar más mensajes personalizados aquí
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
