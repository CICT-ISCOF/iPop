import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-out-migs',
  templateUrl: './action-buttons-out-migs.component.html',
  styleUrls: ['./action-buttons-out-migs.component.scss']
})
export class ActionButtonsOutMigsComponent implements OnInit {

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
