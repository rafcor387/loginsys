<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repuesto;

class RepuestoController extends Controller
{
    // Obtener todos los repuestos
    public function index()
    {
        return Repuesto::all();
    }

    // Obtener un repuesto específico
    public function show($id)
    {
        return Repuesto::findOrFail($id);
    }

    // Crear un nuevo repuesto
    public function store(Request $request)
    {
        // Validación de los campos
        $request->validate([
            'nombre' => 'required|max:100',
            'descripcion' => 'max:100',
            'cantidad_stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image', // Validación para imagen
            'id_marca' => 'required|integer|exists:marcas,id',
            'id_categoria' => 'required|integer|exists:categorias,id',
            'costo_unitario' => 'required|numeric|min:0',
            'precio_unitario' => 'required|numeric|min:0',
            'codigo_oem' => 'nullable|string|max:50|unique:repuestos,codigo_oem',
            'numero_serie' => 'nullable|string|max:100|unique:repuestos,numero_serie',
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.max' => 'El nombre excede el número de caracteres.',
            'descripcion.max' => 'La descripción excede el número de caracteres.',
            'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
            'cantidad_stock.integer' => 'La cantidad en stock debe ser un número.',
            'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
            'imagen.image' => 'El archivo debe ser una imagen válida.',
            'id_marca.required' => 'El campo de marca es obligatorio.',
            'id_marca.exists' => 'La marca seleccionada no es válida.',
            'id_categoria.required' => 'El campo de categoría es obligatorio.',
            'id_categoria.exists' => 'La categoría seleccionada no es válida.',
            'costo_unitario.required' => 'El campo de costo unitario es obligatorio.',
            'costo_unitario.numeric' => 'El campo de costo unitario debe contener solo números.',
            'costo_unitario.min' => 'El costo unitario debe tener un valor positivo.',
            'precio_unitario.required' => 'El campo de precio unitario es obligatorio.',
            'precio_unitario.numeric' => 'El campo de precio unitario debe contener solo números.',
            'precio_unitario.min' => 'El precio unitario debe ser positivo.',
            'codigo_oem.unique' => 'El código OEM ya existe.',
            'numero_serie.unique' => 'El número de serie ya existe.',
        ]);

        try {
            $repuesto = Repuesto::create($request->all());
            return response()->json($repuesto, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el repuesto'], 500);
        }
    }

    // Actualizar un repuesto existente
    public function update(Request $request, $id)
    {
        // Validación de los campos para actualizar
        $request->validate([
            'nombre' => 'required|max:100',
            'descripcion' => 'max:100',
            'cantidad_stock' => 'required|integer|min:0',
            'imagen' => 'nullable|image', // Validación para imagen
            'id_marca' => 'required|integer|exists:marcas,id',
            'id_categoria' => 'required|integer|exists:categorias,id',
            'costo_unitario' => 'required|numeric|min:0',
            'precio_unitario' => 'required|numeric|min:0',
            'codigo_oem' => 'nullable|string|max:50|unique:repuestos,codigo_oem,' . $id,
            'numero_serie' => 'nullable|string|max:100|unique:repuestos,numero_serie,' . $id,
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.max' => 'El nombre excede el número de caracteres.',
            'descripcion.max' => 'La descripción excede el número de caracteres.',
            'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
            'cantidad_stock.integer' => 'La cantidad en stock debe ser un número.',
            'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
            'imagen.image' => 'El archivo debe ser una imagen válida.',
            'id_marca.required' => 'El campo de marca es obligatorio.',
            'id_marca.exists' => 'La marca seleccionada no es válida.',
            'id_categoria.required' => 'El campo de categoría es obligatorio.',
            'id_categoria.exists' => 'La categoría seleccionada no es válida.',
            'costo_unitario.required' => 'El campo de costo unitario es obligatorio.',
            'costo_unitario.numeric' => 'El campo de costo unitario debe contener solo números.',
            'costo_unitario.min' => 'El costo unitario debe tener un valor positivo.',
            'precio_unitario.required' => 'El campo de precio unitario es obligatorio.',
            'precio_unitario.numeric' => 'El campo de precio unitario debe contener solo números.',
            'precio_unitario.min' => 'El precio unitario debe ser positivo.',
            'codigo_oem.unique' => 'El código OEM ya existe.',
            'numero_serie.unique' => 'El número de serie ya existe.',
        ]);

        try {
            $repuesto = Repuesto::findOrFail($id);
            $repuesto->update($request->all());

            return response()->json($repuesto, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el repuesto'], 500);
        }
    }

    // Eliminar un repuesto
    public function destroy($id)
    {
        $repuesto = Repuesto::find($id);

        if ($repuesto) {
            $repuesto->delete();
            return response()->json(['message' => 'Repuesto eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'Repuesto no encontrado'], 404);
        }
    }
}
