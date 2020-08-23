import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-in-migs',
  templateUrl: './action-buttons-in-migs.component.html',
  styleUrls: ['./action-buttons-in-migs.component.scss']
})
export class ActionButtonsInMigsComponent implements OnInit {

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
