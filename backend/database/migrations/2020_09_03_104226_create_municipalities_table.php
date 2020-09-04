<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMunicipalitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('municipalities', function (Blueprint $table) {
            $table->id();
            $table->string('psgc_code');
            $table->string('name')->index();
            $table->string('region_code');
            $table
                ->foreign('region_code')
                ->references('code')
                ->on('regions');
            $table->string('province_code');
            $table
                ->foreign('province_code')
                ->references('code')
                ->on('provinces');
            $table->string('code')->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('municipalities');
    }
}
