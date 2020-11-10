<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSBMPTCSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_b_m_p_t_c_s', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
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
        Schema::dropIfExists('s_b_m_p_t_c_s');
    }
}
