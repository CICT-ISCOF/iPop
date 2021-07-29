<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMOCSTable extends Migration
{
  
    public function up()
    {
        Schema::create('p_m_o_c_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->unsignedDouble('sessions')->default(0);
            $table->unsignedDouble('oriented_couples')->default(0);
            $table->unsignedDouble('individuals_interviewed')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('p_m_o_c_s');
    }
}
