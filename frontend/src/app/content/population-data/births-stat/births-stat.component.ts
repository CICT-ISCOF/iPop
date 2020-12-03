import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-births-stat',
  templateUrl: './births-stat.component.html',
  styleUrls: ['./births-stat.component.scss']
})
export class BirthsStatComponent implements OnInit {

	constructor() { }



	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{data: [65, 59, 80, 81, 14, 55, 61, 11, 14, 55, 61, 61], label: 'Births By Months'},
	
	];


	// -------------

	TEENAGEBIRTHRATEbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	TEENAGEBIRTHRATEbarChartLabels = ['2018', '2019', '2020',];
	TEENAGEBIRTHRATEbarChartType = 'line';
	TEENAGEBIRTHRATEbarChartLegend = true;
	TEENAGEBIRTHRATEbarChartData = [
		{data: [65, 59, 80], label: 'INCIDENCE OF TEENAGE BIRTHS'},		
	];

	
	// -------------

	ILLEGITIMATEBIRTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	ILLEGITIMATEBIRTHbarChartLabels = ['2018', '2019', '2020',];
	ILLEGITIMATEBIRTHbarChartType = 'line';
	ILLEGITIMATEBIRTHbarChartLegend = true;
	ILLEGITIMATEBIRTHbarChartData = [
		{data: [65, 59, 80], label: 'INCIDENCE OF ILLEGITIMATE BIRTHS'},		
	];


	ngOnInit(): void {
	}

}
