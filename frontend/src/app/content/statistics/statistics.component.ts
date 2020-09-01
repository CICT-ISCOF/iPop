import { Component, OnInit } from '@angular/core';
import { StatisticsService } from  './statistics.service'
import { Console } from 'console';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	constructor(	
		private StatisticsService : StatisticsService
	) { }

	ngOnInit(): void {
		this.callCharts()	
		this.getGeneralData()
		this.getPopulation()
		this.getTotals()
		this.getGenders()
		this.getMunicipality()
		this.getMarriages()		
	}
	
	theme = localStorage.getItem('data-theme')


	general
	population
	totals
	genders
	municipality
	marriages
	getGeneralData(){
		this.general = this.StatisticsService.general().subscribe(data => {
			console.log(data)
		})
	}

	getPopulation(){
		this.population = this.StatisticsService.population().subscribe(data => {
			
		})
	}

	getTotals(){
		this.totals = this.StatisticsService.totals().subscribe(data => {
			
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

	getMarriages(){
		this.municipality = this.StatisticsService.marriages().subscribe(data => {
			
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
			['January',54,-54],
			['Feburary',254,-54],
			['March',54,-54],
			['April',454,-54],
			['May',554,-54],
			['June',654,-54],
			['July',454,-54],
			['August',354,-54],
			['September',454,-54],
			['October',254,-54],
			['November',554,-54],
			['December',154,-54],
		],

		inMigAndOutMig:[
			['Age', 'Deaths', 'Births'],
			['January',54,-54],
			['Feburary',254,-54],
			['March',54,-54],
			['April',454,-54],
			['May',554,-54],
			['June',654,-54],
			['July',454,-54],
			['August',354,-54],
			['September',454,-54],
			['October',254,-54],
			['November',554,-54],
			['December',154,-54],
		],
		married:[
			['January',54],
			['Feburary',254],
			['March',54],
			['April',454],
			['May',554],
			['June',654],
			['July',454],
			['August',354],
			['September',54],
			['October',254],
			['November',554],
			['December',154],
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
