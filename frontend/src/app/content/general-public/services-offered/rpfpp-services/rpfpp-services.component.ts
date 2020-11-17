import Swal from 'sweetalert2'
import { ServicesOfferedService } from './../services-offered.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rpfpp-services',
  templateUrl: './rpfpp-services.component.html',
  styleUrls: ['./rpfpp-services.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class RPFPPServicesComponent implements OnInit {

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
		'Pre-Marriage Orientation and Counseling',
		'Establishment of Multi-Purpose Counselling and Family Development Centers',
		'RP Lectures and Family Development Sessions',
		'Training for Pre-Marriage Counselors',
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
