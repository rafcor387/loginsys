<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repuesto;
use Illuminate\Database\QueryException;
use \Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;


class RepuestoController extends Controller
{
    // Obtener todos los repuestos
    public function index()
    {
        try {
            $repuestos = Repuesto::with(['categoria', 'marca'])->get(); // Obtiene todas las marcas
            return response()->json([
                'repuestos' => $repuestos,
                'message' => 'listado correcto'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'messageError' => 'Ocurrió un error al obtener el listado de empleados.',
                'detailsError' => $e->getMessage() // Mensaje de error detallado (opcional)
            ], 500);
        }

    }

    // Obtener un repuesto específico
    public function show($id)
    {
        return Repuesto::findOrFail($id);
    }

    public function store(Request $request)
    {
        //return response()->json(['requestData' => $request->get('imagen')]);
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|max:100|regex:/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ. ]+$/',
                'descripcion' => 'max:100|nullable',
                'cantidad_stock' => 'required|integer|min:1',
                'imagen' => 'nullable|image', // Validación para imagen
                'id_marca' => 'required|integer|exists:marcas,id',
                'id_categoria' => 'required|integer|exists:categorias,id',
                'costo_unitario' => 'required|numeric|min:1',
                'precio_unitario' => 'required|numeric|min:1',
                'codigo_oem' => 'required|string|max:50|unique:repuestos,codigo_oem|regex:/^[A-Za-z0-9-. ]{6,20}$/',
                'numero_serie' => 'required|string|max:100|unique:repuestos,numero_serie|regex:/^[A-HJ-NPR-Z0-9a-hj-npr-z]{6,30}$/',
            ], [
                'nombre.required' => 'El campo de nombre es obligatorio.',
                'nombre.max' => 'El nombre excede el número de caracteres.',
                'nombre.regex' => 'El nombre solo debe contener letras, números, puntos y espacios.',
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
                'codigo_oem.regex' => 'El código OEM es invalido.',
                'codig_oem.max' => 'La codigo oem excede el número de caracteres.',
                'codigo_oem.required' => 'El código OEM es obligatorio.',
                'numero_serie.required' => 'El número de serie es obligatorio.',
                'numero_serie.regex' => 'El número de serie es invalido.',
                'numero_serie.uniqeu' => 'El número de serie ya existe.',
                'numero_serie.max' => 'El numero de serie excede el número de caracteres.',
            ]);

            if ($request->hasFile('imagen')) {
                // Obtén el archivo subido
                $file = $request->file('imagen');
             
                // Define la ruta donde se guardará en la carpeta 'public/storage/imagenes'
                $path = 'storage/imagenes';
             
                // Genera un nombre único para evitar colisiones
                $filename = uniqid() . '.' . $file->getClientOriginalExtension();
             
                // Mueve el archivo directamente a la carpeta public/storage/imagenes
                $file->move(public_path($path), $filename);
             
                // Guarda la ruta relativa del archivo
                $validatedData['imagen'] = $path . '/' . $filename;
            }

            if ($validatedData['codigo_oem'] != null)
                $validatedData['codigo_oem'] = strtoupper($validatedData['codigo_oem']);
            if ($validatedData['numero_serie'] != null)
                $validatedData['numero_serie'] = strtoupper($validatedData['numero_serie']);

            // Crear el repuesto
            $repuesto = Repuesto::create($validatedData);
            return response()->json([
                'message' => 'Repuesto creado con éxito',
                'nuevoRepuesto' => $repuesto
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(['messageError' => 'Error de validación', 'validationError' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['messageError' => $e->getMessage(), 'errordb' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Error al crear el empleado', 'detailsError' => $e], 500);
        }
    }

    // Actualizar un repuesto existente
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'nombre' => 'required|max:100|regex:/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ. ]+$/',
                'descripcion' => 'max:100|nullable',
                'cantidad_stock' => 'integer|min:0',
                //'imagen' => 'nullable|image', // Validación para imagen
                'id_marca' => 'integer|exists:marcas,id',
                'id_categoria' => 'integer|exists:categorias,id',
                'costo_unitario' => 'numeric|min:0',
                'precio_unitario' => 'numeric|min:0',
                'codigo_oem' => 'required|string|max:50|regex:/^[A-Za-z0-9-. ]{6,20}$/',
                'numero_serie' => 'required|string|max:100|regex:/^[A-HJ-NPR-Z0-9a-hj-npr-z]{6,30}$/',
            ], [
                'nombre.required' => 'El campo de nombre es obligatorio.',
                'nombre.max' => 'El nombre excede el número de caracteres.',
                'nombre.regex' => 'El nombre solo debe contener letras, números, puntos y espacios.',
                'descripcion.max' => 'La descripción excede el número de caracteres.',
                'cantidad_stock.required' => 'El campo de cantidad de stock es obligatorio.',
                'cantidad_stock.integer' => 'La cantidad en stock debe ser un número.',
                'cantidad_stock.min' => 'La cantidad en stock debe ser un valor positivo.',
                //'imagen.image' => 'El archivo debe ser una imagen válida.',//validacon imagen
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
                'codigo_oem.regex' => 'El código OEM es invalido.',
                'codig_oem.max' => 'La codigo oem excede el número de caracteres.',
                'codigo_oem.required' => 'El código OEM es obligatorio.',
                'numero_serie.required' => 'El número de serie es obligatorio.',
                'numero_serie.regex' => 'El número de serie es invalido.',
                'numero_serie.max' => 'El numero de serie excede el número de caracteres.',
            ]);
            $repuesto = Repuesto::find($id);

            if ($validatedData['codigo_oem'] != null)
                $validatedData['codigo_oem'] = strtoupper($validatedData['codigo_oem']);
            if ($validatedData['numero_serie'] != null)
                $validatedData['numero_serie'] = strtoupper($validatedData['numero_serie']);

            $repuesto->update($validatedData);
            return response()->json([
                'message' => 'Repuesto actualizado con éxito',
                'Repuesto actualizado' => $repuesto
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['messageError' => 'Error de validación', 'validationError' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['messageError' => 'Error con la base de datos', 'errordb' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['messageError' => $e->getMessage(), 'detailsError' => $e->getMessage()], 500);
        }
    }

    // Eliminar un repuesto
    public function destroy($id)
    {
        try {
            $repuesto = Repuesto::find($id);
            $repuesto->delete();
            return response()->json([
                'message' => 'Repuesto eliminado con éxito',
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'messageError' => 'Error de validación',
                'validationError' => $e->errors()
            ], 422);
        } catch (QueryException $e) {
            // Verificar si el error es por restricción de clave foránea
            if ($e->getCode() == 23000 && str_contains($e->getMessage(), '1451')) {
                return response()->json([
                    'messageError' => 'No se puede eliminar el objeto porque está siendo referenciado en otra tabla.',
                    'errordb' => $e->getMessage()
                ], 400);
            }
            // Manejo genérico para otros errores de base de datos
            return response()->json([
                'messageError' => 'Error en la base de datos.',
                'errordb' => $e->getMessage()
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'messageError' => 'Error al procesar la solicitud',
                'detailsError' => $e->getMessage()
            ], 500);
        }
    }
}
