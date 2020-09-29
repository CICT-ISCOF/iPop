import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.scss','../cms/cms.component.responsive.scss']
})
export class ProfilingComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		
		if (!(localStorage.getItem("tab") != null)) {
			
		}else{
			this.maekActive(localStorage.getItem('tab'))
		}
	}

	tabs = {
		Deaths:false,
		Births:false,
		InMigs:false,
		OutmiGS:false,
		Marraige:false,
		CPDB:true,
		fileUpload:true
	}

	tables = {
		Deaths:false,
		Births:false,
		InMigs:false,
		OutmiGS:false,
		Marraige:false,
		CPDB:true,
		fileUpload:false
	}

	maekActive(tab){
		this.removeActive()
		if(tab == "Deaths"){
			this.tabs.Deaths = true
		}
		else if(tab == "Births"){
			this.tabs.Births = true
		}
		else if(tab == "InMigs"){
			this.tabs.InMigs = true
		}
		else if(tab == "OutmiGS"){
			this.tabs.OutmiGS = true
		}
		else if(tab == "Marraige"){
			this.tabs.Marraige = true
		}
		else if(tab == "CPDB"){
			this.tabs.CPDB = true
		}
		else{
			this.tabs.fileUpload = true
		}

		localStorage.setItem('tab',tab)
	}

	removeActive(){
		for(let key in this.tabs){
			this.tabs[key] = false
		}
	}




}
