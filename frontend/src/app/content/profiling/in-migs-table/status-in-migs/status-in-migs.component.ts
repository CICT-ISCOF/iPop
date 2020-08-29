import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-in-migs',
  templateUrl: './status-in-migs.component.html',
  styleUrls: ['./status-in-migs.component.scss']
})
export class StatusInMigsComponent implements OnInit {

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
