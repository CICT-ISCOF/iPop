<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInMigrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('in_migrations', function (Blueprint $table) {
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
                ->string('case_number')
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
                ->date('date_of_birth')
                ->nullable()
                ->default(null);
            $table
                ->unsignedTinyInteger('age')
                ->nullable()
                ->default(null);
            $table
                ->string('age_in_months')
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
                ])
                ->nullable()
                ->default(null);
            $table
                ->string('completed_educational_attainment')
                ->nullable()
                ->default(null);
            $table
                ->string('actual_occupation')
                ->nullable()
                ->default(null);
            $table
                ->string('major_occupation')
                ->nullable()
                ->default(null);
            $table
                ->string('monthly_income')
                ->nullable()
                ->default(null);
            $table
                ->text('skills_acquired')
                ->nullable()
                ->default(null);
            $table
                ->string('actual_place_of_origin')
                ->nullable()
                ->default(null);
            $table
                ->string('place_of_origin')
                ->nullable()
                ->default(null);
            $table
                ->string('reasons_for_in_migrating')
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
        Schema::dropIfExists('in_migrations');
    }
}
