import { Component, OnInit } from '@angular/core';
import { MpcService } from './mpc.service'

@Component({
  selector: 'app-mpc-fdc',
  templateUrl: './mpc-fdc.component.html',
  styleUrls: ['./mpc-fdc.component.scss']
})
export class MPCFDCComponent implements OnInit {

	constructor(
		private MpcService : MpcService
	) { 
		this.listener = this.MpcService.triggerListener().subscribe(value => {
			this.show = value
		})
	}

	listener

	ngOnInit(): void {
		this.getMPCFDC()
	}
	
	show = false

	showMPC(id){
		this.MpcService.showMPC(id).subscribe(data => {
			console.log(data)
		})
		this.show = true 
	}

	mpcs = []
	getMPCFDC(){		
		this.MpcService.retrieveMPC().subscribe(response => {
			this.mpcs = response.data
		})
	}

	

}
