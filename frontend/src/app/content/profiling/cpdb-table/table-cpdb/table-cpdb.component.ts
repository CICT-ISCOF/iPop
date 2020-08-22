import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CpdbService } from '../../../cpdb/cpdb.service';
import {GridOptions} from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonsCpdbComponent } from '../action-buttons-cpdb/action-buttons-cpdb.component';
import { RecordStatusComponent } from '../record-status/record-status.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../../utility.service'

@Component({
  selector: 'app-table-cpdb',
  templateUrl: './table-cpdb.component.html',
  styleUrls: ['./table-cpdb.component.scss']
})
export class TableCpdbComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	constructor(
		private  CpdbService :CpdbService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {

	}

	columnDefs = [	
		{headerName: 'OPERATIONS', field: '',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:200 },
		{headerName: 'STATUS', field: '', sortable: true, filter: 'agTextColumnFilter',cellRenderer: 'status' },
		{headerName: 'MUNICIPALITY', field: 'municipality', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'BARANGAY', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'PUROK OR ZONE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD NUMBER', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD CHARACTERISITCS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NO. OF PERSONS LIVING IN THE HOUSE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD SIZE BRACKET', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NUMBER OF FAMILIES', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'LINE NUMBER OF HOUSEHOLD MEMBER', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NAME OF HOUSEHOLD MEMBERS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'LINE NUMBER OF HOUSEHOLD MEMBER', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NAME OF HOUSEHOLD MEMBERS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'RELATIONSHIP TO HOUSEHOLD HEAD', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'SEX', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'DATE OF BIRTH', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'AGE AS OF LAST BIRTHDAY', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'AGE BRACKET', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'CIVIL STATUS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HIGHEST EDUCATIONAL ATTAINMENT', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'SCHOOL ATTENDANCE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'GRADE/YEAR LEVEL OF SCHOOL ATTENDANCE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'REASON FOR NOT ATTENDING SCHOOL', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'RELIGIOUS AFFILIATION', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HAVE SPECIAL SKILLS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TYPE OF SPECIAL SKILLS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'PRESENCE OF DISABILITY', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TYPE OF DISABILITY', field: '', sortable: true, filter: 'agTextColumnFilter' },	

		{headerName: 'INDIGENOUS GROUP OR TRIBE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NAME OF INDIGENOUS OR TRIBE', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'ACTIVE PHILHEALTH MEMBER (18 YEARS OLD & ABOVE)', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'PHILHEALTH MEMBERSHIP-SPECIFY', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'USUAL OCCUPATION OF WORKING HH MEMBER', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'GROSS MONTHLY INCOME', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'INCOME BRACKET', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'PLACE OF WORK/EMPLOYMENT OF THE EARNING HOUSEHOLD MEMBER', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NO. OF YEARS STAY (IN CURRENT ADDRESS)', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'NO. OF YEARS STAY BRACKET', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'FP CURRENTLY USED (BY WOMEN 10-50 YRS OLD)', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TOTAL HOUSEHOLD MONTHLY INCOME', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD INCOME BRACKET', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSE OWNERSHIP', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOW MANY STORIES/LEVEL IS THE HOUSE?', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSE CONSTRUCTION MATERIAL', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOMELOT OWNERSHIP/TENURE STATUS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD USUAL SOURCE OF WATER FOR DRINKING', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TYPE OF TOILET THE HOUSEHOLD OWNS', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: "HOUSEHOLD'S GARBAGE DISPOSAL", field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TYPE OF FUEL USE FOR LIGHTING', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'TYPE OF FUEL FOR COOKING', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSE LOCATION GEO-HAZARD AREA', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'HOUSEHOLD LOCATION', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'WATER LEVEL IN FLOOD PRONE AREA', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: 'ACCESS TO INFORMATION TECHNOLOGY', field: '', sortable: true, filter: 'agTextColumnFilter' },	
		{headerName: '4PS BENEFICIARY HOUSEHOLD', field: '', sortable: true, filter: 'agTextColumnFilter' },		
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
		actionButtons: ActionButtonsCpdbComponent,
		status: RecordStatusComponent
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
		this.CpdbService.getCPDBLists().subscribe(data => {
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
		Swal.fire({
			title: 'Are you sure you want to this record?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.CpdbService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}

	

}
