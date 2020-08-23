import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-buttons-birth',
  templateUrl: './action-buttons-birth.component.html',
  styleUrls: ['./action-buttons-birth.component.scss']
})
export class ActionButtonsBirthComponent implements OnInit {
  
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
