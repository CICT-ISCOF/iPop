<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMCKFPSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_c_k_f_p_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->year('year');
            $table->unsignedBigInteger('males');
            $table->unsignedBigInteger('females');
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
        Schema::dropIfExists('p_m_c_k_f_p_s');
    }
}
