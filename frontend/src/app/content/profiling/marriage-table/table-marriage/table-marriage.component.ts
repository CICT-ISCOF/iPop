import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { InMigService } from '../../../in-mig/in-mig.service';
import { GridOptions } from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsMarriageComponent } from '../action-buttons-marriage/action-buttons-marriage.component';
import { StatusMarriageComponent } from '../status-marriage/status-marriage.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../utility.service'


@Component({
  selector: 'app-table-marriage',
  templateUrl: './table-marriage.component.html',
  styleUrls: ['./table-marriage.component.scss']
})
export class TableMarriageComponent implements OnInit {
	
	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private  InMigService :InMigService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) { 
		this.reload = this.InMigService.getData().subscribe(data => {
			this.rowData = data
		})

		this.reload = this.InMigService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload

	ngOnInit(): void {

	}

	columnDefs = [	
		{headerName: 'Operations', field: '',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:200 },
		{headerName: 'Status', field: '', sortable: true, filter: 'agTextColumnFilter',cellRenderer: 'status' },
		{headerName: 'Sorting Number', field: '', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Municipality', field: 'municipality', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Barangay', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Household Number', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Case Number', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Month of Marriage', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Name of Couple', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Sex', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Date of Birth', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Age', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'Bracket Distribution', field: '', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Address', field: '', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Type of Wedding Ceremony', field: '', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Residence Address', field: '', sortable: true, filter: 'agTextColumnFilter' },
		{headerName: 'Soleminizing Officer', field: '', sortable: true, filter: 'agTextColumnFilter' },		
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
		this.columnAPi = event.columnAPi
		this.InMigService.getInMigrationLists().subscribe(data => {
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
				this.InMigService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}
}
