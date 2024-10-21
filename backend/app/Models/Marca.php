<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Marca extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'marcas';

    public $timestamps = false; // Deshabilita los timestamps

    // Los atributos que se pueden asignar masivamente
    protected $fillable = [
        'nombre',
        'pais',
        'email',
        'direccion',
        'telefono',
        'sitio_web',
        'descripcion'
    ];

    // Relación uno a uno con la tabla 'repuestos'
    public function repuesto()
    {
        return $this->hasOne(Repuesto::class, 'id_marca', 'id');
    }
}
