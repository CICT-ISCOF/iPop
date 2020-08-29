import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { InMigService } from '../../../in-mig/in-mig.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UtilityService } from '../../../../utility.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-comment-in-mig',
  templateUrl: './comment-in-mig.component.html',
  styleUrls: ['./comment-in-mig.component.scss']
})
export class CommentInMigComponent implements OnInit {

  @ViewChild("textarea") textarea: ElementRef;

	ViewData = false

	constructor(
		private InMigService : InMigService,
		private route:ActivatedRoute,
		private UtilityService: UtilityService,
		private Router: Router,
	) { }

	ngOnInit(): void {
		this.isLoading = true
		this.route.params.subscribe(data => {
			this.getRecord(data.id)
		});
		
	}
	isLoading = false

	theme = localStorage.getItem('data-theme')

	message

	fields:any

	comments:any


	forps_beneficiary_household = 'tae'

	
	formatName(name){
		let newname = name.split(' ')
		newname = newname.join('')
		return newname
	}

	getRecord(id){
		this.InMigService.getSpecificRecord(id).subscribe(data=>{
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
			type:'InMigration ',
			commentable_id:this.fields.id
		}
		this.InMigService.addComment(data).subscribe(response => {
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
				this.InMigService.removeComment(id).subscribe(data => {
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
				this.InMigService.updateRecord(this.fields,this.fields.id).subscribe(data => {
					this.UtilityService.setAlert('Record has been successfully updated ', 'info')
					this.fields = data
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
		this.InMigService.updateStatus(status,id).subscribe(data => {
			this.InMigService.setRow()		
			this.ngOnInit()
		})
	}



	// ------------------- select ------------------------------

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

	educationalAttainments = [
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

	monthlyIncomes = [
		'No Income',
		'Under 5,000',
		'5,000-9,999',
		'10,000-14,999',
		'15,000-19,999',
		'20,000-24,999',
		'25,000&over',	
	]

	placeOfOrigins = [
		'Other Barangay, within the municipality',
		'Other Municipality, within the province',
		'Other Province, within the country',
		'Abroad'
	]

	reasonForInMagratings = [
		'Transfer to permanent residence(Lot/house purchase)',
		'Livelihood/Employment',
		'Marriage',
		'Live with Parents/ relatives',
		'Education',
		'Balik bayan/return to own place',
		'Land/boundary dispute',
		'Live in',
	]

	specificReasons = [
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
