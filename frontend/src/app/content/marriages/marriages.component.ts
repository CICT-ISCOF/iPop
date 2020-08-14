import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marriages',
  templateUrl: './marriages.component.html',
  styleUrls: ['./marriages.component.scss']
})
export class MarriagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

	months = [
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

	typeOfWeddingCeremonies = [
		'Church',
		'Civil',
		'Tribal Rites',
	]

	solemnizingOfficers = [
		'Judge',
		'Mayor',
		'Priest/Pastor/Imam',		
	]

	registeredLCRs = [
		'Yes',
		'No'    
	  ]
	


}
 