<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->year('year');
            $table->string('coverage');
            $table->string('barangays');
            $table->string('land_area');
            $table->string('household_population');
            $table->string('males');
            $table->string('females');
            $table->string('sex_ratio');
            $table->string('median_age');
            $table->string('doubling');
            $table->string('growth_rate');
            $table->string('average_household_size');
            $table->string('density');
            $table->string('age_dependency_ratio');
            $table->string('child_dependency_ratio');
            $table->string('old_age_dependency_ratio');
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
        Schema::dropIfExists('profiles');
    }
}
