import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-status-deaths',
  templateUrl: './record-status-deaths.component.html',
  styleUrls: ['./record-status-deaths.component.scss']
})
export class RecordStatusDeathsComponent implements OnInit {
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
