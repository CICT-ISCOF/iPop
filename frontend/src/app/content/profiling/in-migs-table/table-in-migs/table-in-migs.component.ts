import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { InMigService } from '../../../in-mig/in-mig.service';
import { GridOptions } from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsInMigsComponent } from '../action-buttons-in-migs/action-buttons-in-migs.component';
import { StatusInMigsComponent } from '../status-in-migs/status-in-migs.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../utility.service'
 

@Component({
  selector: 'app-table-in-migs',
  templateUrl: './table-in-migs.component.html',
  styleUrls: ['./table-in-migs.component.scss']
})
export class TableInMigsComponent implements OnInit {

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
		{headerName: 'Operations', field: 'id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:350 },
		{headerName: 'Status', field: 'id',cellRenderer: 'status' ,width:250},
		{headerName: 'Sorting Number', field: 'sorting_number', sortable: true, filter: 'agTextColumnFilter' ,width:350 },
		{headerName: 'Name of Household Member', field: 'name', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Municipality', field: 'municipality', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Barangay', field: 'barangay', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Household Number', field: 'household_number', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Total Cases', field: 'total_cases', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Case Number', field: 'case_number', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
	
	
		{headerName: 'Month OF Migration', field: 'month', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
			
		{headerName: 'Sex of Immigrant', field: 'sex', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Date of Birth', field: 'date_of_birth', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Age of HH Member', field: 'age', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'Age in Months', field: 'age_in_months', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Age Bracket', field: 'age_bracket', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Complete Educational Attainment', field: '', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Actual Occupation', field: 'completed_educational_attainment', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Major Occupation of Inmigrant', field: '', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Monthly Income', field: 'actual_occupation', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Skills Acquired', field: 'skills_acquired', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Actual Place of Origin<', field: 'actual_place_of_origin', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Place of Origin', field: 'place_of_origin', sortable: true, filter: 'agTextColumnFilter' ,width:350},
		{headerName: 'Reason for Migrating', field: 'reasons_for_in_migrating', sortable: true, filter: 'agTextColumnFilter',width:350 },		
		{headerName: 'Specific Reason', field: '', sortable: true, filter: 'agTextColumnFilter',width:350 },		
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
		actionButtons: ActionButtonsInMigsComponent,
		status: StatusInMigsComponent
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
				this.InMigService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}


}
