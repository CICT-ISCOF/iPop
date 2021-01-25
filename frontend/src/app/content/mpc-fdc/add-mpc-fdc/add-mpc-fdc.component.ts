import { MPCFDCComponent } from './../mpc-fdc.component';
import { MpcService } from './../mpc.service';
import { UtilityService } from './../../../utility.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-mpc-fdc',
  templateUrl: './add-mpc-fdc.component.html',
  styleUrls: ['./add-mpc-fdc.component.scss']
})
export class AddMpcFdcComponent implements OnInit {

  
	constructor(
		private MpcService : MpcService,
		private LocationService : LocationService,
		private UtilityService : UtilityService,
		private MPCFDCComponent : MPCFDCComponent
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
		this.MpcService.createMPC(this.teenCenter).subscribe(data => {
			this.UtilityService.setAlert('New MPC-FDC Added','success')
		})
	}



}
