import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-cpdb',
  templateUrl: './action-buttons-cpdb.component.html',
  styleUrls: ['./action-buttons-cpdb.component.scss']
})
export class ActionButtonsCpdbComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  theme = localStorage.getItem('data-theme')

  role

	agInit(params:any){
		this.role = params.value
	}

	refresh(params:any):boolean{
	this.role = params.value
		return true
	}


}
