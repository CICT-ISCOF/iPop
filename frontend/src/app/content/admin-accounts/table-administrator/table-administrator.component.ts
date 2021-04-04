import { Component, OnInit, ViewChild, LOCALE_ID, Inject,  } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { AdminService } from '../../../admin.service';
import {GridOptions} from "ag-grid-community"
import { formatDate } from '@angular/common';
import { ActionButtonAdminComponent } from '../action-button-admin/action-button-admin.component';
import { RoleComponent } from '../role/role.component';
import { LocationComponent } from '../location/location.component'
import { Subscription } from 'rxjs'
import Swal from 'sweetalert2'
import { UtilityService } from '../../../others/utility.service'


@Component({
  selector: 'app-table-administrator',
  templateUrl: './table-administrator.component.html',
  styleUrls: ['./table-administrator.component.scss']
})
export class TableAdministratorComponent implements OnInit {
 
	@ViewChild('agGrid') agGrid: AgGridAngular;

	constructor(
		private AdminService: AdminService,
		@Inject(LOCALE_ID) private locale: string ,
		private UtilityService : UtilityService
	) {
		this.data = this.AdminService.getPage().subscribe(data =>{
			this.rowData = data
		})
		this.reload = this.AdminService.getReload().subscribe(data => {		
			this.AdminService.getAdminLists().subscribe(data => {
				this.rowData = data.data
			}) 
		})

		this.reload = this.AdminService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload
	
	data : Subscription

    ngOnInit(){
	
    }
	
   
    columnDefs = [	
		{headerName: 'Operations', field: 'id',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:260 },
		{headerName: 'Fullname', field: 'fullname', sortable: true, filter: 'agTextColumnFilter',width:350 },
		{headerName: 'Role', field: 'fullname', sortable: true, filter: 'agTextColumnFilter' ,cellRenderer: 'role' },
		{headerName: 'District', field: 'district', sortable: 'district', filter: 'agTextColumnFilter',width:130},
		{headerName: 'Muncipality', field: 'municipality', sortable: 'municipality', filter: 'agTextColumnFilter'},
		{headerName: 'Barangay', field: 'barangay',sortable: true, filter: 'agTextColumnFilter' ,cellRenderer: 'location' },
		{headerName: ' Date Created', field: 'created_at', sortable: true, filter: 'agTextColumnFilter', cellRenderer: (data) => {
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
		location : LocationComponent,
		actionButtons: ActionButtonAdminComponent,
		role: RoleComponent,
		
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
		event.api.closeToolPanel();
		this.columnAPi = event.columnAPi
		this.AdminService.getAdminLists().subscribe(data => {
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
			this.UtilityService.setAlert('Please select admin you want to delete','error')
			return
		}
		Swal.fire({
			title: 'Are you sure you want to delete ' + names + ' ?' ,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.AdminService.setMultipleDelete(identifiers)	
			}		
		})	
	
	}


	

}
