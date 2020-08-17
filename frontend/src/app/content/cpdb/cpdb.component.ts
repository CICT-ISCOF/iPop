import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpdb',
  templateUrl: './cpdb.component.html',
  styleUrls: ['./cpdb.component.scss']
})
export class CpdbComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	select = {
		houseHoldSizeBrackets:[
			'1-3',
			'4-6',
			'7 and over'
		],

		RelationshiptoHouseholdHeads:[
			'Household Head',
			'Wife/Husband',
			'Son/Daughter',
			'Son-in-law/Daughter-in-law',
			'Grand Child (apo)',
			'Parent',
			'Parent-in-Law',
			'Brother/Sister',
			'Other Relatives (Uncle/aunt; cousins; grandparents)',
			'NO RELATION:  (househelpers;friends)',
			'Brother/Sister in Law',
		],

		Sexes:[
			'Male',
			'Female'
		],

		AgeBrackets:[
			'Below 1 year old',
			'1-4',
			'5-9',
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
		],

		CivilStatuses:[
			'Single',
			'Married (Kasado)',
			'Separated (legally) or /Divorced',
			'Common Law/Live-in',
			'Widow/er',
		],

		HighestEducationalAttainments:[
			'No Education',
			'Pre-school (Kinder or Day Care)',
			'Elementary Level (Grade 1 to 5)',
			'Elementary Grad (Completed Grade 6)',
			'High School Level (Grade 7-10)',
			'Senior High (Grade 11-12)',
			'High School Grad (completed 4th year High School)',
			'Tech "l/Vocl" (2-3 yr Course)',
			'College, Not Completed',
			'College Graduate',
			'Post Graduate (Masteral or Doctoral)',
			'ALS (Alternative Learning System)',
			'Not Applicable',			
		],

		SchoolAttendances:[
			'No',
			'Yes'
		],

		GradeYearLevelofSchoolAttendances:[
			'Pre-School',
			'Elementary',
			'Junior High School',
			'Senior High',
			'Techl"/Vocl"',
			'College',
			'Post Grad',
			'ALS',			
		],

		ReasonforNotAttendingSchools:[
			'Sickly/PWD',
			'Financial',
			'Pregnancy (nagbusong or nagpabusong)',
			'Got married/Lived-in',
			'Working for pay',
			'Not interested to go to school',
			'No documents for enrolment',
			'College grad',
			'Vocational grad',
			'Looking for work',
			'House far from school',
			'Others, specify',
			'Not applicable',
		],

		ReligiousAffiliations:[
			"R. Catholic",
			"Protestant",
			"Iglesia ni Kristo",
			"Seventh Day Adventist",
			"Aglipay",
			"Jehovah's Witness",
			"Islam",
			"Baptist",
			"Others (Born Again, Mormon, etc.)",
		],

		TypeofSpecialSkills:[
			'Carpentry',
			'Driving',
			'Dressmaking/ Tailoring',
			'Computer Operations',
			'Beauty Culture',
			'Food Processing',
			'Electrician',
			'Electronic tech',
			'Mechanic',
			'Welding',
			'Handicraft',
			'Performing Arts',
			'Visual Arts',
			'Sports',
			'Others (specify)',			
		],

		TypeofDisabilities:[
			'Muskuloskeletal (kuing, kimpay, kulang kamot/tiil, paralitiko, poliohon)',
			'Motor Disability (cerebral palsy, epileptic, na stroke, dibilitating arthritis)',
			'Seeing Disability (bulag, hurapon)',
			'Hearing Disability (bungol, indi makabati)',
			'Mental Impairment (special child, Down syndrome, mentally retarded or mentally ill)',
			'Speech Disability (pitla, apa, bulol)',
			'Deformities (ponga, sungi, kuba/buktot)',
			'Multiple Disabilities (e.g. Deaf-mute)',			
		],

		NameofIndigenousorTribes:[
			'Sulodnon',
			'Ati',
			'Panayanon',
			'Bukidnon',
			'Others, specify',
		],

		PhilHealthMemberships:[
			'NHTS',
			'4Ps',
			'Social Pensioner (Senior Citizen)',
			'Municipal Paid',
			'Employer-Private/Government',
			'Self Paid',			
		],

		UsualOccupationofWorkingHHMembers:[
			'Farming & related activities',
			'Fishing & related activities',
			'Sales/Business',
			'OFW (land-based)',
			'Employed in Government Office/Agency',
			'Employed in Private Firms',
			'Seafarer (Seaman)',
			'Practice of Profession',
			'Daily Wage Earner, laborers, services (on-call)',
			'Allotee/Remittance',
			'Pension',
			'Others:  Honorarium- Brgy Officials Brgy Volunteers, Tanod, etc',
			
		],

		IncomeBrackets : [
			'5,000 pesos & Below',
			'5001 - 15,000 pesos',
			'30,001 - 50,000 pesos',
			'50,000 pesos & Over',
		],

		PlaceofWorkorEmploymentoftheEarningHHMembers:[
			'Within the Barangay',
			'Within the Municipality',
			'Within the Province',
			'Within the Country',
			'Outside the Country (Abroad)',			
		],

		NoofYearsStayBrackets:[
			'Below 1 Year',
			'1-2',
			'3-4',
			'5 and over',
		],

		FPCurrentlyUseds:[
			'Tubal Ligation',
			'Vasectomy',
			'IUD',
			'Implant',
			'Injectable',
			'Pill',
			'Condom',
			"Billing's Ovulation Method",
			'Standard Days Method',
			'Basal Body Temperature',
			'Symptothermal Method',
			'Lactational Amenorrhea',
			'Traditional (Rhythm, Withdrawal, Abstinence, etc)',
			'None',
			
		],

		HouseholdIncomeBrackets:[
			'5,000 pesos & Below',
			'5001 - 15,000 pesos',
			'15,001 - 30,000 pesos',
			'30,001 - 50,000 pesos',
			'50,000 pesos & Over',			
		],

		HouseOwnerships:[
			'Owned',
			'Pay rent',
			'Stay for free',
		],

		Howmanystories:[
			'One',
			'Two',
			'More than two',			
		],

		HouseConstructionMaterials:[
			'Permanent (Mostly Concrete)',
			'Semi-permanent (Combination of concrete & wood)',
			'Temporary (Nipa, bamboo, cogon)',
			'Makeshift/shanty/improvised',			
		],

		HomelotOwnershipStatuses:[
			'Owned',
			'Rented',
			"With Owner's Consent",
			"Without owner's consent",
		],

		HHUsualSourceofWaterforDrinkings:[
			'Community Water System',
			'Deep Well with Pump (Tasok)',
			'Open Dug Well',
			'Covered Dugwell',
			'Water Refilling Station',
			'MIWD/LWUA',
			'Spring',
			'Rain Water',
			'Others, specify',
		],

		TypeofToilettheHouseholdwns:[
			'Water-sealed (with concrete septice tank)',
			'Water-sealed (WITHOUT septic tank)',
			'Closed-pit',
			'Communal/Public Toilet',
			'None/Shared',
		],

		HouseholdsGarbageDisposals: [
			'Composting',
			'Burning',
			'Burying',
			'Collected by Garbage Truck',
			'Thrown Anywhere',
			'Others, specify',			
		],

		TypeofFuelUseforLighting: [
			'Electricity',
			'Kerosene (Gas)',
			'Tap from nearby house',
			'Illegal Connection',
			'Generator Set',
			'Solar Panels',
			'Others, specify',			
		],

		TypeofuelforCooking:[
			'Electricity',
			'Kerosene (Gas)',
			'LPG',
			'Wood/charcoal',
			'Others, specify',			
		],


		HouseholdLocation:[
			'Landslide prone',
			'Along the riverbank',
			'Flood-prone',
			'Along the seashore/storm surge area',
			'Along faultline',
			'Along Road Slips',
			'Others, specify',			
		],

		WaterLevelinfloodpronearea:[
			'1/4 meter to below 1/2 meter high',
			'1/2 meter to below 1 meter',
			'1 meter and higher',			
		],

		AccesstoInformationTechnology:[
			'Cable Satellite services',
			'Internet Services',
			'Mobile service providers',
			'Others, specify',
		],
	}


	field = {
		'sorting_number':'',
        'municipality':'',
        'barangay':'',
        'zone':'',
        'household_number':'',
        'household_characteristics':'',
        // 'number_of_persons_living':'',
        'household_size_bracket':'',
        'number_of_families':'',
        'line_number_of_household_member':'',
        'name_of_household_member':'',
        'relationship_to_household_head':'',
        'sex':'',
        'date_of_birth':'',
        'age':'',
        'age_bracket':'',
        'civil_status':'',
        'highest_educational_attainment':'',
        'school_attendance':'',
        'level_of_school_attendance':'',
        'reason_for_not_attending_school':'',
        'religious_affiliation':'',
        'have_special_skills':'',
        'type_of_special_skill':'',
        'skills_specify':'',
        'presence_of_disability':'',
        'type_of_disability':'',
        'indigenous_group_or_tribe':'',
        'name_of_group_or_tribe':'',
        'specify_tribe':'',
        'active_philhealth_member':'',
        'philhealth_membership_specify':'',
        'usual_occupation_of_working_household_member':'',
        'specify_usual_occupation':'',
        'gross_monthly_income':'',
        // 'income_bracket':'',
        'place_of_work':'',
        'number_of_years_stay':'',
        'number_of_years_bracket':'',
        'fp_currently_used':'',
        'total_household_monthly_income':'',
        'household_income_bracket':'',
        'house_ownership':'',
        'house_levels':'',
        'house_construction_material':'',
        'homelot_ownership_or_tenure_status':'',
        'source_of_drinking_water':'',
        'type_of_toilet':'',
        'garbage_disposal':'',
        'type_of_lighting_fuel':'',
        'type_of_cooking_fuel':'',
        'specify_cooking_fuel':'',
        'geohazard_area':'',
        'household_location':'',
        'flood_prone_area_water_level':'',
        'access_to_infotech':'',
        'forps_beneficiary_household':'',
	}


	requiredFields = []

	checkRequiredFields(){
		const fields = this.requiredFields
		for (let field of fields) {
			if(field == "" || field == null){
				//alert nga on or more fields should not be empty
			}
		}
	}

	submit(){
		console.log(JSON.stringify(this.field))
	}

}
