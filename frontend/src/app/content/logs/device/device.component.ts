import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
      
	}




	log
	params

	agInit(params:any){
		this.log = params.value
		this.params  = params.data;console.log(params.data)
	}

	refresh(params:any):boolean{
		this.log = params.value
		this.params = params.data
		
		return true
	}
	
	
	formatUserAgent(agent){
		let array = agent.split('/')
		// return  array[array.length - 2].replace(/[0-9,.]/g, '')		
		return agent
	}

	checkifMobile(params){
		if(params.includes('Mobile')){
			return false
		}
		return true
		// return params
	}

}
