import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { LogsService } from '../logs.service';
import { formatDate } from '@angular/common';
import { ActionButtonsLogsComponent } from '../action-buttons-logs/action-buttons-logs.component';
import { RoleLogsComponent } from '../role-logs/role-logs.component';
import { DeviceComponent } from '../device/device.component';
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../utility.service'


@Component({
  selector: 'app-table-logse',
  templateUrl: './table-logse.component.html',
  styleUrls: ['./table-logse.component.scss']
})
export class TableLogseComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;

	constructor(
		private LogsService: LogsService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) {
		this.data = this.LogsService.getPage().subscribe(data =>{
			this.rowData = data
		})
		this.reload = this.LogsService.getReload().subscribe(data => {		
			this.LogsService.getLogs().subscribe(data => {
				this.rowData = data.data
			})
		})

		this.reload = this.LogsService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload  : Subscription
	
	data : Subscription

    ngOnInit(){
	
    }
	
   
    columnDefs = [	
		{headerName: 'Fullname', field: 'user_id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:260 },		
		{headerName: 'IP Address', field: 'ip_address', sortable: true, filter: 'agTextColumnFilter',width:150 },	
		{headerName: 'Device', field: 'user_agent', sortable: true, filter: 'agTextColumnFilter' ,cellRenderer: 'device' },
		{headerName: 'Action', field: 'action', sortable: true, filter: 'agTextColumnFilter' ,width:300},
		{headerName: 'Date Created', field: 'created_at', sortable: true, filter: 'agTextColumnFilter', cellRenderer: (data) => {
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
		actionButtons: ActionButtonsLogsComponent,
		role: RoleLogsComponent,
		device:DeviceComponent
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
		this.LogsService.getLogs().subscribe(data => {
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
			title: 'Are you sure you want to delete ' + names + ' ?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.LogsService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}

}
