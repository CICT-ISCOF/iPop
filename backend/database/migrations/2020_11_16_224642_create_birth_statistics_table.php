<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBirthStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('birth_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->unsignedDouble('total_population');
            $table->unsignedDouble('total_live_births');
            $table->unsignedDouble('crude_birth_rate');
            $table->unsignedDouble('teenage_births');
            $table->unsignedDouble('illegitimate_births');
            $table->unsignedDouble('general_fertility_rate');
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
        Schema::dropIfExists('birth_statistics');
    }
}
