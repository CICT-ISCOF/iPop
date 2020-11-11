<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequiredPermission extends Model
{
    use HasFactory;

    protected $fillable = ['permission_id', 'permissible'];

    public function permission()
    {
        return $this->belongsTo(Permission::class);
    }
}
