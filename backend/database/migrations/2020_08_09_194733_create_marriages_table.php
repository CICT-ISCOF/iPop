<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMarriagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('marriages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('municipality_id');
            $table
                ->foreign('municipality_id')
                ->references('id')
                ->on('municipalities');
            $table->foreignId('barangay_id');
            $table
                ->foreign('barangay_id')
                ->references('id')
                ->on('barangays');
            $table
                ->string('household_number')
                ->unique()
                ->nullable();
            $table->integer('total_cases');
            $table->string('case_number');
            $table->string('month_of_couple');
            $table->string('name_of_wife');
            $table->enum('sex', ['Male', 'Female']);
            $table->integer('age');
            $table->string('bracket_distribution');
            $table->string('address');
            $table->string('wedding_type');
            $table->string('residence_address');
            $table->string('solemnizing_officer');
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
        Schema::dropIfExists('marriages');
    }
}
