import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pmc',
  templateUrl: './pmc.component.html',
  styleUrls: ['./pmc.component.scss']
})
export class PmcComponent implements OnInit {

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


	ngOnInit(): void {
	}

}
