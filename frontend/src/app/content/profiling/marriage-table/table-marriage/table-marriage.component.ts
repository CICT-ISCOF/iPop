import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';

import { GridOptions } from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsMarriageComponent } from '../action-buttons-marriage/action-buttons-marriage.component';
import { StatusMarriageComponent } from '../status-marriage/status-marriage.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../others/utility.service'
import { MarriagesService } from '../../../marriages/marriages.service'

@Component({
  selector: 'app-table-marriage',
  templateUrl: './table-marriage.component.html',
  styleUrls: ['./table-marriage.component.scss']
})
export class TableMarriageComponent implements OnInit {
	
	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private  MarriagesService :MarriagesService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) { 
		this.reload = this.MarriagesService.getData().subscribe(data => {
			this.rowData = data
		})

		this.reload = this.MarriagesService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload

	ngOnInit(): void {

	}
 
	columnDefs = [	
		{headerName: 'Operations', field: '',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:350 },
		{headerName: 'Status', field: '',cellRenderer: 'status' },
		{headerName: 'Sorting Number', field: 'sorting_number', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Name of Couple', field: 'couple_name', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Municipality', field: 'municipality', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Barangay', field: 'barangay', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Total Cases', field: 'total_cases', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Household Number', field: 'household_number', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Case Number', field: 'case_number', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Month of Marriage', field: 'month', sortable: true, filter: 'agTextColumnFilter' },
		
		{headerName: 'Sex', field: 'sex', sortable: true, filter: 'agTextColumnFilter' },		
		{headerName: 'Age', field: 'age', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Bracket Distribution', field: 'age_bracket', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Address', field: 'address', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Type of Wedding Ceremony', field: 'wedding_ceremony_type', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Residence Address', field: 'residence_address', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Soleminizing Officer', field: 'solemnizing_officer', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Registered LCR', field: 'registered_lcr', sortable: true, filter: 'agTextColumnFilter' },		
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
		actionButtons: ActionButtonsMarriageComponent,
		status: StatusMarriageComponent
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
		rowGroupPanelShow: true,
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
		this.columnAPi = event.columnAPi
		event.api.closeToolPanel();
		this.MarriagesService.getMarriageRecords().subscribe(data => {
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
			// this.UtilityService.setAlert('Please select data you want to delete','error')
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
				this.MarriagesService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}
}
