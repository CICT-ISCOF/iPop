import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MarriagesService } from '../../../marriages/marriages.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../../others/utility.service'
import Swal from 'sweetalert2'
import { LocationService } from '../../../../others/location.service'

@Component({
  selector: 'app-comment-marriages',
  templateUrl: './comment-marriages.component.html',
  styleUrls: ['./comment-marriages.component.scss','../comment.responsive.scss']
})
export class CommentMarriagesComponent implements OnInit {

  @ViewChild("textarea") textarea: ElementRef;

	ViewData = false

	constructor(
		private MarriagesService : MarriagesService,
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
		this.MarriagesService.getSpecificRecord(id).subscribe(data=>{
			this.fields = data
			this.comments = data.comments
			this.isLoading = false	
			this.forps_beneficiary_household = data['4ps_beneficiary_household']			
		})
	}


	addComment(){
		let data = {
			body:this.message,
			type:'Marriage',
			commentable_id:this.fields.id
		}
		this.MarriagesService.addComment(data).subscribe(response => {
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
				this.MarriagesService.removeComment(id).subscribe(data => {
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
				this.MarriagesService.updateRecord(this.fields,this.fields.id).subscribe(data => {
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
		this.MarriagesService.updateStatus(status,id).subscribe(data => {
			this.MarriagesService.setRow()		
			this.ngOnInit()
		})
	}




	// ------------------ select --------------------------


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
