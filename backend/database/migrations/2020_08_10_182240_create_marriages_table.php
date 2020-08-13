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
            $table->string('sorting_number');
            $table->string('municipality');
            $table->string('barangay');
            $table->bigInteger('total_cases');
            $table->string('household_number');
            $table->string('case_number');
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
            $table->string('couple_name');
            $table->enum('sex', ['Male', 'Female']);
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
            $table->string('address');
            $table->enum('wedding_ceremony_type', [
                'Church',
                'Civil',
                'Tribal Rites',
            ]);
            $table->string('residence_address');
            $table->enum('solemnizing_officer', [
                'Judge',
                'Mayor',
                'Priest/Pastor/Imam',
            ]);
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
        Schema::dropIfExists('marriages');
    }
}
