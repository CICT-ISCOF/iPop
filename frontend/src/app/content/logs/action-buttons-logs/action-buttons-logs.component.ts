import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-logs',
  templateUrl: './action-buttons-logs.component.html',
  styleUrls: ['./action-buttons-logs.component.scss']
})
export class ActionButtonsLogsComponent implements OnInit {


	constructor() { }

		theme = localStorage.getItem('data-theme')

		ngOnInit(): void {

		}

	log
	params

	agInit(params:any){ 		
		this.log = params.value
		this.params  = params.data    
	}

	refresh(params:any):boolean{
		this.log = params.value
		this.params = params.data
		return true
	}

}
