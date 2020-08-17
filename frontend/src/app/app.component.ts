import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from './utility.service'
import { Subscription } from 'rxjs'
import { NetworkStatusAngularService } from 'network-status-angular';
import Swal from 'sweetalert2'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ipo-web';

	constructor(			
		private UtilityService : UtilityService,
		private	 NetworkStatusAngularService : NetworkStatusAngularService
		
	){
		this.userRole = this.UtilityService.getUserROle().subscribe(role=>{
			this.role = role
		
		})
		this.userRole = this.UtilityService.getLogoutValue().subscribe(role=>{
			this.role = role
		})

		this.userRole =  this.NetworkStatusAngularService.status.subscribe(isConnected => {
				if(isConnected){
					this.UtilityService.setAlert('Your back online!','success')
				}else{
					this.UtilityService.setAlert('You are not connected to the internet','error')
				}
		});
		
	} 

	userRole:Subscription

	role:string = ''	

	ngOnInit(): void {
	
		this.validateRole(function(){
			let url = document.createElement('a');
			url.href = window.location.href;
			const path = url.pathname
			return path
		})
		this.checkLocalStorage()
		
	}

	checkLocalStorage(){
		this.role = localStorage.getItem('role')	
	}
	
	validateRole(path){		
		if(path != '/home' && this.role == 'user'){
			// alert('access denied')
		}
	}

	hideDropdown(){
		this.UtilityService.setDropDown(false)		
	}

	

	


}
