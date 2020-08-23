import { Component, OnInit } from '@angular/core';
import { MarriagesService } from './marriages.service'

@Component({
  selector: 'app-marriages',
  templateUrl: './marriages.component.html',
  styleUrls: ['./marriages.component.scss']
})
export class MarriagesComponent implements OnInit {

	constructor(
		private MarriagesService : MarriagesService
	) { }

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

	fields = {
		'sorting_number':'',
        'municipality':'',
        'barangay':'',
        'total_cases':'',
        'household_number':'',
        'case_number':'',
        'month':'',
        'couple_name':'',
        'sex':'',
        'age_bracket':'',
        'address':'',
        'wedding_ceremony_type':'',
        'residence_address':'',
        'solemnizing_officer':'',
        'registered_lcr':'',
	}

	invalid = {
		'sorting_number':false,
        'municipality':false,
        'barangay':false,
        'total_cases':false,
        'household_number':false,
        'case_number':false,
        'month':false,
        'couple_name':false,
        'sex':false,
        'age_bracket':false,
        'address':false,
        'wedding_ceremony_type':false,
        'residence_address':false,
        'solemnizing_officer':false,
        'registered_lcr':false,	
	}

	isLoading = false
	save(){
		this.isLoading = true
		let hasError = false
		for(let key in this.fields){
			if( this.fields[key] == '' || this.fields[key] == null){
				this.invalid[key] = true
				hasError = true
			
			}
			else{
				this.invalid[key] = false
			}
		}
		if(!hasError){
			// this.fields.sorting_number = this.fields.sorting_number.toString()
			// this.fields.household_number = this.fields.household_number.toString()
			 
			this.MarriagesService.saveMarriageRecord(this.fields).subscribe(data => {
				console.log(data)
			})
			this.isLoading = false
		}else{			
			this.isLoading = false
			
		}	
	}
	


}
 