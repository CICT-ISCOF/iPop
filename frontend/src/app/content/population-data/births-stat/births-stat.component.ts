import { UserService } from '../../../others/user.service';
import  Swal  from 'sweetalert2';
import { UtilityService } from '../../../others/utility.service';
import { BirthStatService } from './birth-stat.service';
import { LocationService } from '../../../others/location.service';
import { Component, OnInit } from '@angular/core';
import { groupBy, where } from '../../../helpers';
import { OfficialsService1 } from '../../officials-of/officials.service';
import * as birth from './birth-data'
import { FiltersService } from 'src/app/filters/filters.service';

@Component({
  selector: 'app-births-stat',
  templateUrl: './births-stat.component.html',
  styleUrls: ['./births-stat.component.scss'],
})
export class BirthsStatComponent implements OnInit {
	constructor(
		private LocationService: LocationService,
		private BirthStatService: BirthStatService,
		private UtilityService: UtilityService,
		private OfficialsService1 : OfficialsService1,
        private UserService: UserService,
        private FiltersService: FiltersService,
	) { 
		this.OfficialsService1.listen().subscribe(()=>this.CheckBarangaysAndMunicipalities())
        this.FiltersService.getYear().subscribe( (value:any) => this.getDataParams.year = value )
        this.FiltersService.getMunicipality().subscribe( ( value: any ) => { this.getDataParams.municipality = value.name } )
        this.FiltersService.getBarangay().subscribe( ( value: any ) => { this.getDataParams.barangay = value.name } )
    }


	isUser =  !this.UserService.isUser()
	ngOnInit(): void {
		for (let i = 2015; i <= 2050; i++) {
			this.years.push(i);
		}
		this.getMuncipalities();
		this.getSummary()
		this.getPopulationTotal()
		localStorage.removeItem('municipality') 
		localStorage.removeItem('barangay') 
	}

	popTtotal = {}
	getPopulationTotal(){
		this.BirthStatService.getPopulationTotal().subscribe(data => {
			this.popTtotal = data.total
		})
	}

	hasBarangaysAndMunicipalities = false

	CheckBarangaysAndMunicipalities(){
		if(localStorage.getItem('municipality') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		if(localStorage.getItem('barangay') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		this.hasBarangaysAndMunicipalities =  true
		return
	}
	
	back(){
		window.history.back()
	}
	
	municipalities: any = [];
	barangays: any = [];
	hasData = true;

    data = birth.data

	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	};
	MONTHbarChartLabels = [];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{ data: [], label: 'Females' },
		{ data: [], label: 'Males' },
		{ data: [], label: 'Total' }
	];

	// -------------

	TEENAGEBIRTHRATEbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	};
	TEENAGEBIRTHRATEbarChartLabels = [];
	TEENAGEBIRTHRATEbarChartType = 'line';
	TEENAGEBIRTHRATEbarChartLegend = true;
	TEENAGEBIRTHRATEbarChartData = [
		{ data: [], label: 'INCIDENCE OF TEENAGE BIRTHS' },
	];

	// -------------

	ILLEGITIMATEBIRTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	};
	ILLEGITIMATEBIRTHbarChartLabels = [];
	ILLEGITIMATEBIRTHbarChartType = 'line';
	ILLEGITIMATEBIRTHbarChartLegend = true;
	ILLEGITIMATEBIRTHbarChartData = [
		{ data: [], label: 'INCIDENCE OF ILLEGITIMATE BIRTHS' },
	];

	years = [];

	getDataParams = {
		barangay: '',
		municipality: '',
		year: '',
		gender: '',
	}

	checked = {
		male: true,
		female: false,
		all: false,
	}
 
	
	sumamry:any = {}
	getSummary(){
		this.BirthStatService.getSUmmary().subscribe(data => {
			this.sumamry = data
		})
	}
addData =false
	municipalityIsLoading = false
	getMuncipalities(){		
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalityIsLoading = false
			this.municipalities = data			
		})
	}
	barangayIsLoading = false
	getBarangaysandGet(event) {
		this.barangayIsLoading = true	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;
		this.LocationService.getBarangays(event.target.value).subscribe((data) => {
			this.barangays = data
			this.barangayIsLoading = false
		})
	}

	getBarangays(event){	
		this.barangayIsLoading = true	
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
			this.barangayIsLoading = false
		})
	} 

	update(){
		this.BirthStatService.create(this.birthSatistics).subscribe((data) => {
			Swal.fire(
				'Data has been updated',
				`Data on ${this.birthSatistics['barangay']}, ${this.birthSatistics['municipality']}  at year ${this.birthSatistics['year']} has been updated`,
				'success'
			)
		})
	}

	save() {
		this.data['months'] = []
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					this.data['months'] = this.data['monthsMale']
				}
				if(key == 'female'){
					this.data['months'] = this.data['monthsFemale']
				}
				if(key == 'all'){
					this.data['months'] = this.data['monthsTotal']
				}
			}
		}
		this.BirthStatService.postToMOnthController(this.data).subscribe((data) => {
			this.BirthStatService.create(this.data).subscribe((data) => {
				Swal.fire(
					'New Birth Statistics Data has been added',
					'',
					'success'
				)
			})
		})
		this.getSummary()
	}

	editChartData = false;
	isLoading = false
	updateChart() {
		this.isLoading = true
		this.data['barangay'] = this.getDataParams.barangay;
		this.data['municipality'] = this.getDataParams.municipality;
		this.data['year'] = this.getDataParams.year;
		this.data['gender'] = this.getDataParams.gender;
		this.data['months'] = []
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					this.data['months'] = this.data['monthsMale']
				}
				if(key == 'female'){
					this.data['months'] = this.data['monthsFemale']
				}
				if(key == 'all'){
					this.data['months'] = this.data['monthsTotal']
				}
			}
		}
		this.BirthStatService.postToMOnthController(this.data).subscribe((data) => {
			this.isLoading = false
			this.editChartData = false;
			this.MONTHbarChartLabels = [];
			this.MONTHbarChartData[0].data = [];
			this.fetchData();
			Swal.fire('Chart has been updated','', 'success');
		})
	}

	

	check(item) {
		for (let checkbox in this.checked) {
			this.checked[checkbox] = false;
		}
		this.checked[item] = true;
		this.getDataParams.gender = item;
	}

	birthSatistics = {};
	hasSelectedData = false;
	teenageBirth = [];
	legitimateBirth = [];
	fetchData() {
		if(
			this.getDataParams.municipality == "" || 
			this.getDataParams.municipality  == null ||
			this.getDataParams.barangay == "" || 
			this.getDataParams.barangay == null ||
			this.getDataParams.year == "" ||  
			this.getDataParams.barangay ==null 
		){
			return Swal.fire(
				'Filter Policy',
				'Please specify filters to get accurate data',
				'info'
			)
		}
		this.MONTHbarChartLabels = []
		this.MONTHbarChartData[0].data = []
		this.MONTHbarChartData[1].data = []
		this.MONTHbarChartData[2].data = []

		localStorage.setItem('municipality',this.getDataParams.municipality) 
		localStorage.setItem('barangay',this.getDataParams.barangay) 
		this.OfficialsService1.setTrigger()

		this.BirthStatService.showData(
			this.getDataParams.municipality,
			this.getDataParams.barangay,
			this.getDataParams.year,
			this.getDataParams.gender
		).subscribe(
		(data) => {
			this.hasSelectedData = true;
			this.birthSatistics = data.data;
			const incidences = groupBy(data.incidence, 'title');
				this.teenageBirth = incidences[0];
				this.legitimateBirth = incidences[1];
			for(let index in this.teenageBirth){		
				if(!this.TEENAGEBIRTHRATEbarChartLabels.includes(this.teenageBirth[index].year)){
					this.TEENAGEBIRTHRATEbarChartLabels.push(this.teenageBirth[index].year)
				}
				this.TEENAGEBIRTHRATEbarChartData[0].data.push(this.teenageBirth[index].value)
			}
			for(let index in this.legitimateBirth){		
				if(!this.ILLEGITIMATEBIRTHbarChartLabels.includes(this.legitimateBirth[index].year)){
					this.ILLEGITIMATEBIRTHbarChartLabels.push(this.legitimateBirth[index].year)
				}
				this.ILLEGITIMATEBIRTHbarChartData[0].data.push(this.legitimateBirth[index].value)
			}
			for(let index in data.month){		
				if (!this.MONTHbarChartLabels.includes(data.month[index].month)) {
					this.MONTHbarChartLabels.push(data.month[index].month);
				}
				this.MONTHbarChartData[0].data.push(data.month[index].females);
				this.data.monthsFemale[data.month[index].month] = data.month[index].females;
		
				this.MONTHbarChartData[1].data.push(data.month[index].males);
				this.data.monthsMale[data.month[index].month] = data.month[index].males;
		
				this.MONTHbarChartData[2].data.push(data.month[index].total);
				this.data.monthsTotal[data.month[index].month] = data.month[index].total;
			}
		},
		(error) => {
			this.hasSelectedData = false;
			Swal.fire(
				'Empty Data',
				'No data on this particular filter yet',
				'info'
			)
		})
		this.getSummary()
	}

	getChecked(){
		for(let key in this.checked){
			if(this.checked[key]){
				if(key == 'male'){
					return 'monthsMale'
				}
				if(key == 'female'){
					return 'monthsFemale'
				}
				if(key == 'all'){
					return 'monthsTotal'
				}
			}
		}
	}

	bottomChartData = {
		title: '',
		type: 'Birth',
		value: 0,
		years: [],
	};
	DeathRateData = false;
	saveBottomCharts(title) {
		// INCIDENCE OF TEENAGE BIRTHS
		// INCIDENCE OF ILLEGITIMATE BIRTHS
		this.bottomChartData.title = title;
		this.bottomChartData['barangay'] = this.getDataParams.barangay;
		this.bottomChartData['municipality'] = this.getDataParams.municipality;
		this.bottomChartData['gender'] = this.getDataParams.gender;
			this.BirthStatService.postToinsidence(this.bottomChartData).subscribe(
			(data) => {
				this.DeathRateData = true;
				this.UtilityService.setAlert(title + ' has been Updated', 'success');
				this.TEENAGEBIRTHRATEbarChartLabels = [];
				this.TEENAGEBIRTHRATEbarChartData[0].data = [];
				this.ILLEGITIMATEBIRTHbarChartLabels = [];
				this.ILLEGITIMATEBIRTHbarChartData[0].data = [];
				this.fetchData();
			}
		);
		
	}
}
