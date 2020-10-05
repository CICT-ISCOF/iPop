import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../../utility.service'
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
		question:'What is your favorite movie',
		answer:'',
	}

	tries = 5

	isLoading

    ngOnInit(): void {

	}

	user:any
	
	pinHandler(){
		this.isValid = true
		if(this.account.pin.length > 5) {
			this.isLoading = true
			this.SignInService.loginWithPin(this.account).subscribe(data=>{
				const role = 'admin'			
				this.UtilityService.setUserRole(role)
				localStorage.setItem('role',role)
				this.isLoading = false
				localStorage.setItem('user-data',JSON.stringify(data))
				this.user = data
				this.UtilityService.setAlert('Welcome ' + this.user.fullname ,'success')			
				this.Router.navigate(['home'])
			},
			error=>{
				this.isValid = false
				this.account.pin = ''
				this.tries -= 1		
				this.isLoading = false	
				
			})
		}	
	}

	closeModal(){
		this.UtilityService.setLoginWithPin(false)
	}

}
