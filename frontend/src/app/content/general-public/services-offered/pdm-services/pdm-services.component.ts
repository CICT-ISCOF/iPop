import { UserService } from '../../../../others/user.service';
import { UtilityService } from '../../../../others/utility.service';
import Swal from 'sweetalert2'
import { ServicesOfferedService } from './../services-offered.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdm-services',
  templateUrl: './pdm-services.component.html',
  styleUrls: ['./pdm-services.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class PDMServicesComponent implements OnInit {

	isUser = !this.UserService.isUser()
	constructor(
		private ServicesOfferedService : ServicesOfferedService,
		private UtilityService : UtilityService,
		private UserService : UserService

	) { }


	ngOnInit(): void {
		this.retrieve()
	}

	data = {
		service_id:4,
		title:''
	}

	services = {}

	create(){
		this.ServicesOfferedService.create(this.data).subscribe(data => {			
			this.wantsToAdd = false
			this.ngOnInit()
		})
	}

	retrieve(){
		this.ServicesOfferedService.retrieve(4).subscribe(data => {			
			this.services = data
		})
	}

	
	update(id, service, index){
		
		Swal.fire({
			title: 'Are you sure you want to update this Service?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update Service',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.ServicesOfferedService.update(service, id).subscribe(data => {
					this.UtilityService.setAlert('Changes has been saved', 'info')
					this.ngOnInit()
					this.toggleServices(index)
				})
			} 
		})
	}

	deleteService(id){	
		Swal.fire({
			title: 'Are you sure you want to remove this Service?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Service',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.ServicesOfferedService.delete(id).subscribe(data => {
					this.UtilityService.setAlert('Service has been deleted', 'info')
					this.ngOnInit()
				})		
			} 
		})
	}



	acitveServices = {}

	wantsToAdd = false

	toggleServices(service_id){		
		this.acitveServices[service_id] == true ?  this.acitveServices[service_id] = false : this.acitveServices[service_id] = true	
		console.log(this.acitveServices[service_id])		
	}

}
