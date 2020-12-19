import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

 	 constructor() { }

	theme = localStorage.getItem('data-theme')

	ngOnInit(): void {

	}

	data:any

	agInit(params:any){
		this.data = params.data
		
	}

	refresh(params:any):boolean{
		this.data = params.data
		
		return true
	}


}
