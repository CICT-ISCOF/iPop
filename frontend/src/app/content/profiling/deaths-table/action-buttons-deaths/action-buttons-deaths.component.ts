import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-deaths',
  templateUrl: './action-buttons-deaths.component.html',
  styleUrls: ['./action-buttons-deaths.component.scss']
})
export class ActionButtonsDeathsComponent implements OnInit {

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
