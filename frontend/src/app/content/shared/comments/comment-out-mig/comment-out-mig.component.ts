import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OutMigService } from '../../../out-mig/out-mig.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../../others/utility.service'
import Swal from 'sweetalert2'
import { LocationService } from '../../../../others/location.service'

@Component({
  selector: 'app-comment-out-mig',
  templateUrl: './comment-out-mig.component.html',
  styleUrls: ['./comment-out-mig.component.scss','../comment.responsive.scss']
})
export class CommentOutMigComponent implements OnInit {

  @ViewChild("textarea") textarea: ElementRef;

	ViewData = false

	constructor(
		private OutMigService : OutMigService,
		private route:ActivatedRoute,
		private UtilityService: UtilityService,
		private Router: Router,
		private LocationService : LocationService,
	) { }

	ngOnInit(): void {
		this.isLoading = true
		this.route.params.subscribe(data => {
			this.getRecord(data.id)
		});
		this.getMuncipalities()
	}
	
	getMuncipalities(){
		this.isLoading = true
		 this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.isLoading = false		
			console.log('municipalities',data)	
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
	isLoading = false

	theme = localStorage.getItem('data-theme')
	message = ''

	fields:any = {
		record: {
			user:{
				fullname:'',
				profile_picture:null
			}
		}
	}

	comments:any = []


	forps_beneficiary_household = 'tae'

	
	formatName(name){
		let newname = name.split(' ')
		newname = newname.join('')
		return newname
	}

	getRecord(id){
		this.OutMigService.getSpecificRecord(id).subscribe(data=>{
			this.fields = data
			this.comments = data.comments
			this.isLoading = false	
			this.forps_beneficiary_household = data['4ps_beneficiary_household']			
			console.log('data',data)
		})
	}


	addComment(){
		let data = {
			body:this.message,
			type:'OutMigration ',
			commentable_id:this.fields.id
		}
		this.OutMigService.addComment(data).subscribe(response => {
			this.UtilityService.setAlert('You have commented ' + this.message, 'success')
			this.message = ''
			this.ngOnInit()
		})
	}

	removeComment(id){			
		Swal.fire({
			title: 'Are you sure you want to remove this comment?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.OutMigService.removeComment(id).subscribe(data => {
					this.UtilityService.setAlert('You have remove a comment ', 'info')
					this.ngOnInit()
				})
			}		
		})	
	}

	updateRecord(){		
		Swal.fire({
			title: 'This will update existing data. Continue?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {			
				this.OutMigService.updateRecord(this.fields,this.fields.id).subscribe(data => {
					this.UtilityService.setAlert('Record has been successfully updated ', 'info')
					this.fields = data
					this.ngOnInit()
				})
			}		
		})	
	}

	reply(){
		this.textarea.nativeElement.focus()
	} 

	approve(){		
		Swal.fire({
			title: 'Countinue approving this data?' ,		
			icon: 'success',
			showCancelButton: true,
			confirmButtonText: 'Approve',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				status = 'Approved'
				this.updateStatus(status)
			}		
		})	
	}

	disapprove(){
		Swal.fire({
			title: 'Are you sure you want to disapprove this data?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Disapprove',
			cancelButtonText: 'Nope'
			}).then((result) => {
			if (result.value) {
				status = 'Disapproved'
				this.updateStatus(status)
			}		
		})	
	}

	needsEditing(){
		status = 'Needs Editing'
		this.updateStatus(status)
	}

	noted(){
		status = 'Noted and will edit'
		this.updateStatus(status)
	}

	updateStatus(status){
		const id = this.fields.record.id
		this.OutMigService.updateStatus(status,id).subscribe(data => {
			this.OutMigService.setRow()		
			this.ngOnInit()
		})
	}




	// ------------------- select --------------------------

	 
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
	

}
