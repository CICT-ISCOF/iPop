import { Component, OnInit } from '@angular/core';
import { DeathsService } from './deaths.service'


@Component({
  selector: 'app-deaths',
  templateUrl: './deaths.component.html',
  styleUrls: ['./deaths.component.scss']
})
export class DeathsComponent implements OnInit {

	constructor(
		private DeathsService : DeathsService
	) { }

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

	placeOfDeaths = [
		'Home',
		'Hospital',
		'Others',    
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
		'number_of_cases':'',
		'household_number':'',
		'month':'',
		'name':'',
		'sex':'',
		'age_at_death':'',
		'age_bracket':'',
		'place_of_death':'',
		'registered_lcr':'',
	}

	invalid = {
		'sorting_number':false,
		'municipality':false,
		'barangay':false,
		'total_cases':false,
		'number_of_cases':false,
		'household_number':false,
		'month':false,
		'name':false,
		'sex':false,
		'age_at_death':false,
		'age_bracket':false,
		'place_of_death':false,
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
			this.fields.sorting_number = this.fields.sorting_number.toString()
			this.fields.household_number = this.fields.household_number.toString()
			 
			this.DeathsService.saveDeathRecord(this.fields).subscribe(data => {
				console.log(data)
			})
			this.isLoading = false
		}else{			
			this.isLoading = false
		}
	}

}
