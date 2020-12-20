<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMOCSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_o_c_s', function (Blueprint $table) {
            $table->id();
            $table->string('municipality');
            $table->string('barangay');
            $table->year('year');
            $table->unsignedBigInteger('sessions')->default(0);
            $table->unsignedBigInteger('oriented_couples')->default(0);
            $table->unsignedBigInteger('individuals_interviewed')->default(0);
            $table->unsignedBigInteger('applicants_by_age_group')->default(0);
            $table->unsignedBigInteger('applicants_by_employment_status')->default(0);
            $table->unsignedBigInteger('applicants_by_income_class')->default(0);
            $table->unsignedBigInteger('applicants_by_knowledge_on_fp')->default(0);
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
        Schema::dropIfExists('p_m_o_c_s');
    }
}
