import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-status-deaths',
  templateUrl: './record-status-deaths.component.html',
  styleUrls: ['./record-status-deaths.component.scss']
})
export class RecordStatusDeathsComponent implements OnInit {

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
