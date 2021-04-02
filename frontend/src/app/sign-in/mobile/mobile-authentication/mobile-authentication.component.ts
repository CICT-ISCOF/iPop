import { Component, OnInit } from '@angular/core';
import { SignInService } from '../../sign-in.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { UtilityService } from 'src/app/others/utility.service';



@Component({
  selector: 'app-mobile-authentication',
  templateUrl: './mobile-authentication.component.html',
  styleUrls: ['./mobile-authentication.component.scss']
})
export class MobileAuthenticationComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService,
		private SignInService : SignInService,
		private Router : Router
	) { }

	ngOnInit(): void {

	}

	isLoading = true

	account = {
		username:'',
		password:''
	}
	user

	login(){
		this.isLoading = true
		for(let key in this.account){
			if(this.account[key] == "" || this.account[key] == null ){
				this.UtilityService.setAlert(key + ' is required', 'error')
				this.isLoading = false
				return
			}
		}
		this.SignInService.loginWithPassword(this.account).subscribe(data =>{
			const role = 'admin'
			this.Router.navigate(['home'])
			this.UtilityService.setUserRole(role)
			localStorage.setItem('role',role)
			this.isLoading = false
			localStorage.setItem('user-data',JSON.stringify(data))
			this.user = data		
			this.UtilityService.setAlert('Welcome ' + this.user.user.fullname ,'success')
		},
		error =>{	
			for(let message in error.error.errors){
				this.UtilityService.setAlert(error.error.errors[message],'error')
			}	
			let tries = 5 - error.error.attempts
			this.isLoading = false
			if(tries == 0){
				return
			}
			if(!isNaN(tries)){
				this.UtilityService.setAlert(tries + ' tries left. Careful 5 failed attempts will block your account ','error')
			}	
		})		
	}

}
