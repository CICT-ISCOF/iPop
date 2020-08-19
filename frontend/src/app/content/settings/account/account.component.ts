import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../../utility.service'
import { AccountService } from '../../../settings/account/account.service'
import { AdminService } from '../../../admin.service'
import { AlertsComponent } from 'src/app/shared/alerts/alerts.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService,
		private AccountService : AccountService,
		private AdminService : AdminService,
	) { }




	
	isLoading  = false

	myInformation = JSON.parse(localStorage.getItem('user-data'))

	myAccountFromDB:any

	securityQuestions = [
		"What is your favorite movie?",
		'What is your favorite animal?',
		'What was the house number and street name you lived in as a child?',
		'What were the last four digits of your childhood telephone number?',
		'What primary school did you attend?',
		'In what town or city was your first full time job?',
		'In what town or city did you meet your spouse or partner?',
		'What is the middle name of your oldest child?',
		"What are the last five digits of your driver's license number?",
		"What is your grandmother's (on your mother's side) maiden name?",
		"What is your spouse or partner's mother's maiden name?",
		'In what town or city did your parents meet?',
		'What time of the day were you born? (hh:mm)',
		'What time of the day was your first child born? (hh:mm)',
	]

	ngOnInit(): void {
		this.getMyInfo()
	}

	mySecurityQuestion = null
	getMyInfo(){		
		this.isLoading = true 
		this.AdminService.showAdmin(this.myInformation.user.id).subscribe(data => {			
			this.myAccountFromDB = data
			this.mySecurityQuestion = data.question
			// this.mySecurityQuestion = 'null'
			this.isLoading = false
		})
	}

	// -------------- set up -----------------

	setUpSeucrityQuestion = {
		new_answer:'',
		new_question:'',
		old_question:'null',
		old_answer:'null'
	}

	setUpPin = {
		new_pin:'',
		confirmPin:'',
		old_pin:'null'
	}

	invalidsetUpSeucrityQuestion ={
		new_answer:false,
		new_question:false
	}

	invalidsetUpPin = {
		new_pin:false,
		confirmPin:false
	}

	save(){
		this.isLoading = true
		let hasError = false
		for(let key in this.setUpSeucrityQuestion){
			if(this.setUpSeucrityQuestion[key] == '' || this.setUpSeucrityQuestion[key] == null){
				this.invalidsetUpSeucrityQuestion[key] = true
				hasError = true
			}else{
				this.invalidsetUpSeucrityQuestion[key] = false
			}
		}
		for(let key in this.setUpPin){
			if(this.setUpPin[key] == '' || this.setUpPin[key] == null){
				this.invalidsetUpPin[key] = true
			}else{
				this.invalidsetUpPin[key] = false
			}			
		}
		let credentials = this.setUpSeucrityQuestion
		if(!hasError){		

			this.setUpPin.old_pin = null
			this.setUpSeucrityQuestion.old_answer = null
			this.setUpSeucrityQuestion.old_question = null
			
			this.AccountService.setUpSecurityQuestionAndPin(credentials,this.myInformation.user.id).subscribe(data => {						
				console.log(data)

				this.UtilityService.setAlert( 'Your security question and answer has been set up', 'success')		
				this.UtilityService.setAlert( 'Setting up pin', 'info')	

				let credentials = this.setUpPin

				this.AccountService.setUpSecurityQuestionAndPin(credentials,this.myInformation.user.id).subscribe(data => {	
					console.log(data)
					this.UtilityService.setAlert( 'Pin successfully set up', 'success')		
					this.ngOnInit()
				})		
			},
			error =>{				
				this.UtilityService.setAlert(error.message,'error')								
			
			})		
		}
		this.isLoading = false
	}


	// ----------- change security question ----------------------

	changeSecurityQuestion = {
		new_answer:'',
		new_question:'',
		old_question:'null',
		old_answer:'',
		confirmAnswer:'',
	}

	invalidchangeSecurityQuestion = {
		new_answer:false,
		new_question:false,
		old_question:false,
		old_answer:false,
		confirmAnswer:false,
	}

	changeMySecurityQuestion(){		
		Swal.fire({
			title: 'This will change your Security Question?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Change',
			cancelButtonText: "I'll think about it"
		  }).then((result) => {
			if (result.value) {
				this.changeSecurity()
			} 
		})			
	}

	changeSecurity(){
		this.isLoading = true
		let hasError = false
		for(let key in this.changeSecurityQuestion){
			if(this.changeSecurityQuestion[key] == '' || this.changeSecurityQuestion[key] == null){
				this.invalidchangeSecurityQuestion[key] = true
				hasError = true
			}else{
				this.invalidchangeSecurityQuestion[key] = false
			}
		}
		if(!hasError){			
			this.changeSecurityQuestion.old_question = null
			this.AccountService.changeSecurityQuestion(this.changeMySecurityQuestion, this.myInformation.user.id).subscribe(data => {
				console.log(data)
				this.isLoading = false
			})
		}else{
			this.isLoading = false
		}
		this.isLoading = true	
	}




	// ------------ change pin ------------

	isValid = true

	changePin = {
		old_pin:'',
		new_pin:'',
		confirmnewpin:'',
	}
	

	changeMyPin(){	
		Swal.fire({
			title: 'Are you sure you want to change your pin',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Change',
			cancelButtonText: "I'll think about it"
		  }).then((result) => {
			if (result.value) {
				this.changePinNow()
			} 
		})	
	}

	changePinNow(){
		let hasError = false
		for(let key in this.changePin){
			if(this.changePin[key].length != 6){
				hasError = true
			}
		}
		if(!hasError){
			this.AccountService.changePin(this.changePin, this.myInformation.user.id).subscribe(data => {
				console.log(data)
				this.isLoading = false
			})
		}else{
			this.isLoading = false
		}
	}


	// ------------ change password ------------

	changePassword = {
		old_password:'',
		new_password:'',
		confirmPassword:''
	}

	invalidchangePassword = {
		old_password:false,
		new_password:false,
		confirmPassword:false
	}

	changePasswordResponse:any

	changeMyPassword(){
		Swal.fire({
			title: 'This will change your password',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Change',
			cancelButtonText: "I'll think about it"
		  }).then((result) => {
			if (result.value) {
				this.changeThePassword()
			} 
		})	
	}


	changeThePassword(){
		this.isLoading = true
		let hasError = false
		for(let key in this.changePassword){
			if(this.changePassword[key] == '' || this.changePassword[key] == null ){
				this.invalidchangePassword[key] = true
				hasError = true
			}
			else{
				this.invalidchangePassword[key] = false
			}
		}
		if(!hasError){
			this.AccountService.changePassword(this.changePassword, this.myInformation.user.id).subscribe(data => {
				this.changePasswordResponse = data
				if(this.changePasswordResponse.errors){
					this.UtilityService.setAlert('Your password is incorrect','error')
				}else{
					this.UtilityService.setAlert('Your password has been changed','success')
				}
				this.isLoading = false
			})
		}else{
			this.isLoading = false
		}
	}



}
