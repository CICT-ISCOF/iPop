<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMCAMISTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_c_a_m_i_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->year('year');
            $table->string('no_income_male');
            $table->string('no_income_female');
            $table->string('under_5k_male');
            $table->string('under_5k_female');
            $table->string('5k_to_10k_male');
            $table->string('5k_to_10k_female');
            $table->string('10k_to_15k_male');
            $table->string('10k_to_15k_female');
            $table->string('15k_to_20k_male');
            $table->string('15k_to_20k_female');
            $table->string('20k_to_25k_male');
            $table->string('20k_to_25k_female');
            $table->string('above_25k_male');
            $table->string('above_25k_female');
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
        Schema::dropIfExists('p_m_c_a_m_i_s');
    }
}
