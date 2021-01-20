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

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss','statistics.component.responsive.scss'],
	// animations: [
	// 	trigger('listAnimation', [
	// 		transition('* => *',[
	// 			query(':enter', style({opacity:0}),{optional:true}),

	// 			query(':enter', stagger('300ms',[
	// 				animate('.6s ease-in', keyframes([
	// 					style({opacity:0,transform: 'translateY(-75%)', offset:0}),
	// 					style({opacity:.5,transform: 'translateY(30px)', offset:0.3}),
	// 					style({opacity:1,transform: 'translateY(0)', offset:1})
	// 				]))
	// 			]))
	// 		])
	// 	])
	// ]
})
export class StatisticsComponent implements OnInit {

	// --------- new ------------
	
	addData = false

	data:any = {}

	saveData(){
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

	filteredData = {}
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




	years = []

	constructor(	
		private StatisticsService : StatisticsService,
		private LocationService : LocationService,
		private UtilityService : UtilityService,
		private OfficialsService : OfficialsService
	) { }

	// -------------- formaters ----------------

	formatChartBackground(){
		return this.theme == 'dark' ?   '#282C34' : 'white'		
	}

	formatChatColor(){
		return this.theme == 'dark' ?   'white' : 'black'
	}

	theme = localStorage.getItem('data-theme')
	isLoading = false

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
		this.getPopulation()
		this.getTotals()		
		this.getMunicipality()		
		this.getMuncipalities()
		this.getMonths()		
	}

	municipalities = []
	municipalityIsLoading = false
	getMuncipalities(){
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.municipalityIsLoading = false			
		})		
	}

	barangays = []
	barangayIsLoading
	
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

	general
	population = {
		top:[],
		total:0
	}
	totals
	genders
	municipality

	getPopulation(){
		this.StatisticsService.population().subscribe(data => {		
			this.population = data		
			console.log(data)
		})
	}

	getTotals(){
		this.totals = this.StatisticsService.totals().subscribe(data => {			
			this.totals = data
		})
	}

	getMunicipality(){
		this.municipality = this.StatisticsService.municipality().subscribe(data => {
			
		})
	}

	monthsisLoading = true
	month:any = {
		death:{total:''},
		birth:{total:''},
		marriage:{total:''},
		inmigration:{total:''},
		outmigration:{total:''},	
	}

	sexs = {
		male:0,
		female:0
	}

	marriageisLoading = false
	getMonths(){
		this.monthsisLoading = true
		this.StatisticsService.ageDistribution().subscribe(data => {			
			this.charts.ageDistribution = data
			for(let value in data){
				if(Number.isInteger(data[value][1]) ){
					this.sexs.male += data[value][1]
					this.sexs.female -= data[value][2]
				}
			}
		})
		this.StatisticsService.months().subscribe(data => {
			this.marriageisLoading = true
	 		this.month = data
			const  truncate = (month) => {
				return month.substring(0, 3);
			}
			this.charts.married = []
			for(let key in data.marriage){
				this.charts.married.push(data.marriage[key])				
			}		
			this.charts.married.pop()	
			// this.createMarriedChart()		`			
			for(let key in data.birth){
				this.charts.birthAndDeath.push([ key , data.birth[key]  ,-data.death[key]    ])
				
			}	
			for(let key in data.inmigration){
				this.charts.inMigAndOutMig.push([ key , data.inmigration[key]  ,-data.outmigration[key]    ])			
			}		
			this.charts.birthAndDeath.pop()
			this.charts.inMigAndOutMig.pop()
			this.monthsisLoading = false
			
			this.callCharts()	
		})
		
	}

	// ----------------- charts -----------------------------
	
	charts = {		
		ageDistribution : [
			['Age', 'Male', 'Female'],		
		],
				
		birthAndDeath:[			
			['Age', 'Births', 'Deaths'],	
					
		],

		inMigAndOutMig:[
			['Age', 'In-Migrants', 'Out-Migrants'],	
					
		],
		married:[			
		]
	}

	polarAreaChartType: ChartType = 'line'
	polarAreaLegend : true
	bgColor: Color[] = [
		{
			backgroundColor:
			'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',
			borderColor: 'purple',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	]

	googleChartOptions = {			
		pyramidChartOptions :{
			backgroundColor: {
				'fill': 'transparent',
				'opacity': 0
			},		
			title: '',
            titleTextStyle: {color: 'blue', fontSize: 16, align: 'center', bold: true},
            colors: ['#09B2E7','#F30091', ],
            chartArea: { backgroundColor: 'transparent', height: '70%', top: '10%' },
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
		birthsAndDeaths :{
			backgroundColor: {
				'fill': 'transparent',
				'opacity': 0
			},
			title: '',
            titleTextStyle: {color: 'blue', fontSize: 16, align: 'center', bold: true},
            colors: ['red','#81D340', ],
            chartArea: { backgroundColor: 'transparent', height: '70%', top: '10%', color:this.formatChatColor() },
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
		inMIgsandOutMigs :{
			backgroundColor: {
				'fill': 'transparent',
				'opacity': 0
			},
			title: '',
            titleTextStyle: {color: 'blue', fontSize: 16, align: 'center', bold: true},
            colors: ['#F2C30D','#59B8B3', ],
            chartArea: { backgroundColor: 'transparent', height: '70%', top: '10%', color:this.formatChatColor()},
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
		}
	}

	callCharts(){
		this.drawChart('male-and-female',this.charts.ageDistribution)
		this.drawChart('death-and-birth',this.charts.birthAndDeath)
		this.drawChart('in-mig-and-Out-mig',this.charts.inMigAndOutMig)
		
	}

	drawChart(chartId,chartData){
		let style = this.googleChartOptions.pyramidChartOptions
		if( chartId == 'death-and-birth'){
		    style = this.googleChartOptions.birthsAndDeaths
		}
		if( chartId == 'in-mig-and-Out-mig'){
			style = this.googleChartOptions.inMIgsandOutMigs
		}
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



	

}
