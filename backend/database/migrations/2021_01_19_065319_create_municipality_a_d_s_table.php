<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMunicipalityADSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('municipality_a_d_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->year('year');
            $table->string('hh_population');
            $table->string('age_0_14');
            $table->string('age_15_64');
            $table->string('65_and_over');
            $table->string('young_dependency');
            $table->string('old_dependency');
            $table->string('dependency');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('municipality_a_d_s');
    }
}
