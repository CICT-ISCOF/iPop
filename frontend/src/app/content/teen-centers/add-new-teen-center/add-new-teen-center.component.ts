import { UtilityService } from './../../../utility.service';
import { LocationService } from './../../../location.service';
import { TeenCentersService } from './../teen-centers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-teen-center',
  templateUrl: './add-new-teen-center.component.html',
  styleUrls: ['./add-new-teen-center.component.scss']
})
export class AddNewTeenCenterComponent implements OnInit {

	constructor(
		private TeenCentersService : TeenCentersService,
		private LocationService : LocationService,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {
		this.getMuncipalities()
	}

	teenCenter = {
		location:'',
		tc_coordinator_count:'0',
		population:'0',
		services:'',
		municipality:'',
		district:'',
		name:''
	}

	districtS = ['II','II','III','IV']

	municipalities = []
	getMuncipalities(){			
		this.LocationService.getMunicipalities().subscribe(data => {
		   this.municipalities = data			
	   })
   }

	create(){	
		this.teenCenter.location = this.teenCenter.municipality
		this.TeenCentersService.addTeencenter(this.teenCenter).subscribe(data => {
			this.UtilityService.setAlert('New Teen Center Added','success')
		})
	}

	back(){
		this.TeenCentersService.addNewTeenCenter(false)
	}

	

}
