import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-record-status',
  templateUrl: './record-status.component.html',
  styleUrls: ['./record-status.component.scss']
})
export class RecordStatusComponent implements OnInit {

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
