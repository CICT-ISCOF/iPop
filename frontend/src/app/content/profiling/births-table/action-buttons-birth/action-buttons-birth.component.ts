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

  params

	agInit(params:any){
		this.params = params.data
	}

	refresh(params:any):boolean{
	this.params = params.data
		return true
	}

}
