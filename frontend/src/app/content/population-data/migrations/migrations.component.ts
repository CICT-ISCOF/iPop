import { UtilityService } from './../../../utility.service';
import { MigrationStatService } from './migration-stat.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';


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
		gender: 'Male',
		total_in_migrations:'',
		total_out_migrations: '',
		net_migrations:'',
		monthsFemale: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
		monthsMale: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
	 		June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
			
		},
		monthsTotal: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
			
		},
		type:'Migration'
	}
	years = []		
	checked = {
		male: true,
		female: false,
		all: false,
	}

	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = [];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	
	MIGRATIONbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	}
	MIGRATIONbarChartLabels = ['2018', '2019', '2020',];
	MIGRATIONbarChartType = 'bar';
	MIGRATIONbarChartLegend = true;
	

	ngOnInit(): void {
		for(let i = 2015 ; i <= 2050; i ++){
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

	municipalityIsLoading = false
	getMuncipalities(){		
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalityIsLoading = false
			this.municipalities = data			
		})
	}
	barangayIsLoading = false
	getBarangaysandGet(event) {
		this.barangayIsLoading = true	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;
		this.LocationService.getBarangays(event.target.value).subscribe((data) => {
			this.barangays = data
			this.barangayIsLoading = false
		})
	}

	getBarangays(event){	
		this.barangayIsLoading = true	
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
			this.barangayIsLoading = false
		})
	} 

	save(){		
		this.data['months'] = []
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					this.data['months'] = this.data['monthsMale']
				}
				if(key == 'female'){
					this.data['months'] = this.data['monthsFemale']
				}
				if(key == 'all'){
					this.data['months'] = this.data['monthsTotal']
				}
			}
		}
		this.MigrationStatService.postToMOnthController(this.data).subscribe(data => {
			this.MigrationStatService.create(this.data).subscribe(data => {			
				Swal.fire(
					'New Migration Statistics Data has been added',
					'',
					'success'
				)
			})
		})
	}

	editChartData = false
	isLoading = false
	updateChart(){
		this.data['barangay'] = this.getDataParams.barangay
		this.data['municipality'] = this.getDataParams.municipality
		this.data['year'] = this.getDataParams.year
		this.data['gender'] = this.getDataParams.gender
		this.data['months'] = []
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					this.data['months'] = this.data['monthsMale']
				}
				if(key == 'female'){
					this.data['months'] = this.data['monthsFemale']
				}
				if(key == 'all'){
					this.data['months'] = this.data['monthsTotal']
				}
			}
		}
		this.MigrationStatService.postToMOnthController(this.data).subscribe(data => {	
			this.isLoading = false
			this.editChartData = false		
			this.MONTHbarChartLabels = []
			this.MONTHbarChartData[0].data = []
			this.fetchData()
			Swal.fire('Chart has been updated','', 'success');
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

	migrationStatistics:any = {}
	hasSelectedData = false
	
	MONTHbarChartData = [
		{ data: [], label: 'Females' },
		{ data: [], label: 'Males' },
		{ data: [], label: 'Total' }
	]
	MIGRATIONbarChartData = [
		{data: [0], label: 'Total Population'},
		{data: [0], label: 'Total In Migration'},
		{data: [0], label: 'Total Out Migration'}
	]

	fetchData(){
		if(
			this.getDataParams.municipality == "" || 
			this.getDataParams.municipality  == null ||
			this.getDataParams.barangay == "" || 
			this.getDataParams.barangay == null ||
			this.getDataParams.year == "" ||  
			this.getDataParams.barangay ==null 
		){
			return Swal.fire(
				'Filter Policy',
				'Please specify filters to get accurate data',
				'info'
			)
		}
		this.MigrationStatService.showData(
			this.getDataParams.municipality,
			this.getDataParams.barangay,
			this.getDataParams.year,
			this.getDataParams.gender,
		).subscribe(data => {
			this.hasSelectedData = true
			this.migrationStatistics = data.data
			this.MIGRATIONbarChartData[0].data =  [data.data.profile || 0]
			this.MIGRATIONbarChartData[1].data =  [data.data.total_in_migrations || 0]
			this.MIGRATIONbarChartData[2].data =  [data.data.total_out_migrations || 0	]
			for(let index in data.month){		
				if (!this.MONTHbarChartLabels.includes(data.month[index].month)) {
					this.MONTHbarChartLabels.push(data.month[index].month);
				}
				this.MONTHbarChartData[0].data.push(data.month[index].females);
				this.data.monthsFemale[data.month[index].month] = data.month[index].females;
		
				this.MONTHbarChartData[1].data.push(data.month[index].males);
				this.data.monthsMale[data.month[index].month] = data.month[index].males;
		
				this.MONTHbarChartData[2].data.push(data.month[index].total);
				this.data.monthsTotal[data.month[index].month] = data.month[index].total;
			}
			
			
		},error =>{
			this.hasSelectedData = false;
			Swal.fire(
				'Empty Data',
				'No data on this particular filter yet',
				'info'
			)
		})		
	}

	getChecked(){
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					return 'monthsMale'
				}
				if(key == 'female'){
					return 'monthsFemale'
				}
				if(key == 'all'){
					return 'monthsTotal'
				}
			}
		}
	}

	
	update(){
		this.MigrationStatService.create(this.migrationStatistics).subscribe((data) => {
			Swal.fire(
				'Data has been updated',
				`Data on ${this.migrationStatistics['barangay']}, ${this.migrationStatistics['municipality']}  at year ${this.migrationStatistics['year']} has been updated`,
				'success'
			)
		})
	}


	DeathRateData = false
	// saveBottomCharts(title){
	// 	// INCIDENCE OF TEENAGE BIRTHS
	// 	// INCIDENCE OF ILLEGITIMATE BIRTHS
	// 	this.bottomChartData.title = title
	// 	this.bottomChartData['barangay'] = this.getDataParams.barangay
	// 	this.bottomChartData['municipality'] = this.getDataParams.municipality	
	// 	this.bottomChartData['gender'] = this.getDataParams.gender
	// 	this.MigrationStatService.postToinsidence(this.bottomChartData).subscribe(data =>{
	// 		this.DeathRateData = true
	// 		this.UtilityService.setAlert('Crude Death Rate has been Updated','success')
	// 		// this.TEENAGEBIRTHRATEbarChartLabels = []
	// 		// this.TEENAGEBIRTHRATEbarChartData[0].data = []
	// 		// this.ILLEGITIMATEBIRTHbarChartLabels = []
	// 		// this.ILLEGITIMATEBIRTHbarChartData[0].data = []
	// 		this.fetchData()				
	// 	})
	// }


}
