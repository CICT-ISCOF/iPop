import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilityService } from '../../utility.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

	constructor(
		private Router : Router,
		private UtilityService : UtilityService
	) { 
		this.pin = this.UtilityService.getLoginWithPin().subscribe(value=>{
			this.pinLogin = value
		})
	}

	pinLogin = false
	pin :Subscription

	ngOnInit(): void {
		localStorage.clear()
		
	}

	login(){
		const role = 'admin'
		this.Router.navigate(['home'])
		this.UtilityService.setUserRole(role)
		localStorage.setItem('role',role)
	}

	loginWithPin(){
		this.pinLogin   = true		
	}


}
