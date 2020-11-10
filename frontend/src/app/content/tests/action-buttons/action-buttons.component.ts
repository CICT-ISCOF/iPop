import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {

	constructor() { }

	theme = localStorage.getItem('data-theme')

	ngOnInit(): void {

	}

	admin = {
		id:''
	}

	agInit(params:any){
		this.admin.id = params.value
	}

	refresh(params:any):boolean{
		this.admin.id = params.value
		return true
	}

	blockAdmin(id){

	}

	deleteAdmin(id){
		
	}

}
