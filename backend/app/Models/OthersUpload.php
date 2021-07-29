<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class OthersUpload extends Model
{
    use HasFactory;
    
    protected $fillable = ['name','thumbnail'];
    
    
    public function process($file){
        $path = Storage::put('uploaded/files' , $file);
        return Storage::url( $path );
    }
    
    public function files(){
        return $this->hasMany(OthersUploadFiles::class,'upload_id','id',);
    }
    
}
 