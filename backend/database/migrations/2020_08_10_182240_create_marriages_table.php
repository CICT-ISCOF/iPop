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
                ->string('household_number')
                ->nullable()
                ->default(null);
            $table
                ->string('case_number')
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
                ->string('couple_name')
                ->nullable()
                ->default(null);
            $table
                ->enum('sex', ['Male', 'Female'])
                ->nullable()
                ->default(null);
            $table
                ->unsignedTinyInteger('age')
                ->nullable()
                ->default(null);
            $table
                ->enum('age_bracket', [
                    'Below 1 year old',
                    '01-04',
                    '05-09',
                    '10-14',
                    '15-19',
                    '20-24',
                    '25-29',
                    '30-34',
                    '35-39',
                    '40-44',
                    '45-49',
                    '50-54',
                    '55-59',
                    '60-64',
                    '65-69',
                    '70-74',
                    '75-79',
                    '80 and above',
                ])
                ->nullable()
                ->default(null);
            $table
                ->string('address')
                ->nullable()
                ->default(null);
            $table
                ->string('wedding_ceremony_type')
                ->nullable()
                ->default(null);
            $table
                ->string('residence_address')
                ->nullable()
                ->default(null);
            $table
                ->string('solemnizing_officer')
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
        Schema::dropIfExists('marriages');
    }
}
