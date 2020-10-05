import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-birth',
  templateUrl: './status-birth.component.html',
  styleUrls: ['./status-birth.component.scss']
})
export class StatusBirthComponent implements OnInit {

  constructor() { }

  reload

  ngOnInit(): void {
  }

  theme = localStorage.getItem('data-theme')

  status = ''

	agInit(params:any){
		this.status = params.data.record.status
	}

	refresh(params:any):boolean{
	this.status = params.data.record.status
		return true
	}

}
