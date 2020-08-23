import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-status-out-migs',
  templateUrl: './status-out-migs.component.html',
  styleUrls: ['./status-out-migs.component.scss']
})
export class StatusOutMigsComponent implements OnInit {
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
