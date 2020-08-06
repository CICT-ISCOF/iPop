<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePopulationAgeGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('population_age_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('population_id');
            $table
                ->foreign('population_id')
                ->references('id')
                ->on('populations');
            // 0-14 years
            $table->unsignedBigInteger('low');
            // 15-64 years
            $table->unsignedBigInteger('mid');
            // 65+ years
            $table->unsignedBigInteger('high');
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
        Schema::dropIfExists('population_age_groups');
    }
}
