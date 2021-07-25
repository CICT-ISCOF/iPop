<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeathStatisticsTable extends Migration
{
    public function up()
    {
        Schema::create('death_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->unsignedDouble('population');
            $table->unsignedDouble('crude_death_rate');
            $table->unsignedDouble('total');
            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('death_statistics');
    }
}
