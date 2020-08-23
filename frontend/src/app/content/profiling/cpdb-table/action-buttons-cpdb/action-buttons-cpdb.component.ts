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

  params

	agInit(params:any){
		this.params = params.data
	}

	refresh(params:any):boolean{
	this.params = params.data
		return true
	}


}
