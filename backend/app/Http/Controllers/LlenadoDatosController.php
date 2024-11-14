<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LlenadoDatosController extends Controller
{
    public function llenarTestReg($id_repuesto, $anio)
    {
        // Definir el rango de fechas para el año solicitado
        $fechaInicio = Carbon::createFromDate($anio, 1, 1);
        $fechaFin = Carbon::createFromDate($anio, 12, 31);

        // Obtenemos los movimientos de inventario filtrados por id_repuesto y rango de fechas
        $movimientos = DB::table('inventario_movimientos')
            ->select('id_repuesto', 'fecha_movimiento', 'cantidad')
            ->where('id_repuesto', $id_repuesto)
            ->whereBetween('fecha_movimiento', [$fechaInicio, $fechaFin])
            ->get();

        // Array para almacenar los datos procesados
        $ventasPorMes = [];

        // Variables para mantener el registro temporal
        $ventaTemporal = 0;  // Contador de registros de ventas (cantidad de ventas)
        $cantidadTemporal = 0;  // Suma de la cantidad de productos vendidos

        // Fecha de inicio del primer período (para calcular los intervalos de 5 días)
        $fechaInicioPeriodo = null;

        // Procesamos cada movimiento de inventario
        foreach ($movimientos as $movimiento) {
            // Detectamos el mes y año del movimiento
            $mes = Carbon::parse($movimiento->fecha_movimiento)->month;
            $anio = Carbon::parse($movimiento->fecha_movimiento)->year;

            // Inicializamos la fecha de inicio del primer período
            if ($fechaInicioPeriodo === null) {
                $fechaInicioPeriodo = Carbon::parse($movimiento->fecha_movimiento);
            }

            // Verificamos si el período actual de 5 días ha pasado
            if (Carbon::parse($movimiento->fecha_movimiento)->diffInDays($fechaInicioPeriodo) >= 5) {
                // Cuando se complete un período de 5 días, guardamos los datos en el array
                $ventasPorMes[] = [
                    'id_repuesto' => $movimiento->id_repuesto,
                    'ventas' => $ventaTemporal,  // Número de registros de ventas
                    'cantidad' => $cantidadTemporal,  // Suma total de unidades vendidas
                    'mes' => $mes
                ];

                // Reiniciamos las sumas para el siguiente período de 5 días
                $ventaTemporal = 0;
                $cantidadTemporal = 0;
                $fechaInicioPeriodo = Carbon::parse($movimiento->fecha_movimiento);  // Reiniciar el período
            }

            // Sumamos la cantidad de productos vendidos en el período (solo la cantidad de cada venta)
            $cantidadTemporal += $movimiento->cantidad;

            // Contamos el registro de venta (uno por cada movimiento)
            $ventaTemporal++;
        }

        // Al final del ciclo, aseguramos de insertar el último período de ventas si hay datos restantes
        if ($ventaTemporal > 0 || $cantidadTemporal > 0) {
            $ventasPorMes[] = [
                'id_repuesto' => $movimiento->id_repuesto,
                'ventas' => $ventaTemporal,  // Número de registros de ventas
                'cantidad' => $cantidadTemporal,  // Suma total de unidades vendidas
                'mes' => $mes
            ];
        }

        // Insertamos los resultados procesados en la tabla testreg
        foreach ($ventasPorMes as $registro) {
            DB::table('testreg')->insert([
                'id_repuesto' => $registro['id_repuesto'],
                'ventas' => $registro['ventas'],  // Total de ventas (número de registros)
                'cantidad' => $registro['cantidad'],  // Unidades vendidas
                'mes' => $registro['mes']
            ]);
        }

        return response()->json(['message' => 'Datos procesados e insertados correctamente'], 200);
    }
}
