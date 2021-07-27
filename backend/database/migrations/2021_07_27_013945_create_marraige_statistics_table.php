<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMarraigeStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marraige_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->unsignedDouble('population');
            $table->unsignedDouble('total_marriages');
            $table->unsignedDouble('church');
            $table->unsignedDouble('civil');
            $table->unsignedDouble('others');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('marraige_statistics');
    }
}
