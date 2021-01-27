<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgeProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('age_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('hh_population');
            $table->string('0_to_14');
            $table->string('15_to_64');
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
        Schema::dropIfExists('age_profiles');
    }
}
