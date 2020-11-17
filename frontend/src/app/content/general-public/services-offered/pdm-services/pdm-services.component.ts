import Swal from 'sweetalert2'
import { ServicesOfferedService } from './../services-offered.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdm-services',
  templateUrl: './pdm-services.component.html',
  styleUrls: ['./pdm-services.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class PDMServicesComponent implements OnInit {

	constructor(
		private ServicesOfferedService : ServicesOfferedService
	) { }

	ngOnInit(): void {

	}

	type = 'rpfp'

	data = {
		service:'',
		type:'rpfp'
	}

	services = [
		'Provision of Population and Population-related Data',
	]

	create(){
		this.ServicesOfferedService.create(this.data).subscribe(data => {

		})
	}

	retrieve(){
		this.ServicesOfferedService.retrieve(this.data.type).subscribe(data => {

		})
	}

	update(id){
		this.ServicesOfferedService.update(this.data.type, id).subscribe(data => {

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
				this.ServicesOfferedService.delete(this.data.type, id).subscribe(data => {

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
