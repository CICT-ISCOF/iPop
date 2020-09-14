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
	) { 
		this.reload = this.CpdbService.getData().subscribe(data => {
			this.rowData = data
		})

		
		this.reload = this.CpdbService.getActionToDelete().subscribe(()=>{
			this.getSelectedRows()
		})
	}

	reload
	
	ngOnInit(): void {

	}

	columnDefs = [	
		{headerName: 'OPERATIONS', field: '',filter:false, checkboxSelection: true, cellRenderer: 'actionButtons',width:300 },
		{headerName: 'STATUS', field: 'status',cellRenderer: 'status',width:150 },
		{headerName: 'MUNICIPALITY', field: 'municipality', sortable: true, filter: 'agTextColumnFilter',width:200 },	
		{headerName: 'BARANGAY', field: 'barangay', sortable: true, filter: 'agTextColumnFilter',width:200 },	
		{headerName: 'PUROK OR ZONE', field: 'zone', sortable: true, filter: 'agTextColumnFilter',width:200 },	
		{headerName: 'HOUSEHOLD NUMBER', field: 'household_number', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HOUSEHOLD CHARACTERISITCS', field: 'household_characteristics', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'NO. OF PERSONS LIVING IN THE HOUSE', field: 'number_of_persons_living', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HOUSEHOLD SIZE BRACKET', field: 'household_size_bracket', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'NUMBER OF FAMILIES', field: 'number_of_families', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'LINE NUMBER OF HOUSEHOLD MEMBER', field: 'line_number_of_household_member', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'NAME OF HOUSEHOLD MEMBERS', field: 'name_of_household_member', sortable: true, filter: 'agTextColumnFilter',width:350 },		
		{headerName: 'RELATIONSHIP TO HOUSEHOLD HEAD', field: 'relationship_to_household_head', sortable: true, filter: 'agTextColumnFilter',width:350 },


		{headerName: 'SEX', field: 'sex', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'DATE OF BIRTH', field: 'date_of_birth', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'AGE AS OF LAST BIRTHDAY', field: 'age', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'AGE BRACKET', field: 'age_bracket', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'CIVIL STATUS', field: 'civil_status', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HIGHEST EDUCATIONAL ATTAINMENT', field: 'highest_educational_attainment', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'SCHOOL ATTENDANCE', field: 'school_attendance', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'GRADE/YEAR LEVEL OF SCHOOL ATTENDANCE', field: 'level_of_school_attendance', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'REASON FOR NOT ATTENDING SCHOOL', field: 'reason_for_not_attending_school', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'RELIGIOUS AFFILIATION', field: 'religious_affiliation', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HAVE SPECIAL SKILLS', field: 'have_special_skills', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'TYPE OF SPECIAL SKILLS', field: 'type_of_special_skill', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'PRESENCE OF DISABILITY', field: 'presence_of_disability', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'TYPE OF DISABILITY', field: 'type_of_disability', sortable: true, filter: 'agTextColumnFilter',width:350 },	

		{headerName: 'INDIGENOUS GROUP OR TRIBE', field: 'indigenous_group_or_tribe', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'NAME OF INDIGENOUS OR TRIBE', field: 'name_of_group_or_tribe', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'ACTIVE PHILHEALTH MEMBER (18 YEARS OLD & ABOVE)', field: 'active_philhealth_member', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'PHILHEALTH MEMBERSHIP-SPECIFY', field: 'philhealth_membership_specify', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'USUAL OCCUPATION OF WORKING HH MEMBER', field: 'usual_occupation_of_working_household_member', sortable: true, filter: 'agTextColumnFilter' ,width:200},	
		{headerName: 'GROSS MONTHLY INCOME', field: 'gross_monthly_income', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'INCOME BRACKET', field: 'income_bracket', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'PLACE OF WORK/EMPLOYMENT OF THE EARNING HOUSEHOLD MEMBER', field: 'place_of_work', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'NO. OF YEARS STAY (IN CURRENT ADDRESS)', field: 'number_of_years_stay', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'NO. OF YEARS STAY BRACKET', field: 'number_of_years_bracket', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'FP CURRENTLY USED (BY WOMEN 10-50 YRS OLD)', field: 'fp_currently_used', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'TOTAL HOUSEHOLD MONTHLY INCOME', field: 'total_household_monthly_income', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HOUSEHOLD INCOME BRACKET', field: 'household_income_bracket', sortable: true, filter: 'agTextColumnFilter' ,width:350},	


		{headerName: 'HOUSE OWNERSHIP', field: 'house_ownership', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'HOW MANY STORIES/LEVEL IS THE HOUSE?', field: 'house_levels', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HOUSE CONSTRUCTION MATERIAL', field: 'house_construction_material', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'HOMELOT OWNERSHIP/TENURE STATUS', field: 'homelot_ownership_or_tenure_status', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'HOUSEHOLD USUAL SOURCE OF WATER FOR DRINKING', field: 'source_of_drinking_water', sortable: true, filter: 'agTextColumnFilter',width:350 },	
		{headerName: 'TYPE OF TOILET THE HOUSEHOLD OWNS', field: 'type_of_toilet', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: "HOUSEHOLD'S GARBAGE DISPOSAL", field: 'garbage_disposal', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'TYPE OF FUEL USE FOR LIGHTING', field: 'type_of_lighting_fuel', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'TYPE OF FUEL FOR COOKING', field: 'type_of_cooking_fuel', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'HOUSE LOCATION GEO-HAZARD AREA', field: 'geohazard_area', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'HOUSEHOLD LOCATION', field: 'household_location', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'WATER LEVEL IN FLOOD PRONE AREA', field: 'flood_prone_area_water_level', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: 'ACCESS TO INFORMATION TECHNOLOGY', field: 'access_to_infotech', sortable: true, filter: 'agTextColumnFilter' ,width:350},	
		{headerName: '4PS BENEFICIARY HOUSEHOLD', field: '4ps_beneficiary_household', sortable: true, filter: 'agTextColumnFilter' ,width:350},		
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
		event.api.closeToolPanel();
		this.CpdbService.getCPDBLists().subscribe(data => {
			 event.api.setRowData(data.data)		
			 console.log(data)
		 })
	}

	
	getSelectedRows() {				
		const selectedNodes:any = this.agGrid.api.getSelectedNodes();	
		let identifiers:any = []
		let fullnames:any = []
		for( let id in selectedNodes ){
			identifiers.push(selectedNodes[id].data.id)
		}
		if(identifiers.length == 0){
			this.UtilityService.setAlert('Please select data you want to delete','error')
			return
		}
		for( let id in selectedNodes ){
			fullnames.push(selectedNodes[id].data.fullname)
		}		
		let names = fullnames.join(', ')	
		Swal.fire({
			title: 'Are you sure you want to delete this record/s?' ,		
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
