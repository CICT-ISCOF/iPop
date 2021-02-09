import { UserService } from './../../user.service';
import { TopPopulatedMunicipalityService } from './top-populated-municipality.service';
import { PopulationPyramidService } from './population-pyramid.service';
import { OfficialsService } from './../provincial-officials/officials.service';
import { UtilityService } from './../../utility.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { StatisticsService } from  './statistics.service'
import { Console } from 'console';
import { LocationService } from '../../location.service'
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations'
import { Chart } from 'chart.js';
import { ChartType } from 'chart.js';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import Swal from 'sweetalert2'
import { OfficialsService1 } from '../officials-of/officials.service';

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss','statistics.component.responsive.scss'],
})
export class StatisticsComponent implements OnInit {

	// --------- new ------------
	
	back(){
		window.history.back()
	}

	constructor(	
		private StatisticsService : StatisticsService,
		private LocationService : LocationService,
		private UtilityService : UtilityService,
		private OfficialsService : OfficialsService,
		private OfficialsService1 : OfficialsService1,
		private PopulationPyramidService : PopulationPyramidService,
		private TopPopulatedMunicipalityService : TopPopulatedMunicipalityService,
		private UserService : UserService
	) { 
		this.OfficialsService1.listen().subscribe(()=>{
			this.CheckBarangaysAndMunicipalities()
		})
	}  

	isUser =  !this.UserService.isUser()

	years = []
	theme = localStorage.getItem('data-theme')
	isLoading = false
	municipalities = []
	municipalityIsLoading = false
	barangays = []
	barangayIsLoading
	filter = {
		municipality:'',
		barangay:'',
		year:'',
		month:''
	}

	ngOnInit(): void {	
		for(let year = 2015; year < 2100; year++){
			this.years.push(year)
		}
		this.getMuncipalities()
		this.getSummaries()
		this.retrievetopPopulateds()
		localStorage.removeItem('municipality-ref') 
		localStorage.removeItem('barangay-ref') 
	}

	hasBarangaysAndMunicipalities = false

	CheckBarangaysAndMunicipalities(){
		if(localStorage.getItem('municipality-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		if(localStorage.getItem('barangay-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		this.hasBarangaysAndMunicipalities =  true
		return
	}

	addData = false
	data:any = {}
	filteredData = {}
	
	getMuncipalities(){
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.municipalityIsLoading = false			
		})		
	}

	getBarangays(event){	
		this.barangayIsLoading = true
		this.filter.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.data['municipality'] = event.target.options[event.target.options.selectedIndex].text;	
		this.filter.barangay = ''
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data	
			this.barangayIsLoading = false
		})
	}
	
	setBarangay(event){
		this.filter.barangay = event.target.options[event.target.options.selectedIndex].text;	
		this.data['barangay'] = event.target.options[event.target.options.selectedIndex].text;	
	}

	saveData(){
		this.data['age_dependency_ratio'] = '1'
		this.StatisticsService.addPopulationProfileData(this.data).subscribe(
		(data) => {
			this.addData = false
			this.UtilityService.setAlert('Population Profile Added Successfully for ' + this.data.municipality,'success')
			this.ngOnInit()
		},
		(error) => {
			for (let message in error.error.errors) {
				this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
			this.isLoading = false;
		})
	}

	setFilter(){
		this.StatisticsService.filterData(this.filter).subscribe(
			(data) => {	
				if(data[0] == null || undefined){
					this.filteredData = {}
					return
				}		
				this.filteredData = data[0]
			}
		)
		this.OfficialsService.setOfficialsFilter(this.filter)
		localStorage.setItem('municipality-ref',this.filter.municipality) 
		localStorage.setItem('barangay-ref',this.filter.barangay) 
		this.OfficialsService1.setTrigger()
		this.retrievepopulationPyramid(this.filter)
	}

	updateFiltered(callback){
		if(this.isEmpty(this.filteredData)){
			return Swal.fire(
				`Trying to Updated Empty Data`,
				"Utililize filters to choose your desired unempty Population Data you want to update",
				'error'
			).then(()=>{
				Swal.fire(
					`Remember`,
					"You could always add Population Data by clicking the plus button at the top",
					'info'
				)
			})
		}
		this.StatisticsService.updateData(this.filteredData).subscribe((data)=>{
			this.UtilityService.setAlert('Data has been updated','info')
			callback()
		})
		
	}

	isEmpty(JSONObject) {
		for(var prop in JSONObject) {
			if(JSONObject.hasOwnProperty(prop))
				return false;
		}
		return true;
	}

	getSummaries(){

	}

	// ---------- population pyramid -----------------

	populationPyramid = {
		data:{
			male:{},
			female:{}
		}
	}
	populationPyramids:any = []

	createpopulationPyramid(){
		this.populationPyramid['municipality'] = this.filter.municipality
		this.populationPyramid['barangay'] = this.filter.barangay
		this.populationPyramid['year'] = this.filter.year
		if(this.populationPyramid['year'] == '' ){
			return Swal.fire('Please set Filters to add municipality','','error')
		}
		this.PopulationPyramidService.create(this.populationPyramid).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Creation of Population Successful','','success')
		})
	}

	retrievepopulationPyramid(filters){
		this.ageDistribution = [
			['Age', 'Male', 'Female'],		
		]
		this.PopulationPyramidService.retrieve(filters).subscribe(data => {
			this.populationPyramids = data
			for(let key in data[0]['data']['female']){
				this.ageDistribution.push([
					key,
					parseInt(data[0]['data']['male'][key]),
					-Math.abs(parseInt(data[0]['data']['female'][key]))
				])
			}
			this.drawChart('male-and-female',this.ageDistribution)
		})
	}

	ageDistribution:any =  [
		['Age', 'Male', 'Female'],		
	]

	drawChart(chartId,chartData){
		let style = this.googleChartOptions.pyramidChartOptions
		const chart = () => {
			var data = google.visualization.arrayToDataTable(chartData)
			var chart = new google.visualization.BarChart(document.getElementById(chartId))			
			var formatter = new google.visualization.NumberFormat({
				pattern: ';'
			})
			formatter.format(data, 2)
			chart.draw(data, style )
		}
		google.load("visualization", "1", {packages:["corechart"]})
		google.setOnLoadCallback(chart)
		
	}

	updatepopulationPyramid(pyramidData){
		this.PopulationPyramidService.update(pyramidData).subscribe(data => {
			this.ngOnInit()
			this.UtilityService.setAlert('Population data updated succcesffully','success')
		})
	}


	activepopulationPyramids = {}
	editpopulationPyramids(index){
		this.activepopulationPyramids[index] == true ?  this.activepopulationPyramids[index] = false : this.activepopulationPyramids[index] = true	
	}

	

	// --------------------top population----------------------


	topPulated = {
		data:{}
	}
	topPopulateds:any = []

	createtopPopulateds(){
		this.TopPopulatedMunicipalityService.create(this.topPulated).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Creation of Population Successful','','success')
		})
	}

	retrievetopPopulateds(){
		this.TopPopulatedMunicipalityService.retrieve().subscribe(data => {
			this.topPopulateds = data
			console.log('top populated ', data)
		})
	}

	deletetopPopulateds(municipality){
		Swal.fire({
			title: `Are you sure you want to remove this  ${municipality['name']}?`,		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				
			} 
		})
	}

	activetopPopulateds = {}
	edittopPopulateds(index){
		this.activetopPopulateds[index] == true ?  this.activetopPopulateds[index] = false : this.activetopPopulateds[index] = true	
	}








	// ------------------charts-------------------
	
	
	

	googleChartOptions = {			
		pyramidChartOptions :{
			backgroundColor: {
				'fill': 'transparent',
				'opacity': 0
			},		
			title: '',
            titleTextStyle: {color: 'blue', fontSize: 30, align: 'center', bold: true},
            colors: ['#09B2E7','#F30091', ],
            chartArea: { backgroundColor: 'transparent', height: '100%', top: '10%' },
            isStacked: true,        
            hAxis: {
                textPosition: 'none',
                format: ';',
				title: '',
				textStyle: {
					color: this.formatChatColor()
				},
            },
            vAxis: {
                direction: 1,
				title: '',
				textStyle: {
					color: this.formatChatColor()
				},
            },			
			legend: {textStyle: {color: this.formatChatColor()}}			
					
		},
		
	}



	

	// -------------- formaters ----------------

	formatChartBackground(){
		return this.theme == 'dark' ?   '#282C34' : 'white'		
	}

	formatChatColor(){
		return this.theme == 'dark' ?   'white' : 'black'
	}

	



	

}
