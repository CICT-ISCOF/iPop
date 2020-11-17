<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMPCFDCSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_p_c_f_d_c_s', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->string('municipality');
            $table->string('district');
            $table->unsignedSmallInteger('tc_coordinator_count');
            $table->unsignedBigInteger('population');
            $table->text('services');
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
        Schema::dropIfExists('m_p_c_f_d_c_s');
    }
}
