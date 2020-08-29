import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-marriage',
  templateUrl: './status-marriage.component.html',
  styleUrls: ['./status-marriage.component.scss']
})
export class StatusMarriageComponent implements OnInit {

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
