import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-status-out-migs',
  templateUrl: './status-out-migs.component.html',
  styleUrls: ['./status-out-migs.component.scss']
})
export class StatusOutMigsComponent implements OnInit {
  
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
