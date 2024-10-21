<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuesto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre', 
        'descripcion', 
        'cantidad_stock', 
        'imagen', // Campo de tipo blob para la imagen
        'id_marca', 
        'id_categoria', 
        'costo_unitario', 
        'precio_unitario', // Actualizado de 'precio_venta' a 'precio_unitario'
        'codigo_oem', // Campo único
        'numero_serie' // Campo único
    ];

    // Relación con la tabla 'marcas'
    public function marca()
    {
        return $this->belongsTo(Marca::class, 'id_marca', 'id');
    }

    // Relación con la tabla 'categorias'
    public function categoria()
    {
        return $this->belongsTo(Categoria::class, 'id_categoria', 'id');
    }
}

