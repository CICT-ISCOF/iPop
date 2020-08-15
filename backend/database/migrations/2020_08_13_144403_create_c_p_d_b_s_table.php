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
            $table->id();
            $table->string('sorting_number');
            $table->string('municipality');
            $table->string('barangay');
            $table->string('zone');
            $table->string('household_number');
            $table->string('household_characteristics');
            $table->string('number_of_persons_living');
            $table->string('household_size_bracket');
            $table->string('number_of_families');
            $table->string('line_number_of_household_member');
            $table->string('name_of_household_member');
            $table->string('relationship_to_household_head');
            $table->string('sex');
            $table->string('date_of_birth');
            $table->string('age');
            $table->string('age_bracket');
            $table->string('civil_status');
            $table->string('highest_educational_attainment');
            $table->string('school_attendance');
            $table->string('level_of_school_attendance');
            $table->string('reason_for_not_attending_school');
            $table->string('religious_affiliation');
            $table->string('have_special_skills');
            $table->string('type_of_special_skill');
            $table->string('skills_specify');
            $table->string('presence_of_disability');
            $table->string('type_of_disability');
            $table->string('indigenous_group_or_tribe');
            $table->string('name_of_group_or_tribe');
            $table->string('specify_tribe');
            $table->string('active_philhealth_member');
            $table->string('philhealth_membership_specify');
            $table->string('usual_occupation_of_working_household_member');
            $table->string('specify_usual_occupation');
            $table->string('gross_monthly_income');
            $table->string('income_bracket');
            // Place of Work/Employment  of the Earning HH Member
            $table->string('place_of_work');
            $table->string('number_of_years_stay');
            $table->string('number_of_years_bracket');
            $table->string('fp_currently_used');
            $table->string('total_household_monthly_income');
            $table->string('household_income_bracket');
            $table->string('house_ownership');
            // How many stories/level is the house?
            $table->string('house_levels');
            $table->string('house_construction_material');
            $table->string('homelot_ownership_or_tenure_status');
            // Household Usual Source of Water for Drinking
            $table->string('source_of_drinking_water');
            $table->string('type_of_toilet');
            // Household's Garbage Disposal
            $table->string('garbage_disposal');
            $table->string('type_of_lighting_fuel');
            $table->string('type_of_cooking_fuel');
            $table->string('specify_cooking_fuel');
            // House Location Geo-Hazard Area
            $table->string('geohazard_area');
            $table->string('household_location');
            // Water Level in flood prone area
            $table->string('flood_prone_area_water_level');
            $table->string('access_to_infotech');
            $table->string('4ps_beneficiary_household');
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
