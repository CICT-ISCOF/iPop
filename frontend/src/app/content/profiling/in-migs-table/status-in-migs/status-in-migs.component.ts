import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-in-migs',
  templateUrl: './status-in-migs.component.html',
  styleUrls: ['./status-in-migs.component.scss']
})
export class StatusInMigsComponent implements OnInit {

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
