<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTeenageBirthIncidenceGraphsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teenage_birth_incidence_graphs', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->string('month');
            $table->year('year');
            $table->unsignedBigInteger('value');
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
        Schema::dropIfExists('teenage_birth_incidence_graphs');
    }
}
