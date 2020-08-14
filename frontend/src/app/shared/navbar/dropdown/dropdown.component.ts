import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilityService } from '../../../utility.service'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

	constructor(
		private Router : Router,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {

	}

	sidebarMini = {
		name : 'slideToggle',
		id :'sidebarMini',
		checked : false,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	darkMode = {
		name : 'slideToggle',
		id :'darkMode',
		checked :  localStorage.getItem('data-theme') == 'dark' ? true : false,
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	backgroundImage = {
		name : 'slideToggle',
		id :'backgroundImage',
		checked : this.formatStringtoBoolean(localStorage.getItem('sidebar-background')),
		disabled  : false,
		label  : 'On/Off',
		labelledby : 'Some Other Text',
	}

	formatStringtoBoolean(boolean){	
		boolean == 'true' ?  boolean = true : boolean = false 
		return boolean
	}


	changeTheme(e){	
		e == true ? localStorage.setItem('data-theme','dark') : localStorage.setItem('data-theme','light')
		location.reload()
	}

	changeSidebar(e){

	}

	changeBackground(image){
		localStorage.setItem('sidebar-image',image)
		this.UtilityService.setImage(image)
	}

	toggleBackground(e){
		localStorage.setItem('sidebar-background',e+'')
		this.UtilityService.seBackground(e+'')
	}

	logout(){
		let theme =  localStorage.getItem('data-theme')
		localStorage.clear()
			this.Router.navigate(['/'])
		this.UtilityService.logout(true)
		
		setTimeout(() => {
			location.reload()
			localStorage.setItem('data-theme', theme)
		}, 500);
		this.UtilityService.setDropDown(false)		
	}

	hideDropdown(button){
		this.UtilityService.setNavText(button)
		this.UtilityService.setDropDown(false)		
	}

	ChangeFilter(color){	
		localStorage.setItem('color',color)
		this.UtilityService.seColor(color)
	}
}
