import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-migrations',
  templateUrl: './migrations.component.html',
  styleUrls: ['./migrations.component.scss']
})
export class MigrationsComponent implements OnInit {

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

	MIGRATIONbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MIGRATIONbarChartLabels = ['2018', '2019', '2020',];
	MIGRATIONbarChartType = 'bar';
	MIGRATIONbarChartLegend = true;
	MIGRATIONbarChartData = [
			{data: [65, 59, 80], label: 'Total Population'},
			{data: [28, 48, 40], label: 'Total In Migration'},
			{data: [28, 48, 40], label: 'Total Out Migration'}
	];



	ngOnInit(): void {
	}

}
