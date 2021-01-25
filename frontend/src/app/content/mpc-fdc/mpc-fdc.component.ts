import { LocationService } from './../../location.service';
import { Component, OnInit } from '@angular/core';
import { MpcService } from './mpc.service'
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
@Component({
  selector: 'app-mpc-fdc',
  templateUrl: './mpc-fdc.component.html',
  styleUrls: ['./mpc-fdc.component.scss']
})
export class MPCFDCComponent implements OnInit {

	constructor(
		private MpcService : MpcService,
		private LocationService : LocationService

	) { 
	
	}
	districtS = ['II','II','III','IV']
	municipalities = []
	show = false
	mpc:any  = {}
	mpcs = []

	ngOnInit(): void {
		this.getMuncipalities()
	}



	municipalityIsLoading = false
	getMuncipalities(){
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.municipalityIsLoading = false			
		})		
	}

	showMPC(mpc){
		this.show = false 
		localStorage.setItem('mpc-ref',JSON.stringify(mpc))
		this.show = true 
		this.MpcService.setMPC(mpc)
	}

	
	getMPCFDC(){		
		this.MpcService.retrieveMPC(this.mpc).subscribe(data => {
			this.mpcs = data
		})
	}

	

}
