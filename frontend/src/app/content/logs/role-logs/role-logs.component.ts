import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role-logs',
  templateUrl: './role-logs.component.html',
  styleUrls: ['./role-logs.component.scss']
})
export class RoleLogsComponent implements OnInit {

	constructor() { }

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
