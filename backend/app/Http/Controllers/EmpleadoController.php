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
        // Validación de los campos
        $request->validate([
            'ci' => 'required|integer',
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'id_cargo' => 'required|exists:cargos,id',
            'telefono' => 'required|string|max:15',
            'email' => 'required|email',
            'direccion' => 'required|string|max:255',
            'fecha_contratacion' => 'required|date',
            'salario' => 'required|numeric|min:0',
        ], [
            'nombres.required' => 'El campo de nombre es obligatorio.',
            // Puedes agregar más mensajes personalizados aquí
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
