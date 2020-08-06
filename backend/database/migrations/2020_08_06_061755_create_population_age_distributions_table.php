<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePopulationAgeDistributionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('population_age_distributions', function (
            Blueprint $table
        ) {
            $table->id();
            $table->unsignedBigInteger('one_to_nine');
            $table->unsignedBigInteger('ten_to_nineteen');
            $table->unsignedBigInteger('twenty_to_twentynine');
            $table->unsignedBigInteger('thirty_to_thirtynine');
            $table->unsignedBigInteger('forty_to_fortynine');
            $table->unsignedBigInteger('fifty_to_fiftynine');
            $table->unsignedBigInteger('sixty_to_sixtynine');
            $table->unsignedBigInteger('seventy_to_seventynine');
            $table->unsignedBigInteger('eighty_plus');
            $table->foreignId('population_id');
            $table
                ->foreign('population_id')
                ->references('id')
                ->on('populations');
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
        Schema::dropIfExists('population_age_distributions');
    }
}
