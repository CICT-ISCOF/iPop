import { BirthStatService } from './../births-stat/birth-stat.service';
import { UserService } from '../../../others/user.service';
import { UtilityService } from '../../../others/utility.service';
import { DeathStatService } from './death-stat.service';
import { LocationService } from '../../../others/location.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { OfficialsService1 } from '../../officials-of/officials.service';

@Component({
  selector: 'app-deaths-stat',
  templateUrl: './deaths-stat.component.html',
  styleUrls: ['./deaths-stat.component.scss', './death-stat.responsive.scss'],
})
export class DeathsStatComponent implements OnInit {
	constructor(
		private LocationService: LocationService,
		private DeathStatService: DeathStatService,
		private UtilityService: UtilityService,
		private OfficialsService1 : OfficialsService1,
		private UserService : UserService,
		private BirthStatService : BirthStatService
	) { 
		this.OfficialsService1.listen().subscribe(()=>{
			this.CheckBarangaysAndMunicipalities()
		})
	}

	ngOnInit(): void {
		for (let i = 2015; i <= 2050; i++) {
			this.years.push(i);
		}
		this.getMuncipalities()
		localStorage.removeItem('municipality-ref') 
		localStorage.removeItem('barangay-ref') 
		this.getSummary()
		this.getPopulationTotal()
	}

	popTtotal = {}
	getPopulationTotal(){
		this.BirthStatService.getPopulationTotal().subscribe(data => {
			this.popTtotal = data.total
		})
	}

	isUser =  !this.UserService.isUser()
	hasBarangaysAndMunicipalities = false

	CheckBarangaysAndMunicipalities(){
		if(localStorage.getItem('municipality-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		if(localStorage.getItem('barangay-ref') == undefined){
			this.hasBarangaysAndMunicipalities = false
			return
		}
		this.hasBarangaysAndMunicipalities =  true
		return
	}
	municipalities: any = []
	barangays: any = []
	hasData = true;

	data = {
		municipality: 'Select Municipality',
		barangay: '',
		year: '',
		gender: 'Male',
		total_live_births: '',
		crude_death_rate: '',
		general_fertility_rate: '',
		monthsFemale: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
		},
		monthsMale: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
	 		June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
			
		},
		monthsTotal: {
			January: 0,
			February: 0,
			March: 0,
			April: 0,
			May: 0,
			June: 0,
			July: 0,
			August: 0,
			September: 0,
			October: 0,
			November: 0,
			December: 0,
			
		},
		type: 'Death',
	}
	
	checked = {
		male: true,
		female: false,
		all: false,
	}

	hasSelectedData = false
	deathStatistics = {}

	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	}

	

	DEATHRATEbarChartLabels = [];
	DEATHRATEbarChartData = [{ data: [], label: 'Crude Death Rate' }];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	crudeDeathRateData = {
		title: 'Crude Death Rate',
		type: 'Death',
		value: 0,
		years: [],
	}

	DEATHRATEbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true,
	}

	DEATHRATEbarChartType = 'line'
	DEATHRATEbarChartLegend = true

	years = []

	getDataParams = {
		barangay: '',
		municipality: '',
		year: '',
		gender: '',
	}


	summary = {}
	getSummary(){
		this.DeathStatService.getSummary().subscribe(data => {
			this.summary = data
			console.log(data)
		})
	}

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
		this.DeathStatService.create(this.deathStatistics).subscribe((data) => {
			Swal.fire(
				'Data has been updated',
				`Data on ${this.deathStatistics['barangay']}, ${this.deathStatistics['municipality']}  at year ${this.deathStatistics['year']} has been updated`,
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
		this.DeathStatService.postToMOnthController(this.data).subscribe((data) => {
			this.DeathStatService.create(this.data).subscribe((data) => {
				Swal.fire(
					'New Death Statistics Data has been added',
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
		this.DeathStatService.postToMOnthController(this.data).subscribe((data) => {
			this.isLoading = false
			this.editChartData = false;
			this.MONTHbarChartLabels = [];
			this.MONTHbarChartData[0].data = [];
			this.fetchData();
			Swal.fire('Chart has been updated','', 'success');
		});
	}

	back(){
		window.history.back()
	}

	check(item) {
		for (let checkbox in this.checked) {
			this.checked[checkbox] = false;
		}
		this.checked[item] = true;
		this.getDataParams.gender = item;
	}

	MONTHbarChartLabels = []
	
	MONTHbarChartData = [
		{ data: [], label: 'Females' },
		{ data: [], label: 'Males' },
		{ data: [], label: 'Total' }
	]
	
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

		localStorage.setItem('municipality-ref',this.getDataParams.municipality) 
		localStorage.setItem('barangay-ref',this.getDataParams.barangay) 
		this.OfficialsService1.setTrigger()


		this.DeathStatService.show(
			this.getDataParams.municipality,
			this.getDataParams.barangay,
			this.getDataParams.year,
			this.getDataParams.gender
			).subscribe(
				(data) => {
					this.hasSelectedData = true;
					this.deathStatistics = data.data;
					data.incidence.forEach((element) => {
						if (!this.DEATHRATEbarChartLabels.includes(element.year)) {
							this.DEATHRATEbarChartLabels.push(element.year);
						}
						this.DEATHRATEbarChartData[0].data.push(element.value)
					})
					data.month.forEach((element) => {
					if (!this.MONTHbarChartLabels.includes(element.month)) {
						const month = element.month
							.split('')
							.filter((m, i) => i <= 2)
							.join('');
						this.MONTHbarChartLabels.push(month);
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
				})
			},
			(error) => {
				this.hasSelectedData = false;
				Swal.fire(
					'Empty Data',
					'No data on this particular filter yet',
					'info'
				)
			}
		)
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
	

	DeathRateData = false;
	saveCrudDEathRate() {
		this.crudeDeathRateData['barangay'] = this.getDataParams.barangay;
		this.crudeDeathRateData['municipality'] = this.getDataParams.municipality;
		this.crudeDeathRateData['gender'] = this.getDataParams.gender;
		this.DeathStatService.postToinsidence(this.crudeDeathRateData).subscribe(
			(data) => {
				this.DeathRateData = true;
				this.UtilityService.setAlert(
					'Crude Death Rate has been Updated',
					'success'
				)
				this.DEATHRATEbarChartLabels = [];
				this.DEATHRATEbarChartData[0].data = [];
				this.fetchData();
			}
		)
	}
}
