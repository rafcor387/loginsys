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
        return Repuesto::create($request->all());
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
