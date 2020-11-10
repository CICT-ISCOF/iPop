import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilityService } from '../../utility.service'
import { Subscription } from 'rxjs'
import { SignInService } from '../sign-in.service'



@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

	constructor(
		private Router : Router,
		private UtilityService : UtilityService,
		private SignInService : SignInService
	) { 
		this.pin = this.UtilityService.getLoginWithPin().subscribe(value=>{
			this.pinLogin = value
		})
	}

	isLoading = false

	pinLogin = false
	pin :Subscription


	account = {
		username:'',
		password:''
	}

	ngOnInit(): void {
		// localStorage.clear()
		this.SignInService.visit()
		let user :any = localStorage.getItem('user-data')
		if(user != null){
			const role = 'admin'
			this.Router.navigate(['home'])
			this.UtilityService.setUserRole(role)
			localStorage.setItem('role',role)
			this.isLoading = false			
			this.UtilityService.setAlert('Welcome ' + this.user.fullname ,'success')		
			return		
		}
		if(localStorage.getItem('role')== 'admin'){
			localStorage.clear()
			location.reload()
		}
	}

	user:any
	
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
			console.log(data)
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


	loginWithPin(){
		this.pinLogin   = true		
	}


}
