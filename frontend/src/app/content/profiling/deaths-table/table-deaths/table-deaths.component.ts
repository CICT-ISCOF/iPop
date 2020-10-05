import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { DeathsService } from '../../../deaths/deaths.service';
import { GridOptions } from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsDeathsComponent } from '../action-buttons-deaths/action-buttons-deaths.component';
import { RecordStatusDeathsComponent } from '../record-status-deaths/record-status-deaths.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../utility.service'

@Component({
  selector: 'app-table-deaths',
  templateUrl: './table-deaths.component.html',
  styleUrls: ['./table-deaths.component.scss']
})
export class TableDeathsComponent implements OnInit {

	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private DeathsService : DeathsService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) {

		this.reload = this.DeathsService.getData().subscribe(data => {
			this.rowData = data
		})

		this.reload = this.DeathsService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	 }

	reload

	ngOnInit(): void {
		
	}

  columnDefs = [	
		{headerName: 'Operations', field: 'id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:350 },
		{headerName: 'Status', field: 'id', cellRenderer: 'status',width:200 },
		{headerName: 'Sorting Number', field: 'sorting_number', sortable: true, filter: 'agTextColumnFilter',width:300 },
		{headerName: 'Municipality', field: 'municipality', sortable: true, filter: 'agTextColumnFilter',width:300 },	
		{headerName: 'Barangay', field: 'barangay', sortable: true, filter: 'agTextColumnFilter' ,width:300},	
		{headerName: 'Total Cases', field: 'total_cases', sortable: true, filter: 'agTextColumnFilter',width:300 },			
		{headerName: 'Case Number', field: 'number_of_cases', sortable: true, filter: 'agTextColumnFilter' ,width:300},	
		{headerName: 'Household Number', field: 'household_number', sortable: true, filter: 'agTextColumnFilter' ,width:300},	
		{headerName: 'Month of Deceased', field: 'month', sortable: true, filter: 'agTextColumnFilter' ,width:300},	
		{headerName: 'Name of the Deceased', field: 'name', sortable: true, filter: 'agTextColumnFilter' ,width:300},	
		{headerName: 'Sex of Deacesed', field: 'sex', sortable: true, filter: 'agTextColumnFilter',width:300 },	
		{headerName: 'Age at Death', field: 'age_at_death', sortable: true, filter: 'agTextColumnFilter',width:300 },		
		{headerName: 'Age Bracket', field: 'age_bracket', sortable: true, filter: 'agTextColumnFilter' },		
		{headerName: 'Place of Death', field: 'place_of_death', sortable: true, filter: 'agTextColumnFilter',width:300 },	
		{headerName: 'Registered LCR', field: 'registered_lcr', sortable: true, filter: 'agTextColumnFilter' ,width:300},
		{headerName: 'DATE CREATED', field: 'created_at', sortable: true, filter: 'agTextColumnFilter', cellRenderer: (data) => {
			return formatDate(data.value, 'EEEE,  MMM dd, yyyy - h:mm a', this.locale);
		},width:300},	
	]

	theme = localStorage.getItem('data-theme')

    public renderTheme(){
		if(this.theme == 'dark' ){
			return 'ag-theme-alpine-dark'
		}else{
			return 'ag-theme-material'
		}
	}

	frameworkComponents = {
		actionButtons: ActionButtonsDeathsComponent,
		status: RecordStatusDeathsComponent
	}

    rowData: any;    
    

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
	public onGridReady(event){
		this.gridAPI = event.api
		event.api.closeToolPanel();
		this.columnAPi = event.columnAPi
		this.DeathsService.getDeathLists().subscribe(data => {
			 event.api.setRowData(data.data)
		 })
	}

	
	getSelectedRows() {				
		const selectedNodes:any = this.agGrid.api.getSelectedNodes();	
		let identifiers:any = []
		let fullnames:any = []
		for( let id in selectedNodes ){
			identifiers.push(selectedNodes[id].data.id)
		}
		for( let id in selectedNodes ){
			fullnames.push(selectedNodes[id].data.fullname)
		}		
		let names = fullnames.join(', ')
		if(identifiers.length == 0){
			this.UtilityService.setAlert('Please select data you want to delete','error')
			return
		}
		Swal.fire({
			title: 'Are you sure you want to delete this record?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.DeathsService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}

	
}
