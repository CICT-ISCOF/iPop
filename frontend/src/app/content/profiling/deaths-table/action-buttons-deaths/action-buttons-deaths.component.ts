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

  status = 'Noted and will edit'

	agInit(params:any){
		// this.status = params.value
	}

	refresh(params:any):boolean{
	// this.status = params.value
		return true
	}
}
