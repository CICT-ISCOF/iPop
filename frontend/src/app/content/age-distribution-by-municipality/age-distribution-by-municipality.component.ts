import { AgeDistributionServince } from './service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-age-distribution-by-municipality',
  templateUrl: './age-distribution-by-municipality.component.html',
  styleUrls: ['./age-distribution-by-municipality.component.scss']
})
export class AgeDistributionByMunicipalityComponent implements OnInit {

	constructor(
		private AgeDistributionServince : AgeDistributionServince
	) { }

	ngOnInit(): void {
		this.retrieve()
	}


	ageDistribution = {}
	ageDistributions:any = []

	create(){
		this.AgeDistributionServince.create(this.ageDistribution).subscribe(data => { 
			Swal.fire('Data has been added successfully','','success')
			this.ngOnInit()
		})
	}

	retrieve(){
		this.AgeDistributionServince.retrieve().subscribe(data => { 
			this.ageDistributions = data
		})
	}

	update(ageDistribution){
		this.AgeDistributionServince.update(ageDistribution).subscribe(data => { 
			Swal.fire('Data has been updated successfully','','success')
			this.ngOnInit()
		})
	}

	deleteData(ageDistribution){
		Swal.fire({
			title: 'Are you sure you want to delete this data?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.AgeDistributionServince.deleteData(ageDistribution['id']).subscribe(data => { 
					Swal.fire('Data has been removed','','info')
					this.ngOnInit()
				})
			} 
		})	
	}

	editable = {}
	edit(id){
		this.editable[id] == true ?  this.editable[id] = false : this.editable[id] = true	
	}

}
 