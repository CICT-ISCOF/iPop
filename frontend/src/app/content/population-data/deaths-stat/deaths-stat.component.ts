import { DeathsService } from './../../deaths/deaths.service';
import { utils } from 'xlsx';
import { UtilityService } from './../../../utility.service';
import { DeathStatService } from './death-stat.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deaths-stat',
  templateUrl: './deaths-stat.component.html',
  styleUrls: ['./deaths-stat.component.scss','./death-stat.responsive.scss']
})
export class DeathsStatComponent implements OnInit {

	constructor(
		private LocationService : LocationService,
		private DeathStatService : DeathStatService,
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
		total_live_births:'',
		crude_death_rate: '',
		general_fertility_rate:'',
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
		type:'Death'
	}

	years = []
	
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
  



	// -------------

	

	
	ngOnInit(): void {
		for(let i = 2020 ; i <= 2050; i ++){
			this.years.push(i)
		}
		this.getMuncipalities()
	}

	
	save(){		
		this.DeathStatService.postToMOnthController(this.data).subscribe(data => {
			this.DeathStatService.create(this.data).subscribe(data => {			
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
		this.DeathStatService.postToMOnthController(this.data).subscribe(data => {	
			this.editChartData = false		
			this.fetchData()
			this.UtilityService.setAlert('Chart has been updated','success')
		})
	}


	getDataParams = {
		barangay:'',
		municipality:'',
		year:'',
		gender:''
	}

	getBarangaysandGet(event){	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
		})
	}

	checked = {
		male:false,
		female:false,
		all:true
	}

	check(item){
		for(let checkbox in this.checked){
			this.checked[checkbox] = false
		}
		this.checked[item] = true
		this.getDataParams.gender = item	
		this.fetchData()
	}

	
	teenAgeBirth = {
		first:'',
		second:'',
		third:''
	}

	legitimateBIrth = {
		first:'',
		second:'',
		third:''
	}

	hasSelectedData = false
	deathStatistics = {}

	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = [];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{data: [], label: 'Deaths By Months'},
	
	]

	fetchData(){
		this.DeathStatService.show(
			this.getDataParams.municipality,
			this.getDataParams.barangay,
			this.getDataParams.year,
			this.getDataParams.gender,
		).subscribe(data => {
			this.hasSelectedData = true
			this.deathStatistics = data.data	
			data.incidence.forEach(element => {
				if(!this.DEATHRATEbarChartLabels.includes(element.year)){
					this.DEATHRATEbarChartLabels.push(element.year)
				}
				this.DEATHRATEbarChartData[0].data.push(element.value)				
			})
			data.month.forEach(element => {
				if(!this.MONTHbarChartLabels.includes(element.month)){
					this.MONTHbarChartLabels.push(element.month)
				}
				if(this.checked.male){
					this.MONTHbarChartData[0].data.push(element.males)
				}
				if(this.checked.female){
					this.MONTHbarChartData[0].data.push(element.females)
				}
				if(this.checked.all){
					this.MONTHbarChartData[0].data.push(element.total)
				}
				
			});
		},error =>{
			this.hasSelectedData = false
			this.UtilityService.setAlert('No data on this particular filter yet','info')
		})
		
	}


	crudeDeathRateData = {
		title:'Crude Death Rate',
		type:'Death',
		value:0,
		years:[]
	}
	DEATHRATEbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	DEATHRATEbarChartLabels = [];
	DEATHRATEbarChartType = 'line';
	DEATHRATEbarChartLegend = true;
	DEATHRATEbarChartData = [
		{data: [], label: 'Crude Death Rate'},		
	];
	saveCrudDEathRate(){
		this.crudeDeathRateData['barangay'] = this.getDataParams.barangay
		this.crudeDeathRateData['municipality'] = this.getDataParams.municipality	
		this.crudeDeathRateData['gender'] = this.getDataParams.gender
		this.DeathStatService.postToinsidence(this.crudeDeathRateData).subscribe(data =>{
			data.forEach(element => {
				if(!this.DEATHRATEbarChartLabels.includes(element.year)){
					this.DEATHRATEbarChartLabels.push(element.year)
				}
				this.DEATHRATEbarChartData[0].data.push(element.value)
			})
		})
	}



	

	


}
 