<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMCAgeGroupsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_c_age_groups', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->string('15_to_19_male');
            $table->string('15_to_19_female');
            $table->string('20_to_24_male');
            $table->string('20_to_24_female');
            $table->string('25_to_29_male');
            $table->string('25_to_29_female');
            $table->string('30_to_34_male');
            $table->string('30_to_34_female');
            $table->string('35_to_39_male');
            $table->string('35_to_39_female');
            $table->string('40_to_44_male');
            $table->string('40_to_44_female');
            $table->string('45_and_above_male');
            $table->string('45_and_above_female');
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
        Schema::dropIfExists('p_m_c_age_groups');
    }
}
