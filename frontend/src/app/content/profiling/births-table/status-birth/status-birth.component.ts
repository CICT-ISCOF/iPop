import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-birth',
  templateUrl: './status-birth.component.html',
  styleUrls: ['./status-birth.component.scss']
})
export class StatusBirthComponent implements OnInit {

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
