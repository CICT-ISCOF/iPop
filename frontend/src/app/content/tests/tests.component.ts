import { Component, OnInit, ViewChild, LOCALE_ID, Inject } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AdminService } from '../../admin.service';
import {GridOptions} from "ag-grid-community"
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;

	theme = localStorage.getItem('data-theme')

	columnDefs = [	
		{headerName: 'Actions', field: 'id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:150 },
		{headerName: 'Fullname', field: 'fullname', sortable: true, filter: 'agTextColumnFilter',width:200 },
		{headerName: 'Role', field: 'role', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'District', field: 'district', sortable: 'district', filter: 'agTextColumnFilter',width:130},
		{headerName: 'Muncipality', field: 'municipality', sortable: 'municipality', filter: 'agTextColumnFilter'},
		{headerName: 'Barangay', field: 'barangay', sortable: 'barangay', filter: 'agTextColumnFilter'},
		{headerName: ' Date Created', field: 'created_at', sortable: true, filter: 'agTextColumnFilter', cellRenderer: (data) => {
			return formatDate(data.value, 'EEEE,  MMM dd, yyyy', this.locale);
		},width:300},
	
	]

	frameworkComponents = {
		actionButtons: ActionButtonsComponent
	}

	rowData: any;

	constructor(
		private AdminService: AdminService,
		@Inject(LOCALE_ID) private locale: string 
		) {

	}

	ngOnInit() {		
	}

	renderTheme(){
		if(this.theme == 'dark' ){
			return 'ag-theme-alpine-dark'
		}else{
			return 'ag-theme-material'
		}
	}

	gridOptions = {
		defaultColDef: {
			width: 150,
			sortable: true,
			resizable: true,
			filter: true,
			floatingFilter: true,
		},
		columnDefs: this.columnDefs,
		rowData: null,
		showToolPanel: true,
		autoGroupColumnDef: {
		  headerName: 'Fullname',
		  field: 'fullname',
		  rowDrag: true,	
		  icons: {
			menu: '<i class="fas fa-bars"></i>',
			filter: '<i class="fa fa-long-arrow-alt-up"/>',
			columns: '<i class="fa fa-snowflake"/>',
			sortAscending: '<i class="fa fa-sort-alpha-up"/>',
			sortDescending: '<i class="fa fa-sort-alpha-down"/>',
		  },
		  headerCheckboxSelection: true,
		  width: 300,
		},					
		rowSelection: 'multiple',
	}


	gridAPI
	columnAPi
	onGridReady(event){
		this.gridAPI = event.api
		this.columnAPi = event.columnAPi
		this.AdminService.getAdminLists().subscribe(data => {
			 event.api.setRowData(data.data)
		 })
	}
	
	
	
	getSelectedRows() {		
		const selectedNodes:any = this.agGrid.api.getSelectedNodes();	
		let identifiers:any = []
		for( let id in selectedNodes ){
			identifiers.push(selectedNodes[id].data.id)
		}			
	}

}
