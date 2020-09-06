import { Component, OnInit } from '@angular/core';
import { MarriagesService } from './marriages.service'
import { UtilityService } from '../../utility.service'
import { LocationService } from '../../location.service'

@Component({
  selector: 'app-marriages',
  templateUrl: './marriages.component.html',
  styleUrls: ['./marriages.component.scss']
})
export class MarriagesComponent implements OnInit {

	constructor(
		private MarriagesService : MarriagesService,
		private UtilityService :  UtilityService,
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

	getBarangays(event){
		this.isLoading = true
		this.fields.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data	
			this.isLoading = false
		})
	}

	municipalities:any = [] 
	barangays:any = [] 

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
		age:''
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
		age:false
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
			this.MarriagesService.saveMarriageRecord(this.fields).subscribe(data => {
				this.UtilityService.setAlert('Marriage Record has been successfully saved' ,'success')
			})
			this.isLoading = false
		}else{			
			this.isLoading = false
			
		}	
	}
	


}
 