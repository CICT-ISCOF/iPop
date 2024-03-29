import { Component, OnInit } from '@angular/core';
import { OutMigService } from './out-mig.service'
import { UtilityService } from '../../others/utility.service'
import { LocationService } from '../../others/location.service'

@Component({
  selector: 'app-out-mig',
  templateUrl: './out-mig.component.html',
  styleUrls: ['./out-mig.component.scss']
})
export class OutMigComponent implements OnInit {

	constructor(
		private OutMigService : OutMigService,
		private UtilityService: UtilityService,
		private LocationService : LocationService,
	) { }

	
	ngOnInit(): void {
		this.getMuncipalities()
	}

	getMuncipalities(){
		this.isLoading = true
		 this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.isLoading = false			
		})
	}

	barangayIsLoading = false
	getBarangays(event){
		this.barangayIsLoading = true
		this.fields.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data	
			this.barangayIsLoading = false
		})
	}

	municipalities:any = [] 
	barangays:any = [] 


  
	monthOfMigrations = [
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

	educationalAttainment = [
		'None Completed',
		'Elementary Graduate',
		'High School, not completed',
		'High School Graduate',
		'Technical/Vocational',
		'College, not completed',
		'College Graduate',
		'Post Graduate Studies',
	]

	occupations = [
		'Gainful',
		'Non- Gainful'	
	]

	monthlyIncome = [
		'No Income',
		'Under 5,000',
		'5,000-9,999',
		'10,000-14,999',
		'15,000-19,999',
		'20,000-24,999',
		'25,000&over',	
	]

	placeOfOrigin = [
		'Other Barangay, within the municipality',
		'Other Municipality, within the province',
		'Other Province, within the country',
		'Abroad'
	]

	reasonForInMagrating = [
		'Transfer to permanent residence(Lot/house purchase)',
		'Livelihood/Employment',
		'Marriage',
		'Live with Parents/ relatives',
		'Education',
		'Balik bayan/return to own place',
		'Land/boundary dispute',
		'Live in',
	]

	specificReason = [
		'Transfer to permanent residence(Lot/house purchase)',
		'Livelihood/Employment',
		'Marriage',
		'Live with Parents/ relatives',
		'Education',
		'Balik bayan/return to own place',
		'Land/boundary dispute',
		'Live in',
	]


	fields = {
		'sorting_number':'',
        'municipality':'',
        'barangay':'',
        'total_cases':'',
        'case_number':'',
        'month':'',
        'name':'',
        'sex':'',
        'date_of_birth':'',
        'age':'',
        'age_in_months':'',
        'age_bracket':'',
        'completed_educational_attainment':'',
        'actual_occupation':'',
        'major_occupation':'',
        'monthly_income':'',
        'skills_acquired':'',
        'actual_place_of_origin':'',
        'place_of_origin':'',
		'reasons_for_out_migrating':'',
		household_number:''
	}


	invalid = {
		'sorting_number':false,
        'municipality':false,
        'barangay':false,
        'total_cases':false,
        'case_number':false,
        'month':false,
        'name':false,
        'sex':false,
        'date_of_birth':false,
        'age':false,
        'age_in_months':false,
        'age_bracket':false,
        'completed_educational_attainment':false,
        'actual_occupation':false,
        'major_occupation':false,
        'monthly_income':false,
        'skills_acquired':false,
        'actual_place_of_origin':false,
        'place_of_origin':false,
		'reasons_for_out_migrating':false,
		household_number:false
	}

	isLoading = false
	save(){
		this.isLoading = true
		let hasError = false
		// for(let key in this.fields){
		// 	if( this.fields[key] == '' || this.fields[key] == null){
		// 		this.invalid[key] = true
		// 		hasError = true
			
		// 	}
		// 	else{
		// 		this.invalid[key] = false
		// 	}
		// }
		if(!hasError){
			this.OutMigService.saveOutMigrationRecord(this.fields).subscribe(data => {
				this.UtilityService.setAlert('Out Migration Record has been saved','success')
				this.isLoading = false
			})			
		}else{			
			this.isLoading = false
			
		}	
	}
 
}
