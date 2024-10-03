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
            'nombre' => 'required|max:50',
            'descripcion' => 'max:255',
            'cantidad_stock' => 'required|integer|min:0',
            'fabricante' => 'required|string|max:50',
            'categoria' => 'required|string|max:50',
            'costo_unitario' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.string' => 'El nombre debe contener solo letras.',
            'nombre.max' => 'El nombre excede el número de caracteres.',
            //'descripcion.required' => 'El campo de descripción es obligatorio.',
            'descripcion.max' => 'La descripcion excede el número de caracteres',
            'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
            'cantidad_stock.integer' => 'La cantidad en stock debe ser un número.',
            'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
            'fabricante.required' => 'El campo de fabricante es obligatorio',
            'fabricante.string' => 'El fabricante debe contener solo letras',
            'fabricante.max' => 'El campo de fabricante excede el número de caracteres',
            'categoria.required' => 'El campo de categoria es obligatorio',
            'categoria.string' => 'El campo de categoria debe contener solo letras',
            'categoria.max' => 'El campo de categoria excede el numero de caracteres',
            'costo_unitario.required' => 'El campo de costo unitario es obligatorio',
            'costo_unitario.string' => 'El campo de costo unitario debe contener solo letras',
            'costo_unitario.min' => 'El campo de costo unitario debe tener un valor positivo',
            'precio_venta.required' => 'El campo de precio venta es obligatorio',
            'precio_venta.numeric' => 'El campo de precio venta debe contener numeros',
            'precio_venta.min' => 'El campo de precio venta debe ser positivo',
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
            'nombre' => 'required|max:50',
            'descripcion' => 'max:255',
            'cantidad_stock' => 'required|integer|min:0',
            'fabricante' => 'required|string|max:50',
            'categoria' => 'required|string|max:50',
            'costo_unitario' => 'required|numeric|min:0',
            'precio_venta' => 'required|numeric|min:0',
        ], [
            'nombre.required' => 'El campo de nombre es obligatorio.',
            'nombre.max' => 'El nombre excede el número de caracteres.',
            //'descripcion.required' => 'El campo de descripción es obligatorio.',
            'descripcion.max' => 'La descripcion excede el número de caracteres',
            'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
            'cantidad_stock.integer' => 'La cantidad en stock debe ser un número.',
            'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
            'fabricante.required' => 'El campo de fabricante es obligatorio.',
            'fabricante.string' => 'El fabricante debe contener solo letras.',
            'fabricante.max' => 'El campo de fabricante excede el número de caracteres.',
            'categoria.required' => 'El campo de categoria es obligatorio.',
            'categoria.string' => 'El campo de categoria debe contener solo letras.',
            'categoria.max' => 'El campo de categoria excede el número de caracteres.',
            'costo_unitario.required' => 'El campo de costo unitario es obligatorio.',
            'costo_unitario.numeric' => 'El campo de costo unitario debe contener solo números.',
            'costo_unitario.min' => 'El costo unitario debe tener un valor positivo.',
            'precio_venta.required' => 'El campo de precio venta es obligatorio.',
            'precio_venta.numeric' => 'El campo de precio venta debe contener números.',
            'precio_venta.min' => 'El campo de precio venta debe ser positivo.',
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
