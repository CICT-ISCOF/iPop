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

	role

	agInit(params:any){
		this.role = params.value
	}

	refresh(params:any):boolean{
	this.role = params.value
		return true
	}


}
