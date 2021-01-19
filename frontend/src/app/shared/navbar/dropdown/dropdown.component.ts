import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilityService } from '../../../utility.service'
import Swal from 'sweetalert2'

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

	theme = localStorage.getItem('data-theme')

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
		Swal.fire({
			title: 'You sure you want to Log-Out?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Log out',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {
				localStorage.clear()
				this.Router.navigate(['/'])
				this.UtilityService.logout(true)
				this.UtilityService.setDropDown(false)	
				Swal.fire(
					'Thank you',
					"for using Iloilo Population Office's system",
					'success'
				)
			} 
		})	
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
