import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deaths-stat',
  templateUrl: './deaths-stat.component.html',
  styleUrls: ['./deaths-stat.component.scss']
})
export class DeathsStatComponent implements OnInit {

  constructor() { }
  
	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{data: [65, 59, 80, 81, 14, 55, 61, 11, 14, 55, 61, 61], label: 'Deaths By Months'},
	
	];


	// -------------

	DEATHRATEbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	DEATHRATEbarChartLabels = ['2018', '2019', '2020',];
	DEATHRATEbarChartType = 'line';
	DEATHRATEbarChartLegend = true;
	DEATHRATEbarChartData = [
		{data: [65, 59, 80], label: 'Crud Death Rate'},		
	];

	// DEATHRATEbarChartData = [
	// 	{data: [65, 59, 80], label: 'Total Population'},
	// 	{data: [28, 48, 40], label: 'Total Deaths'},
	// 	{data: [28, 48, 40], label: 'Crud Death Rate'}
	// ];


	ngOnInit(): void {

	}


}
 