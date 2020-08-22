<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCPDBSTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('c_p_d_b_s', function (Blueprint $table) {
            $table->id()->nullable();
            $table->string('sorting_number')->nullable();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('zone')->nullable();
            $table->string('household_number')->nullable();
            $table->string('household_characteristics')->nullable();
            $table->string('number_of_persons_living')->nullable();
            $table->string('household_size_bracket')->nullable();
            $table->string('number_of_families')->nullable();
            $table->string('line_number_of_household_member')->nullable();
            $table->string('name_of_household_member')->nullable();
            $table->string('relationship_to_household_head')->nullable();
            $table->string('sex')->nullable();
            $table->string('date_of_birth')->nullable();
            $table->string('age')->nullable();
            $table->string('age_bracket')->nullable();
            $table->string('civil_status')->nullable();
            $table->string('highest_educational_attainment')->nullable();
            $table->string('school_attendance')->nullable();
            $table->string('level_of_school_attendance')->nullable();
            $table->string('reason_for_not_attending_school')->nullable();
            $table->string('religious_affiliation')->nullable();
            $table->string('have_special_skills')->nullable();
            $table->string('type_of_special_skill')->nullable();
            $table->string('presence_of_disability')->nullable();
            $table->string('type_of_disability')->nullable();
            $table->string('indigenous_group_or_tribe')->nullable();
            $table->string('name_of_group_or_tribe')->nullable();
            $table->string('active_philhealth_member')->nullable();
            $table->string('philhealth_membership_specify')->nullable();
            $table->string('usual_occupation_of_working_household_member')->nullable();
            $table->string('gross_monthly_income')->nullable();
            $table->string('income_bracket')->nullable();
            $table->string('place_of_work')->nullable();
            $table->string('number_of_years_stay')->nullable();
            $table->string('number_of_years_bracket')->nullable();
            $table->string('fp_currently_used')->nullable();
            $table->string('total_household_monthly_income')->nullable();
            $table->string('household_income_bracket')->nullable();
            $table->string('house_ownership')->nullable();
            $table->string('house_levels')->nullable();
            $table->string('house_construction_material')->nullable();
            $table->string('homelot_ownership_or_tenure_status')->nullable();
            $table->string('source_of_drinking_water')->nullable();
            $table->string('type_of_toilet')->nullable();
            $table->string('garbage_disposal')->nullable();
            $table->string('type_of_lighting_fuel')->nullable();
            $table->string('type_of_cooking_fuel')->nullable();
            $table->string('geohazard_area')->nullable();
            $table->string('household_location')->nullable();
            $table->string('flood_prone_area_water_level')->nullable();
            $table->string('access_to_infotech')->nullable();
            $table->string('4ps_beneficiary_household')->nullable();
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
        Schema::dropIfExists('c_p_d_b_s');
    }
}
