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
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year')->nullable();
            $table->string('coverage')->nullable();
            $table->string('barangays')->nullable();
            $table->string('land_area')->nullable();
            $table->string('household_population')->nullable();
            $table->string('males')->nullable();
            $table->string('females')->nullable();
            $table->string('sex_ratio')->nullable();
            $table->string('median_age')->nullable();
            $table->string('doubling')->nullable();
            $table->string('growth_rate')->nullable();
            $table->string('households')->nullable();
            $table->string('average_household_size')->nullable();
            $table->string('density')->nullable();
            $table->string('age_dependency_ratio')->nullable();
            $table->string('child_dependency_ratio')->nullable();
            $table->string('old_age_dependency_ratio')->nullable();
            $table->string('dowloadable_link')->nullable();
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
