import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../.././../../device.service'
import { Subscription } from 'rxjs';
import { CmsService } from '../../../../content/cms/cms.service'
@Component({
	selector: 'app-navbar-mobile',
	templateUrl: './navbar-mobile.component.html',
	styleUrls: ['./navbar-mobile.component.scss']
})
export class NavbarMobileComponent implements OnInit {

	constructor(
		private DeviceService : DeviceService,
		private CmsService : CmsService
	) { 
		this.subscription = this.DeviceService.sidebarState().subscribe(value => {
			this.sidebar = value
		})

		this.subscription = this.CmsService.getPreview().subscribe(value => {
			this.hide = value
		
		})

		this.subscription = this.DeviceService.dropdownState().subscribe(state => {
			this.dropdownState = state
		})
	}

	dropdownState = true

	hide = false

	sidebar:boolean
	subscription : Subscription

	ngOnInit(): void {

	}

	showSidebar(){
		this.DeviceService.showSidebar(this.sidebar == true ? false : true)
	}

	showOptions(){
		const value = this.dropdownState == true ? false :true
		this.DeviceService.showDropdown(value)
	}
	

}
