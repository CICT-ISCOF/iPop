import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../others/utility.service'
import { SignInService } from '../sign-in.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService,
		private SignInService : SignInService,
		private  Router : Router
	) { }
	
	isValid = true

	account ={
		pin:'',
		question:'',
		answer:'',
	}

	tries = 5

	isLoading

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

	}

	user:any
	
	pinHandler(){		
		if(this.account.pin.length == 6) {
			this.isLoading = true
			this.SignInService.loginWithPin(this.account).subscribe(data=>{const role = 'admin'
				this.Router.navigate(['home'])
				this.UtilityService.setUserRole(role)
				localStorage.setItem('role',role)
				this.isLoading = false
				localStorage.setItem('user-data',JSON.stringify(data))
				this.user = data
				this.UtilityService.setAlert('Welcome ' + this.user.user.fullname ,'success')
			},
			error=>{
				this.isValid = true
				this.isValid = false
				this.account.pin = ''
				// this.tries -= 1		
				this.isLoading = false	
				
			})
		}	
	}

	closeModal(){
		this.UtilityService.setLoginWithPin(false)
	}

}
