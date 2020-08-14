import { Component, OnInit } from '@angular/core';
import { UtilityService }  from '../../utility.service'
import {  Subscription } from 'rxjs'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService
	) { 
		this.subscription = this.UtilityService.getDropDown().subscribe(value => {
			this.dropdown = value
		})
	}

	subscription : Subscription

	dropdown = false

	navText = this.UtilityService.getNavText()

	ngOnInit(): void {
	}


	conversations(){
		this.UtilityService.setSidebarItemasActive('Conversations')
	}
}
