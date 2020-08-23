<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOutMigrationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('out_migrations', function (Blueprint $table) {
            $table->id();
            $table->string('sorting_number');
            $table->string('municipality');
            $table->string('barangay');
            $table->bigInteger('total_cases');
            $table->string('case_number');
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
            $table->date('date_of_birth');
            $table->unsignedTinyInteger('age');
            $table->string('age_in_months');
            $table->enum('age_bracket', [
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
            ]);
            $table->string('completed_educational_attainment');
            $table->string('actual_occupation');
            $table->string('major_occupation');
            $table->string('monthly_income');
            $table->text('skills_acquired');
            $table->string('actual_place_of_origin');
            $table->string('place_of_origin');
            $table->string('reasons_for_out_migrating');
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
        Schema::dropIfExists('out_migrations');
    }
}
