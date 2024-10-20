<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repuesto extends Model
{
    use HasFactory;
    protected $fillable = ['nombre', 'descripcion', 'cantidad_stock', 'fabricante', 'categoria', 'costo_unitario', 'precio_venta'];
}
