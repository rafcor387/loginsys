<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Empleado;
use App\Models\User;
use \Illuminate\Validation\ValidationException;
use \Illuminate\Database\QueryException;

class EmpleadoController extends Controller
{
    // Obtener todos los empleados
    public function index()
    {
        $empleados = Empleado::with(['cargo', 'users'])->get(); // Carga empleados con sus relaciones de cargo y user
        return response()->json([
            'empleados' => $empleados
            //'message' => 'listado correcto'
        ]);
    }

    // Obtener un empleado específico
    public function show($id)
    {
        return Empleado::findOrFail($id);
    }

    // Crear un nuevo repuesto
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'ci' => 'required|digits_between:6,11|unique:empleados,ci',
                'nombres' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
                'apellidos' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
                'id_cargo' => 'required|exists:cargos,id',
                'telefono' => 'required|numeric|regex:/^[6-7][0-9]{7}$/',
                'email' => ['required', 'email', 'regex:/(.*)@(gmail|yahoo|outlook)\.com$/i', 'unique:empleados,email', 'not_regex:/^\s*$/'],
                'direccion' => 'required|string|max:255',
                'fecha_contratacion' => 'required|date|before_or_equal:today|after_or_equal:today',
                'salario' => 'required|numeric|min:1000|max:1000000',
            ], [
                'ci.unique' => 'El CI ya esta siendo usado',
                'ci.required' => 'El campo CI es obligatorio.',
                'ci.digits_between' => 'El CI debe tener entre 6 y 20 dígitos.',
                'nombres.required' => 'El campo de nombre es obligatorio.',
                'nombres.string' => 'El nombre debe contener solo letras.',
                'nombres.regex' => 'El nombre solo puede contener letras y espacios.',
                'apellidos.required' => 'El campo de apellidos es obligatorio.',
                'apellidos.string' => 'El apellido debe contener solo letras.',
                'apellidos.regex' => 'El apellido solo puede contener letras y espacios.',
                'id_cargo.required' => 'Debes seleccionar un cargo válido.',
                'telefono.required' => 'El celular es obligatorio.',
                'telefono.numeric' => 'Ingrese un celular valido',
                'telefono.regex' => 'Ingrese un celular válido.',
                'email.required' => 'El correo electrónico es obligatorio.',
                'email.email' => 'El correo electrónico debe ser válido.',
                'email.regex' => 'El correo electrónico solo debe ser de dominio Gmail, Yahoo o Outlook.',
                'email.unique' => 'El correo electrónico ya está registrado.',
                'direccion.required' => 'La dirección es obligatoria.',
                'fecha_contratacion.required' => 'La fecha de contratación es obligatoria.',
                'fecha_contratacion.before_or_equal' => 'La fecha de contratación debe ser la de hoy.',
                'fecha_contratacion.after_or_equal' => 'La fecha de contratación debe ser la de hoy.',
                'salario.required' => 'El salario es obligatorio.',
                'salario.numeric' => 'El salario debe ser un número válido.',
                'salario.min' => 'El salario no puede ser negativo o ser menor a 1000',
                'salario.max' => 'El salario no puede ser mayor a 1,000,000.',
            ]);

            // Convertir los campos 'nombres' y 'apellidos' a minúsculas
            $validatedData['nombres'] = strtolower($validatedData['nombres']);
            $validatedData['apellidos'] = strtolower($validatedData['apellidos']);
            $validatedData['email'] = strtolower($validatedData['email']);
            $validatedData['direccion'] = strtolower($validatedData['direccion']);

            $empleado = Empleado::create($validatedData);

            return response()->json([
                'message' => 'Empleado creado con éxito',
                'nuevo empleado' => $empleado
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(['messageError' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (QueryException $e) {
            return response()->json(['messageError' => 'Error con la base de datos', 'error' => $e->getMessage()], 400);
        } catch (\Exception $e) {
            return response()->json(['messageError' => 'Error al crear el empleado'], 500);
        }
    }

    // Actualizar un empleado existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'ci' => 'required|digits_between:6,11',
            'nombres' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/', // Solo letras y espacios
            'apellidos' => 'required|string|max:100|regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s.]+$/',
            'id_cargo' => 'required|exists:cargos,id',
            'telefono' => 'required|numeric|regex:/^[6-7][0-9]{7}$/',
            'email' => [
                'required',
                'email',
                'regex:/(.*)@(gmail|yahoo|outlook)\.com$/i', // Only Gmail, Yahoo, or Outlook
                'not_regex:/^\s*$/'
            ],
            'direccion' => 'required|string|max:255',
            'fecha_contratacion' => 'required|date|before_or_equal:today',
            'salario' => 'required|numeric|min:1000|max:1000000',
        ], [
            'ci.required' => 'El campo CI es obligatorio.',
            'ci.digits_between' => 'El CI debe tener entre 6 y 20 dígitos.',
            'nombres.required' => 'El campo de nombre es obligatorio.',
            'nombres.string' => 'El nombre debe contener solo letras.',
            'nombres.regex' => 'El nombre solo puede contener letras y espacios.',
            'apellidos.required' => 'El campo de apellidos es obligatorio.',
            'apellidos.string' => 'El apellido debe contener solo letras.',
            'apellidos.regex' => 'El apellido solo puede contener letras y espacios.',
            'id_cargo.required' => 'Debes seleccionar un cargo válido.',
            'telefono.required' => 'El celular es obligatorio.',
            'telefono.numeric' => 'Ingrese un celular valido',
            'telefono.regex' => 'Ingrese un celular válido.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico debe ser válido.',
            'email.regex' => 'El correo electrónico solo debe ser de dominio Gmail, Yahoo o Outlook.',
            'email.unique' => 'El correo electrónico ya está registrado.',
            'direccion.required' => 'La dirección es obligatoria.',
            'fecha_contratacion.required' => 'La fecha de contratación es obligatoria.',
            'fecha_contratacion.before_or_equal' => 'La fecha de contratación debe ser la de hoy.',
            'salario.required' => 'El salario es obligatorio.',
            'salario.numeric' => 'El salario debe ser un número válido.',
            'salario.min' => 'El salario no puede ser negativo o ser menor a 1000',
            'salario.max' => 'El salario no puede ser mayor a 1,000,000.',
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
            return response()->json(['message' => 'Empleado eliminado con éxito'], 200);
        } else {
            return response()->json(['message' => 'Empleado no encontrado'], 404);
        }
    }
    public function eliminarUser($idEmpleado)
    {
        $usuario = User::where('id_empleado', $idEmpleado)->first();
        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $usuario->delete();
        return response()->json(['messageError' => 'Usuario eliminado con éxito'], 200);
    }

    public function generarCodigo($idEmpleado)
    {
        $empleado = Empleado::find($idEmpleado);

        if (!$empleado) {
            return response()->json(['error' => 'Empleado no encontrado'], 404);
        }
        $primerApellido = substr($empleado->apellidos, 0, 1);
        $primerNombre = substr($empleado->nombres, 0, 2);
        $numeroRandom = random_int(100000, 999999);
        $codigo = strtolower($primerApellido . $primerNombre . $numeroRandom);
        $passwordRandom = random_int(100000, 999999);
        $user = new User();
        $user->email = $codigo;
        $user->password = $passwordRandom;
        $user->id_empleado = $idEmpleado;

        $user->save();
        return response()->json([
            'message' => 'Usuario creado correctamente',
            'codigo' => $codigo,
            'password' => $passwordRandom
        ]);
    }
}
