import { Component, OnInit } from '@angular/core';
import { StatisticsService } from  './statistics.service'
import { Console } from 'console';
import { LocationService } from '../../location.service'
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations'

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss','statistics.component.responsive.scss'],
	animations: [
		trigger('listAnimation', [
			transition('* => *',[
				query(':enter', style({opacity:0}),{optional:true}),

				query(':enter', stagger('300ms',[
					animate('.6s ease-in', keyframes([
						style({opacity:0,transform: 'translateY(-75%)', offset:0}),
						style({opacity:.5,transform: 'translateY(30px%)', offset:0.3}),
						style({opacity:1,transform: 'translateY(0)', offset:1})
					]))
				]))
			])
		])
	]
})
export class StatisticsComponent implements OnInit {

	constructor(	
		private StatisticsService : StatisticsService,
		private LocationService : LocationService
	) { }

	theme = localStorage.getItem('data-theme')
	isLoading = false

	filter = {
		municipality:'',
		barangay:'',
		year:'',
		month:''
	}

	ngOnInit(): void {		
		this.getGeneralData()
		this.getPopulation()
		this.getTotals()
		this.getGenders()
		this.getMunicipality()
		this.getMonths()		
		this.getMuncipalities()
		this.getAgeDistributions()
		
	}


	municipalities = []
	getMuncipalities(){
		this.isLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.isLoading = false			
		})		
	}
	barangays = []
	getBarangays(event){	
		this.isLoading = true
		this.filter.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.filter.barangay = ''
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data	
			this.isLoading = false
		})

		this.StatisticsService.getMunicipality(this.filter.municipality).subscribe(data => {
		
		})
	}

	setBarangay(event){
		this.filter.barangay = event.target.options[event.target.options.selectedIndex].text;	
	}
	

	general
	population:any = {
		top:[]
	}
	totals
	genders
	municipality

	getGeneralData(){
		// this.general = this.StatisticsService.general().subscribe(data => {			
		// 	this.general = data
			
		// })
	}

	getPopulation(){
		this.population = this.StatisticsService.population().subscribe(data => {		
			this.population = data
		})
	}

	getTotals(){
		this.totals = this.StatisticsService.totals().subscribe(data => {			
			this.totals = data
		})
	}

	
	getGenders(){
		this.genders = this.StatisticsService.genders().subscribe(data => {
		
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
	getMonths(){
		this.monthsisLoading = true
		this.StatisticsService.months().subscribe(data => {
			this.month = data
			const  truncate = (month) => {
				return month.substring(0, 3);
			}
			this.charts.married = []
			for(let key in data.marriage){
				this.charts.married.push([ truncate(key.toString()) ,data.marriage[key]])
			}								
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

	getAgeDistributions(){
		this.StatisticsService.ageDistribution().subscribe(data => {
		
		})
	}




















	
	// ----------------- charts -----------------------------
	

	charts = {		
		maleAndFemale : [
			['Age', 'Male', 'Female'],
			['Below 1 year old', 120, -124],
			['0-4',   106, -104],
			['5-9',   91,  -86 ],
			['10-14', 79,  -77 ],
			['15-19', 68,  -64 ],
			['20-24', 62,  -58 ],
			['25-29', 56,  -53 ],
			['30-34', 51,  -46 ],
			['35-39', 48,  -41 ],
			['40-44', 43,  -35 ],
			['45-49', 39,  -30 ],
			['50-54', 33,  -27 ],
			['55-59', 32,  -25 ],
			['60-64', 27,  -20 ],
			['64-69', 19,  -16 ],
			['70-74', 13,  -12 ],
			['75-79', 8,   -7  ],
			['80 and above', 3,   -3  ],	
		],
				
		birthAndDeath:[			
			['Age', 'Births', 'Deaths'],	
					
		],

		inMigAndOutMig:[
			['Age', 'Deaths', 'Births'],	
					
		],
		married:[			
		]
	}
		
	googleChartOptions = {
		marriedOptions:{
			backgroundColor:this.formatChartBackground(),
			vAxis: {			
				textStyle:{color:this.formatChatColor()},
			},
			hAxis: {
				textStyle:{color:this.formatChatColor()},			
			},
			curveType: 'function',			
		},		
		pyramidChartOptions :{
			color:['green','orange'],
			isStacked: true,				
			vAxis: {
				direction: -1,
				textStyle:{color:this.formatChatColor()},
			},
			hAxis: {
				textStyle:{color:this.formatChatColor()},
				format: ';'
			},
			backgroundColor:this.formatChartBackground(),			
		}
	}

	callCharts(){
		this.drawChart('male-and-female',this.charts.maleAndFemale)
		this.drawChart('death-and-birth',this.charts.birthAndDeath)
		this.drawChart('in-mig-and-Out-mig',this.charts.inMigAndOutMig)
	}

	drawChart(chartId,chartData){
		const chart = () => {
			var data = google.visualization.arrayToDataTable(chartData)
			var chart = new google.visualization.BarChart(document.getElementById(chartId))			
			var formatter = new google.visualization.NumberFormat({
				pattern: ';'
			})
			formatter.format(data, 2)
			chart.draw(data, this.googleChartOptions.pyramidChartOptions)
		}
		google.load("visualization", "1", {packages:["corechart"]})
		google.setOnLoadCallback(chart)
	}


	
	// -------------- formaters ----------------

	formatChartBackground(){
		return this.theme == 'dark' ?   'transparent' : 'white'		
	}

	formatChatColor(){
		return this.theme == 'dark' ?   'white' : 'black'
	}

	

}
