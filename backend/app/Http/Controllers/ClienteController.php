<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;

class ClienteController extends Controller
{
    // Obtener todos los clientes
    public function index()
    {
        try {
            $clientes = Cliente::with('ventas')->get(); // Carga clientes con sus ventas
            return response()->json([
                'clientes' => $clientes,
                'message' => 'Listado correcto'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'messageError' => 'Ocurrió un error al obtener el listado de clientes.',
                'detailsError' => $e->getMessage()
            ], 500);
        }
    }

    // Crear un nuevo cliente
    public function store(Request $request)
{
    try {
        $validatedData = $request->validate([
            'ci' => 'required|digits_between:6,11|unique:clientes,ci',
            'nombres' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
            'apellidos' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
            'telefono' => 'required|numeric|regex:/^[6-7][0-9]{7}$/',
            'direccion' => 'required|string|max:255|regex:/^[A-Za-z0-9.,\s]+$/'
        ], [
            'ci.unique' => 'El CI ya está registrado.',
            'ci.required' => 'El campo CI es obligatorio.',
            'ci.digits_between' => 'El CI debe tener entre 6 y 11 dígitos.',
            'nombres.required' => 'El campo Nombre es obligatorio.',
            'nombres.regex' => 'El nombre solo puede contener letras y espacios.',
            'apellidos.required' => 'El campo Apellidos es obligatorio.',
            'apellidos.regex' => 'Los apellidos solo pueden contener letras y espacios.',
            'telefono.required' => 'El campo Teléfono es obligatorio.',
            'telefono.numeric' => 'El teléfono debe ser un número válido.',
            'telefono.regex' => 'El teléfono debe comenzar con 6 o 7 y tener 8 dígitos.',
            'direccion.required' => 'El campo Dirección es obligatorio.',
            'direccion.regex' => 'La dirección solo puede contener letras, números y puntos.'
        ]);

        $validatedData['nombres'] = strtoupper($validatedData['nombres']);
        $validatedData['apellidos'] = strtoupper($validatedData['apellidos']);

        $cliente = Cliente::create($validatedData);
        return response()->json([
            'message' => 'Cliente creado con éxito',
            'nuevo cliente' => $cliente
        ], 201);
    } catch (ValidationException $e) {
        return response()->json(['messageError' => 'Error de validación', 'validationError' => $e->errors()], 422);
    } catch (QueryException $e) {
        return response()->json(['messageError' => 'Error con la base de datos', 'errordb' => $e->getMessage()], 400);
    } catch (\Exception $e) {
        return response()->json(['messageError' => 'Error al crear el cliente', 'detailsError' => $e->getMessage()], 500);
    }
}

    // Mostrar un cliente específico
    public function show($id)
    {
        try {
            $cliente = Cliente::with('ventas')->findOrFail($id);
            return response()->json($cliente);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Cliente no encontrado', 'detailsError' => $e->getMessage()], 404);
        }
    }

    // Actualizar un cliente existente
    public function update(Request $request, $id)
{
    try {
        $validatedData = $request->validate([
            'ci' => 'required|digits_between:6,11|unique:clientes,ci,' . $id,
            'nombres' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
            'apellidos' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
            'telefono' => 'required|numeric|regex:/^[6-7][0-9]{7}$/',
            'direccion' => 'required|string|max:255|regex:/^[A-Za-z0-9.,\s]+$/'
        ], [
            'ci.required' => 'El campo CI es obligatorio.',
            'ci.unique' => 'El CI ya está registrado para otro cliente.',
            'ci.digits_between' => 'El CI debe tener entre 6 y 11 dígitos.',
            'nombres.required' => 'El campo Nombre es obligatorio.',
            'nombres.regex' => 'El nombre solo puede contener letras y espacios.',
            'apellidos.required' => 'El campo Apellidos es obligatorio.',
            'apellidos.regex' => 'Los apellidos solo pueden contener letras y espacios.',
            'telefono.required' => 'El campo Teléfono es obligatorio.',
            'telefono.numeric' => 'El teléfono debe ser un número válido.',
            'telefono.regex' => 'El teléfono debe comenzar con 6 o 7 y tener 8 dígitos.',
            'direccion.required' => 'El campo Dirección es obligatorio.',
            'direccion.regex' => 'La dirección solo puede contener letras, números y puntos.'
        ]);

        $validatedData['nombres'] = strtoupper($validatedData['nombres']);
        $validatedData['apellidos'] = strtoupper($validatedData['apellidos']);

        $cliente = Cliente::findOrFail($id);
        $cliente->update($validatedData);
        return response()->json([
            'message' => 'Cliente actualizado con éxito',
            'cliente actualizado' => $cliente
        ], 201);
    } catch (ValidationException $e) {
        return response()->json([
            'messageError' => 'Error de validación',
            'errors' => $e->errors()  // This will send the errors in the format Laravel uses
        ], 422);
    } catch (QueryException $e) {
        return response()->json(['messageError' => 'Error con la base de datos', 'errordb' => $e->getMessage()], 400);
    } catch (\Exception $e) {
        return response()->json(['messageError' => 'Error al editar el cliente', 'detailsError' => $e->getMessage()], 500);
    }
}

    // Eliminar un cliente
    public function destroy($id)
    {
        try {
            $cliente = Cliente::findOrFail($id);
            $cliente->delete();
            return response()->json(['message' => 'Cliente eliminado con éxito'], 200);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Error al eliminar el cliente', 'detailsError' => $e->getMessage()], 500);
        }
    }
}
