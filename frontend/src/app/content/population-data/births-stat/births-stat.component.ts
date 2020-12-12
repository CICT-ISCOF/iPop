import { BirthStatService } from './birth-stat.service';
import { LocationService } from './../../../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-births-stat',
  templateUrl: './births-stat.component.html',
  styleUrls: ['./births-stat.component.scss']
})
export class BirthsStatComponent implements OnInit {

	constructor(
		private LocationService : LocationService,
		private BirthStatService : BirthStatService
	) { }
	
	municipalities:any = [] 
	barangays:any = [] 
	hasData = true
	
	isLoading = false

	data = {
		municipality:'Select Municipality',
		barangay: '',
		year:'',
		male: '',
		female:'',
		total_live_births:'',
		crude_death_rate: '',
		general_fertility_rate:'',
	}

	years = []
	
	getMuncipalities(){
		this.isLoading = true
		 this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data	
			this.isLoading = false			
		})
	}

	barangayIsLoading = false
	getBarangays(event){
		this.barangayIsLoading = true
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data	
			this.barangayIsLoading = false
		})
	}


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
		for(let i = 2020 ; i <= 2050; i ++){
			this.years.push(i)
		}
		this.getMuncipalities()
	}


	save(){
		this.BirthStatService.create(this.data).subscribe(data => {
			console.log(data)
		})
	}

}
