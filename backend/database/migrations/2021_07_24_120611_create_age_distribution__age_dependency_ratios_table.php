<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgeDistributionAgeDependencyRatiosTable extends Migration
{
    public function up()
    {
        Schema::create('age_distribution__age_dependency_ratios', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->double('hh_population');
            $table->double('0-14');
            $table->double('15-64');
            $table->double('65_and_over');
            $table->double('young_dependency');
            $table->double('old_dependency');
            $table->double('dependency');
        });
    }

 
    public function down()
    {
        Schema::dropIfExists('age_distribution__age_dependency_ratios');
    }
}
