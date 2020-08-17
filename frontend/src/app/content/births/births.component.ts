import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-births',
  templateUrl: './births.component.html',
  styleUrls: ['./births.component.scss']
})
export class BirthsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

	months= [
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
	]

	sexs = [
		'Male',
		'Female'
	]

	ageBrackets = [
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
		'80 and above'
	]

	registeredLCRs = [
		'Yes',
		'No'    
	]

	birthOrders = [
		'First Born',
		'Second Born',
		'Third Born',
		'Fourth Born',
		'Fifth and up',
	]

	placeofBirths = [
		'Government Hospital/Clinic',
		'Private Hospital/Clinic',
		'Home',
		'Municipal Birthing Center',
		'Brgy. Health Station',
		'Others, please specify',
	]

	occupations = [
		'Gainful',
	' Non-Gainful',
	' Student',    
	]

	religions =[
		'R. Catholic',
		'Non-Catholic',
		'Non-Christian',
		'Atheist',
	]

	maritalStatuses = [
		'Single',
		'Married',
		'Common-Law/Live-in',
		'Separated/Solo Parent',
	]

	fields = {
		'sorting_number':'',
		'municipality':'',
		'barangay':'',
		'total_cases':'',
		'number_of_cases':'',
		'household_number':'',
		'month':'',
		'name':'',
		'sex':'',
		'birth_order':'',
		'place_of_birth':'',
		'name_of_mother':'',
		'age_of_mother':'',
		'age_bracket_of_mother':'',
		'occupation_of_mother':'',
		'religion':'',
		'mother_marital_status':'',
		'registered_lcr':'',
	}

}
