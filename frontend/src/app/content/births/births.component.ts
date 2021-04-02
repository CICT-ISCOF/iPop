import { Component, OnInit } from '@angular/core';
import { BirthsService } from './births.service'
import { UtilityService } from '../../others/utility.service'
import { LocationService } from '../../others/location.service'


@Component({
  selector: 'app-births',
  templateUrl: './births.component.html',
  styleUrls: ['./births.component.scss']
})
export class BirthsComponent implements OnInit {

	constructor(
		private BirthsService : BirthsService,
		private UtilityService : UtilityService,
		private LocationService : LocationService
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
		'10-14',
		'15-19',
		'20-24',
		'25-29',
		'30-34',
		'35-39',
		'40-44',
		'45-49',
		'50-54',
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
		mothers_actual_work:''
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
		'birth_order':false,
		'place_of_birth':false,
		'name_of_mother':false,
		'age_of_mother':false,
		'age_bracket_of_mother':false,
		'occupation_of_mother':false,
		'religion':false,
		'mother_marital_status':false,
		'registered_lcr':false,
		mothers_actual_work:false
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
			this.BirthsService.saveBirthRecord(this.fields).subscribe(data => {
				this.UtilityService.setAlert('Birth Record has been successfully saved','success')
				this.isLoading = false
			})			
		}else{			
			this.isLoading = false
			
		}	
	}

}
