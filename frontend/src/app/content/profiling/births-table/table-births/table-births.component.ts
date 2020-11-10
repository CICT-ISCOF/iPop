import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { BirthsService } from '../../../births/births.service';
import { GridOptions } from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsBirthComponent } from '../action-buttons-birth/action-buttons-birth.component';
import { StatusBirthComponent } from '../status-birth/status-birth.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../utility.service'

@Component({
  selector: 'app-table-births',
  templateUrl: './table-births.component.html',
  styleUrls: ['./table-births.component.scss']
})
export class TableBirthsComponent implements OnInit {

	
	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private BirthsService : BirthsService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) { 

		this.reload = this.BirthsService.getData().subscribe(data => {
			this.rowData = data
		})

		this.reload = this.BirthsService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload

	ngOnInit(): void {
		 
	}

	columnDefs = [	
		{headerName: 'Operations', field: 'id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:350 },
		{headerName: 'Status', field: 'record.status', cellRenderer: 'status',width:250 },
		{headerName: 'Sorting Number', field: 'sorting_number', sortable: true, filter: 'agTextColumnFilter',width:350 },
		{headerName: "Baby's Name", field: 'name', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: 'Municipality', field: 'municipality', sortable: true, filter: 'agTextColumnFilter',width:350  },	
		{headerName: 'Barangay', field: 'barangay', sortable: true, filter: 'agTextColumnFilter' ,width:350 },		
		{headerName: 'Household Number', field: 'household_number', sortable: true, filter: 'agTextColumnFilter',width:350  },	
		{headerName: 'Total Cases', field: 'total_cases', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: 'Case Number', field: 'number_of_cases', sortable: true, filter: 'agTextColumnFilter' ,width:350 },
		
		{headerName: 'Birth Month', field: 'month', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
	
		{headerName: 'Sex of Child', field: 'sex', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: 'Birth Order', field: 'birth_order', sortable: true, filter: 'agTextColumnFilter',width:350  },			
		{headerName: 'Place of Birth', field: 'place_of_birth', sortable: true, filter: 'agTextColumnFilter',width:350  },	
		{headerName: 'Name of Mother', field: 'name_of_mother', sortable: true, filter: 'agTextColumnFilter' ,width:350 },			
		{headerName: 'Age of Mother', field: 'age_of_mother', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: 'Age Bracket', field: 'age_bracket_of_mother', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: "Mother's Actual Work", field: '', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: "Mother's Occupation", field: 'occupation_of_mother', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: "Mother's Religion", field: 'mothers_actual_work', sortable: true, filter: 'agTextColumnFilter',width:350  },	
		{headerName: "Mother's Marital Status", field: 'mother_marital_status', sortable: true, filter: 'agTextColumnFilter' ,width:350 },	
		{headerName: 'Registered LCR', field: 'registered_lcr', sortable: true, filter: 'agTextColumnFilter',width:350  },
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
		actionButtons: ActionButtonsBirthComponent,
		status: StatusBirthComponent
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
		event.api.closeToolPanel();
		this.BirthsService.getBirthLists().subscribe(data => {
			 event.api.setRowData(data)		
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
			title: 'Are you sure you want delete to this record?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.BirthsService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}


}
