import { UtilityService } from './../../../utility.service';
import { MigrationStatService } from './migration-stat.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-migrations',
  templateUrl: './migrations.component.html',
  styleUrls: ['./migrations.component.scss']
})
export class MigrationsComponent implements OnInit {

	constructor(
		private LocationService : LocationService,
		private MigrationStatService : MigrationStatService,
		private UtilityService : UtilityService
	) { }

	municipalities:any = [] 
	barangays:any = [] 
	hasData = true
	data = {
		municipality:'Select Municipality',
		barangay: '',
		year:'',
		gender:''	,
		total_in_migrations:'',
		total_out_migrations: '',
		net_migrations:'',
		months:{
			January:0,
			February:0,
			March:0,
			April:0,
			May:0,
			June:0,
			July:0,
			August:0,
			September:0,
			October:0,
			November:0,
			December:0,
		},	
		type:'Migration'
	}
	years = []		
	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = [];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{data: [], label: 'Births By Months'},	
	]
	MIGRATIONbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	}
	MIGRATIONbarChartLabels = ['2018', '2019', '2020',];
	MIGRATIONbarChartType = 'bar';
	MIGRATIONbarChartLegend = true;
	MIGRATIONbarChartData = [
			{data: [65], label: 'Total Population'},
			{data: [28], label: 'Total In Migration'},
			{data: [48], label: 'Total Out Migration'}
	]

	ngOnInit(): void {
		for(let i = 2020 ; i <= 2050; i ++){
			this.years.push(i)
		}
		this.getMuncipalities()
	}
	
	getDataParams = {
		barangay:'',
		municipality:'',
		year:'',
		gender:''
	}

	checked = {
		male:false,
		female:false,
		all:true
	}

	getMuncipalities(){		
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data			
		})
	}
	
	getBarangays(event){	
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
		})
	}  

	save(){		
		this.MigrationStatService.postToMOnthController(this.data).subscribe(data => {
			this.MigrationStatService.create(this.data).subscribe(data => {			
				this.UtilityService.setAlert('New Death Statistics Data has been added', 'success')
			})
		})
	}

	editChartData = false
	updateChart(){
		this.data['barangay'] = this.getDataParams.barangay
		this.data['municipality'] = this.getDataParams.municipality
		this.data['year'] = this.getDataParams.year
		this.data['gender'] = this.getDataParams.gender
		this.MigrationStatService.postToMOnthController(this.data).subscribe(data => {	
			this.editChartData = false		
			this.MONTHbarChartLabels = []
			this.MONTHbarChartData[0].data = []
			this.fetchData()
			this.UtilityService.setAlert('Chart has been updated','success')			
		})
	}

	getBarangaysandGet(event){	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
		})
	}

	
	check(item){
		for(let checkbox in this.checked){
			this.checked[checkbox] = false
		}
		this.checked[item] = true
		this.getDataParams.gender = item	
		this.fetchData()
	}

	migrationStatistics = {}
	hasSelectedData = false
	fetchData(){
		this.MigrationStatService.showData(
			this.getDataParams.municipality,
			this.getDataParams.barangay,
			this.getDataParams.year,
			this.getDataParams.gender,
		).subscribe(data => {
			this.hasSelectedData = true
			this.migrationStatistics = data.data	
			// data.incidence.forEach(element => {				
			// 	if(!this.TEENAGEBIRTHRATEbarChartLabels.includes(element.year)){
			// 		this.TEENAGEBIRTHRATEbarChartLabels.push(element.year)
			// 	}
			// 	this.TEENAGEBIRTHRATEbarChartData[0].data.push(element.value)				
			// })
			data.month.forEach(element => {
				if(!this.MONTHbarChartLabels.includes(element.month)){
					this.MONTHbarChartLabels.push(element.month)					
				}
				if(this.checked.male){
					this.MONTHbarChartData[0].data.push(element.males)
	 				this.data.months[element.month] = element.males				
				}
				if(this.checked.female){
					this.MONTHbarChartData[0].data.push(element.females)
					this.data.months[element.month] = element.females				
				}
				if(this.checked.all){
					this.MONTHbarChartData[0].data.push(element.total)
					this.data.months[element.month] = element.total					
				}
			})
		},error =>{
			this.hasSelectedData = false
			this.UtilityService.setAlert('No data on this particular filter yet','info')
		})		
	}


	bottomChartData = {
		title:'',
		type:'Birth',
		value:0,
		years:[]
	}
	DeathRateData = false
	saveBottomCharts(title){
		// INCIDENCE OF TEENAGE BIRTHS
		// INCIDENCE OF ILLEGITIMATE BIRTHS
		this.bottomChartData.title = title
		this.bottomChartData['barangay'] = this.getDataParams.barangay
		this.bottomChartData['municipality'] = this.getDataParams.municipality	
		this.bottomChartData['gender'] = this.getDataParams.gender
		this.MigrationStatService.postToinsidence(this.bottomChartData).subscribe(data =>{
			this.DeathRateData = true
			this.UtilityService.setAlert('Crude Death Rate has been Updated','success')
			// this.TEENAGEBIRTHRATEbarChartLabels = []
			// this.TEENAGEBIRTHRATEbarChartData[0].data = []
			// this.ILLEGITIMATEBIRTHbarChartLabels = []
			// this.ILLEGITIMATEBIRTHbarChartData[0].data = []
			this.fetchData()				
		})
	}


}
