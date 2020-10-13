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

		this.subscription =this.UtilityService.getNavText().subscribe(value => {
			this.navText = value
		})
	}

	

	theme = localStorage.getItem('data-theme')

	subscription : Subscription

	dropdown = false

	navText = ''

	ngOnInit(): void {		
		this.syncPathAndNavText()
	}


	syncPathAndNavText(){
		let url = document.createElement('a');
		url.href = window.location.href;
		const path = url.pathname	

		if(path == '/search'){
			this.UtilityService.setSidebarItemasActive('Universal Search')
			this.navText = 'Universal Search'
		}
		
	}

	account = JSON.parse(localStorage.getItem('user-data'))

	name = this.formatName(this.account.user.fullname)

	formatName(fullname){
		let name = fullname.split(" ")
		return name[0]
	}

	conversations(){
		this.UtilityService.setSidebarItemasActive('Conversations')
	}

	handleClick(item){
		this.UtilityService.setNavText(item)

	}
}
