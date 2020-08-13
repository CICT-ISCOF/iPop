<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBirthsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('births', function (Blueprint $table) {
            $table->id();
            $table->string('sorting_number');
            $table->string('municipality');
            $table->string('barangay');
            $table->bigInteger('total_cases');
            $table->bigInteger('number_of_cases');
            $table->string('household_number');
            $table->enum('month', [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]);
            $table->string('name');
            $table->enum('sex', ['Male', 'Female']);
            $table->enum('birth_order', [
                'First Born',
                'Second Born',
                'Third Born',
                'Fourth Born',
                'Fifth and up',
            ]);
            $table->string('place_of_birth');
            $table->string('name_of_mother');
            $table->unsignedTinyInteger('age_of_mother');
            $table->enum('age_bracket_of_mother', [
                '10-14',
                '15-19',
                '20-24',
                '25-29',
                '30-34',
                '35-39',
                '40-44',
                '45-49',
                '50-54',
            ]);
            $table->string('occupation_of_mother');
            $table->string('religion');
            $table->string('mother_marital_status');
            $table->boolean('registered_lcr');
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
        Schema::dropIfExists('births');
    }
}
