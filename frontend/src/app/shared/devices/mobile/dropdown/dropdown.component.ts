import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { UtilityService } from '../../../../utility.service'
import Swal from 'sweetalert2'
import { DeviceService } from '../.././../../device.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-dropdown-mobile',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponentMobile implements OnInit {
	constructor(
		private Router : Router,
		private UtilityService : UtilityService,
		private DeviceService : DeviceService
	) { 
		this.subscription = this.DeviceService.dropdownState().subscribe(value => {		
			this.hide = value
		})

	}

	subscription : Subscription

	ngOnInit(): void {

	}

	hide = true

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
		e == true ? this.darkMode.checked = true : this.darkMode.checked = false
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
		Swal.fire({
			title: 'You sure you want to Log-Out?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Log out',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {
				let theme =  localStorage.getItem('data-theme')
				// localStorage.clear()
					this.Router.navigate(['/'])
				this.UtilityService.logout(true)				
				// setTimeout(() => {
				// 	location.reload()
				// 	localStorage.setItem('data-theme', theme)
				// }, 500);
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
		const value = this.hide == true ? false :true
		this.DeviceService.showDropdown(value)
	}

	ChangeFilter(color){	
		localStorage.setItem('color',color)
		this.UtilityService.seColor(color)
	}
	

}
