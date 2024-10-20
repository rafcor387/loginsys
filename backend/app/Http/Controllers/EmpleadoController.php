<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;

class EmpleadoController extends Controller
{
    // Obtener todos los empleados
    public function index()
    {
        $empleados = Empleado::with('cargo')->get(); // Carga empleados con su relación de cargo
        return response()->json($empleados);
        //return Empleado::all();
    }

    // Obtener un empleado específico
    public function show($id)
    {
        return Empleado::findOrFail($id);
    }

    // Crear un nuevo repuesto
    public function store(Request $request)
    {
        // Validación de los campos
        $request->validate([
            'ci' => 'required|integer',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'id_cargo' => 'required|exists:cargos,id',
            'telefono' => 'required|string|max:15',
            'email' => 'required|email|unique:empleados,email',
            'direccion' => 'required|string|max:255',
            'fecha_contratacion' => 'required|date',
            'salario' => 'required|numeric|min:0',
        ], [
            'nombres.required' => 'El campo de nombre es obligatorio.',
            // Puedes agregar más mensajes personalizados aquí
        ]);

        try {
            $empleado = Empleado::create($request->all());
            return response()->json($empleado, 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Error al crear el empleado', 'error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el empleado'], 500);
        }
    }

    // Actualizar un empleado existente
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
            $empleado = Empleado::findOrFail($id);
            $empleado->update($request->all());

            return response()->json($empleado, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el empleado'], 500);
        }
    }


    // Eliminar un empleado
    public function destroy($id)
    {
        $empleado = Empleado::find($id);

        if ($empleado) {
            $empleado->delete();
            return response()->json(['message' => 'Empleado eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }
    }
}
