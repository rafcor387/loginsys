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
             'nombre' => 'required|string|max:255',
             'descripcion' => 'required|string',
             'cantidad_stock' => 'required|numeric|min:0',
             'fabricante: ' => 'required',
             'categoria' => 'required',
             'costo_unitario' => 'required',
             'precio_venta' => 'required',
         ], [
             'nombre.required' => 'El campo de nombre es obligatorio.',
             'nombre.string' => 'El nombre debe ser una cadena de texto.',
             'descripcion.required' => 'El campo de descripción es obligatorio.',
             'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
             'cantidad_stock.numeric' => 'La cantidad en stock debe ser un número.',
             'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
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
        $repuesto = Repuesto::findOrFail($id);
        $repuesto->update($request->all());
        return $repuesto;
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
