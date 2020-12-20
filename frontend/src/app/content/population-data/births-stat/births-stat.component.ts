import { UtilityService } from './../../../utility.service';
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
		private BirthStatService : BirthStatService,
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
		crude_birth_rate: '',
		general_fertility_rate:'',
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
			this.UtilityService.setAlert('New Birth data has been Added', 'success')
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
		all:false
	}

	check(item){
		for(let checkbox in this.checked){
			this.checked[checkbox] = false
		}
		this.checked[item] = true
		this.getDataParams.gender = item	
	}

	chartData = {
		january:'',
		february:'',
		march:'',
		april:'',
		may:'',
		jun:'',
		july:'',
		august:'',
		september:'',
		october:'',
		november:'',
		december:'',
		birth_stat_id:''
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
	fetchData(){
		let data = {}
		for(let key in this.getDataParams){
			data[key] = this.getDataParams[key]
		}
		for(let key in this.checked){
			data[key] = this.checked[key]
		}
		this.hasSelectedData = true
		// this.BirthStatService.show( data['municipality'] ).subscribe(data => {

		// })
		
	}

}
