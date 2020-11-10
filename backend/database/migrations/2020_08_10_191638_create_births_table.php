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
            $table
                ->string('sorting_number')
                ->nullable()
                ->default(null);
            $table
                ->string('municipality')
                ->nullable()
                ->default(null);
            $table
                ->string('barangay')
                ->nullable()
                ->default(null);
            $table
                ->bigInteger('total_cases')
                ->nullable()
                ->default(null);
            $table
                ->bigInteger('number_of_cases')
                ->nullable()
                ->default(null);
            $table
                ->string('household_number')
                ->nullable()
                ->default(null);
            $table
                ->enum('month', [
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
                ])
                ->nullable()
                ->default(null);
            $table
                ->string('name')
                ->nullable()
                ->default(null);
            $table
                ->enum('sex', ['Male', 'Female'])
                ->nullable()
                ->default(null);
            $table
                ->enum('birth_order', [
                    'First Born',
                    'Second Born',
                    'Third Born',
                    'Fourth Born',
                    'Fifth and up',
                ])
                ->nullable()
                ->default(null);
            $table
                ->string('place_of_birth')
                ->nullable()
                ->default(null);
            $table
                ->string('name_of_mother')
                ->nullable()
                ->default(null);
            $table
                ->unsignedTinyInteger('age_of_mother')
                ->nullable()
                ->default(null);
            $table
                ->enum('age_bracket_of_mother', [
                    '10-14',
                    '15-19',
                    '20-24',
                    '25-29',
                    '30-34',
                    '35-39',
                    '40-44',
                    '45-49',
                    '50-54',
                ])
                ->nullable()
                ->default(null);
            $table
                ->string('occupation_of_mother')
                ->nullable()
                ->default(null);
            $table
                ->string('mothers_actual_work')
                ->nullable()
                ->default(null);
            $table
                ->string('religion')
                ->nullable()
                ->default(null);
            $table
                ->string('mother_marital_status')
                ->nullable()
                ->default(null);
            $table
                ->string('registered_lcr')
                ->nullable()
                ->default(null);
            $table->softDeletes();
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
