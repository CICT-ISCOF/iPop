<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMCCSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_c_c_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->year('year');
            $table->string('single_male');
            $table->string('single_female');
            $table->string('live_in_male');
            $table->string('live_in_female');
            $table->string('widow_male');
            $table->string('widow_female');
            $table->string('separated_male');
            $table->string('separated_female');
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
        Schema::dropIfExists('p_m_c_c_s');
    }
}
