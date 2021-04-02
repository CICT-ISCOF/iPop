import { UserService } from '../../user.service';
import Swal from 'sweetalert2';
import { UtilityService } from '../../utility.service';
import { PmcService } from './pmc.service';
import { LocationService } from '../../location.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pmc',
  templateUrl: './pmc.component.html',
  styleUrls: ['./pmc.component.scss']
})
export class PmcComponent implements OnInit {
	
   	constructor(
		private LocationService : LocationService,
		private PmcService : PmcService,
		private UtilityService : UtilityService,
		private UserService : UserService
	
	) { }

	back(){
		window.history.back()
	}
	isUser =  !this.UserService.isUser()
	
	numberOfSessions = false
	municipalities:any = [] 
	barangays:any = [] 
	hasData = false	
	data:any = {
		municipality:'',
		year:'',
		sessions:'',
		brangay:'test',
		gender:'Male',
		oriented_couples:'',
		individuals_interviewed:'',
		applicants_by_age_group:'',
		applicants_by_employment_status:'',
		applicants_by_income_class:'',
		applicants_by_knowledge_on_fp:'',
		months:{
			January:0,
			February:0,
			March:0,
			April:0,
			May:0,
			June:0,
			July:0,
			August:0,
			September:0,
			October:0,
			November:0,
			December:0,
		},	
		type:'PMOC'
	}
	months = {
		January:0,
		February:0,
		March:0,
		April:0,
		May:0,
		June:0,
		July:0,
		August:0,
		September:0,
		October:0,
		November:0,
		December:0,
	}	
	pmcStat = this.data
	getDataParams = {
		barangay:'test',
		municipality:'',
		year:'',
		gender:''
	}
	checked = {
		male:false,
		female:false,
		all:true
	}		

	hasSelectedData = false
	pmCData = {}
	MONTHbarChartOptions = {
		scaleShowVerticalLines: false,
		responsive: true
	};
	MONTHbarChartLabels = [];
	MONTHbarChartType = 'bar';
	MONTHbarChartLegend = true;
	MONTHbarChartData = [
		{data: [], label: 'Data'},
	
	]
	wantsToAddPMCTeam = false
	years = []

	coupleByAgeGroup = {
		labels:['15-19','20-24','25-29 ','30-34','35-39','40-44','45 & UP'],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
			{ data: [], label: 'Total'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	coupleByAgeGroupData:any = {
		data:{}
	}

	coupleByAgeGroupDataSave(){
		this.coupleByAgeGroupData['barangay'] = 'test'
		this.coupleByAgeGroupData['year'] = this.data.year	
		this.coupleByAgeGroupData['year'] = this.data.year	
		this.coupleByAgeGroupData['municipality'] = this.data.municipality	|| this.PMCData.muncipality
		this.PmcService.storeCoupleByAgeGroup(this.coupleByAgeGroupData).subscribe(data =>{
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}

	applicantsByEmploymentStatus = {
		labels:['Students','Employed','Unemployed'],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
			{ data: [], label: 'Total'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	applicantsByEmploymentStatusData:any = {
		data:{}
	}

	saveApplicantsByEmploymentStatus(){
		this.applicantsByEmploymentStatusData['barangay'] = 'test'
		this.applicantsByEmploymentStatusData['year'] = this.data.year	
		this.applicantsByEmploymentStatusData['year'] = this.data.year	
		this.applicantsByEmploymentStatusData['municipality'] = this.data.municipality	|| this.PMCData.muncipality
		this.PmcService.storeApplicantsByEmploymentStatus(this.applicantsByEmploymentStatusData).subscribe(data =>{
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}


	averageMonthlyIncome = {
		labels:[
			'No Income',
			'Under ₱ 5,000 ',
			'₱ 5,000 - ₱ 9,999',
			'₱ 10,000 - ₱ 14,999',
			'₱ 15,000 - ₱ 19,999',
			' 20,000 - ₱ 24,999',
			'₱ 25,000 Up'
		],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
			{ data: [], label: 'Total'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	averageMonthlyIncomeData:any = {
		data:{}
	}

	saveAverageMonthlyIncome(){
		this.averageMonthlyIncomeData['barangay'] = 'test'
		this.averageMonthlyIncomeData['year'] = this.data.year	
		this.averageMonthlyIncomeData['year'] = this.data.year	
		this.averageMonthlyIncomeData['municipality'] = this.data.municipality	|| this.PMCData.muncipality
		this.PmcService.storeAverageMonthlyIncome(this.averageMonthlyIncomeData).subscribe(data =>{
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}

	knowLedgeOnFP = {
		labels:[ 	],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
			{ data: [], label: 'Total'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	knowLedgeOnFPData:any = {
		data:{}
	}

	saveknowLedgeOnFP(){
		this.knowLedgeOnFPData['barangay'] = 'test'
		this.knowLedgeOnFPData['year'] = this.data.year	
		this.knowLedgeOnFPData['year'] = this.data.year	
		this.knowLedgeOnFPData['municipality'] = this.data.municipality	|| this.PMCData.muncipality
		this.PmcService.storeknowLedgeOnFP(this.knowLedgeOnFPData).subscribe(data =>{
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}

	byCivilStatus = {
		labels:['Single','Co-Habiting/Live-in','Widow/er','Divorced/Separated'],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
			{ data: [], label: 'Average'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	byCivilStatusData:any = {
		data:{}
	}

	savebyCivilStatus(){
		this.byCivilStatusData['barangay'] = 'test'
		this.byCivilStatusData['year'] = this.data.year	
		this.byCivilStatusData['year'] = this.data.year	
		this.byCivilStatusData['municipality'] = this.data.municipality	|| this.PMCData.muncipality
		this.PmcService.storebyCivilStatus(this.byCivilStatusData).subscribe(data =>{
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}

	ngOnInit(): void {
		for(let i = 2015;i < 2100;i++){
			this.years.push(i)
		}
		this.getMuncipalities()
		this.retrieveTeams()
	}

	triggerFileInput(id){
		document.getElementById(id).click()
	}
	activePMCTEAM = {}

	toggleProgram(id){		
		this.activePMCTEAM[id] == true ?  this.activePMCTEAM[id] = false : this.activePMCTEAM[id] = true
	}

	placeholder:any = '../../../../assets/avatars/boy-blue.png'
	readURL(file, event){	
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {		
				this.placeholder = (<FileReader>event.target).result
				this.pmcTeam.file =  (<FileReader>event.target).result
			}
		}		
	}	
		 
	municipalityIsLoading = false
	getMuncipalities(){		
		this.municipalityIsLoading = true
		this.LocationService.getMunicipalities().subscribe(data => {
			this.municipalities = data			
			this.municipalityIsLoading = false
		})
	}

	getBarangays(event){	
		this.data.municipality = event.target.options[event.target.options.selectedIndex].text
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data
		})
	}

	save(){		
		this.data['barangay'] = "test"
		this.data['applicants_by_age_group'] = 1
		this.data['applicants_by_employment_status'] = 1
		this.data['applicants_by_income_class'] = 1
		this.data['applicants_by_knowledge_on_fp'] = 1
		if(this.data['oriented_couples'] == 0 || this.data['oriented_couples'] == undefined){
			this.data['oriented_couples'] =  this.PMCData['oriented_couples']
			this.data['individuals_interviewed'] = this.PMCData['individuals_interviewed'] 
			this.data['oriented_couples'] =   this.PMCData['oriented_couples'] 
			this.data['sessions'] =  	this.PMCData['sessions']  
		}
		this.data['months'] = {}
		this.data['months'] = this.months

		this.PmcService.create(this.data).subscribe(data => {			
			this.PmcService.postToMOnthController(this.data).subscribe(()=>{})
			this.UtilityService.setAlert('New Death Statistics Data has been added', 'success')
		})
	}

	editChartData = false
	updateChart(){
		this.PMCData['barangay'] = 'test'
		this.PMCData['year'] = this.data.year	
		this.data['year'] = this.data.year	
		this.PMCData['gender'] = 'Male'
		this.PMCData['type'] = 'PMOC'
		this.PMCData['months'] = this.months
		this.PmcService.postToMOnthController(this.PMCData).subscribe(data => {	
			this.editChartData = false		
			this.MONTHbarChartLabels = []
			this.MONTHbarChartData[0].data = []
			this.fetchData()
			return Swal.fire('Chart has been successfully updated','','success')
		})
	}

	getBarangaysandGet(event){	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
		})
	}

	PMCData:any = {
		months:{}
	}
	

	pmcTeam:any = {}

	savePMCTEAM(){
		this.pmcTeam['photo'] = this.pmcTeam.file
		this.PmcService.createTeams(this.pmcTeam).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Team Successfully Added','','success')
			this.wantsToAddPMCTeam = false
		},
		(error) => {
			for (let message in error.error.errors) {
			  this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
		})
	}

	teams = []
	retrieveTeams(){
		this.PmcService.retrieveTeams().subscribe(data => {
			this.teams = data
		})
	}

	updatePMTeam(team){	
		delete team["photo"];
		this.PmcService.updateTeams(team, team['id']).subscribe(data => {
			this.ngOnInit()
			Swal.fire(`${team['name']} has been updated`,'','success')
			for(let index in this.activePMCTEAM){
				this.activePMCTEAM[index] = false 
			}
		})
	}

	deleteTeam(id){
		Swal.fire({
			title: 'Are you sure you want to delete this team member?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Delete',
			cancelButtonText: 'Later'
		  }).then((result) => {
			if (result.value) {
				this.PmcService.deletePMCTeams(id).subscribe(data => {
					this.UtilityService.setAlert('You have deleted a team member','info')	
					this.ngOnInit()
				})
			} 
		})	
	}


	// -------------bottom charts-----------------

	clearCharts(){
		const charts = ['averageMonthlyIncome','applicantsByEmploymentStatus','coupleByAgeGroup','knowLedgeOnFP','byCivilStatus']
		const chartToEdit = ['coupleByAgeGroupEdit','employmentStatusEdit','knowledgeInFP','byCivilStatusEdit','averageMonthlyIncomeEdit']
		for(let chart of chartToEdit){
			this[chart] = false
		}
		for(let chart of charts){
			for(let i = 0; i < 3;i++){
				this[chart].data[i].data = []
			}
		}
		
	}

	coupleByAgeGroupEdit = false
	employmentStatusEdit = false
	knowledgeInFP = false
	byCivilStatusEdit = false
	averageMonthlyIncomeEdit = false


	fetchCharts(){
		this.clearCharts()
		this.getPMCAgeGroup()
		this.getPMCEES()
		this.getAverageMonthlyIncome()
		this.getknowLedgeOnFP()
		this.getebyCivilStatus()
		this.hasData = true	
	}

	getPMCAgeGroup(){
		this.PmcService.retrieveCoupleByAgeGroup(this.data.municipality, this.data.year).subscribe(data => {
			data = data[0]
			this.coupleByAgeGroup.data[0].data = [
				parseInt(data['15_to_19_female']),
				parseInt(data['20_to_24_female']),
				parseInt(data['25_to_29_female']),
				parseInt(data['30_to_34_female']),
				parseInt(data['35_to_39_female']),
				parseInt(data['40_to_44_female']),
				parseInt(data['45_and_above_female'])
			]
			this.coupleByAgeGroup.data[1].data = [
				parseInt(data['15_to_19_male']),
				parseInt(data['20_to_24_male']),
				parseInt(data['25_to_29_male']),
				parseInt(data['30_to_34_male']),
				parseInt(data['35_to_39_male']),
				parseInt(data['40_to_44_male']),
				parseInt(data['45_and_above_male'])
			]
			this.coupleByAgeGroup.data[2].data = [
				parseInt(data['15_to_19_female']) +  parseInt(data['15_to_19_male']) ,
				parseInt(data['20_to_24_female']) +  parseInt(data['20_to_24_male']) ,
				parseInt(data['25_to_29_female']) +  parseInt(data['25_to_29_male']),
				parseInt(data['30_to_34_female']) +  parseInt(data['30_to_34_male']) ,
				parseInt(data['35_to_39_female']) +  parseInt(data['35_to_39_male']),
				parseInt(data['40_to_44_female']) +  parseInt(data['40_to_44_male']),
				parseInt(data['45_and_above_female']) + parseInt(data['45_and_above_male'])
			]
			this.coupleByAgeGroupData = data 
		})
	}

	getPMCEES(){
		this.PmcService.retrieveApplicantsByEmploymentStatus(this.data.municipality, this.data.year).subscribe(data => {
			data = data[0]
			this.applicantsByEmploymentStatus.data[0].data = [data.student_female,data.employed_female,data.not_employed_female]
			this.applicantsByEmploymentStatus.data[1].data = [data.student_male,data.employed_male,data.not_employed_male]
			this.applicantsByEmploymentStatus.data[2].data = [
				parseInt(data.student_female) + parseInt(data.student_male) ,
				parseInt(data.not_employed_female) + parseInt(data.not_employed_male),
				parseInt(data.employed_male) + parseInt(data.employed_female)
			]
			this.applicantsByEmploymentStatusData = data 
		})
	}

	getAverageMonthlyIncome(){
		this.PmcService.retrieveAverageMonthlyIncome(this.data.municipality, this.data.year).subscribe(data => {
			data = data[0]
			this.averageMonthlyIncome.data[0].data = [
				parseInt(data.no_income_male),
				parseInt(data.under_5k_male),
				parseInt(data['5k_to_10k_female']),
				parseInt(data['10k_to_15k_female']),
				parseInt(data['15k_to_20k_female']),
				parseInt(data['20k_to_25k_female']),
				parseInt(data['above_25k_female'])
			]
			this.averageMonthlyIncome.data[1].data = [
				parseInt(data.no_income_male),
				parseInt(data.under_5k_male),
				parseInt(data['5k_to_10k_male']),
				parseInt(data['10k_to_15k_male']),
				parseInt(data['15k_to_20k_male']),
				parseInt(data['20k_to_25k_male']),
				parseInt(data['above_25k_male'])
			]
			this.averageMonthlyIncome.data[2].data = [
				parseInt(data.no_income_male) + parseInt(data.no_income_female),
				parseInt(data.under_5k_male) + parseInt(data.under_5k_female),
				parseInt(data['5k_to_10k_male']) + parseInt(data['5k_to_10k_female']),
				parseInt(data['10k_to_15k_male']) + parseInt(data['10k_to_15k_female']),
				parseInt(data['15k_to_20k_male']) + parseInt(data['15k_to_20k_female']),
				parseInt(data['20k_to_25k_male']) + parseInt(data['20k_to_25k_female']),
				parseInt(data['above_25k_male']) + parseInt(data['above_25k_female']),
			]
			this.averageMonthlyIncomeData = data
		})
	}

	getknowLedgeOnFP(){
		this.PmcService.retrieveknowLedgeOnFP(this.data.municipality, this.data.year).subscribe(data => {
			data = data[0]	
			this.knowLedgeOnFP.data[0].data = [data.females]
			this.knowLedgeOnFP.data[1].data = [data.males]
			this.knowLedgeOnFP.data[2].data = [
				parseInt(data.males) + parseInt(data.females) 
			]
			this.knowLedgeOnFP.labels = [`Knowledege on FP by ${this.data.municipality} on year ${this.data.year}`]
			this.knowLedgeOnFPData = data
		})
	}

	getebyCivilStatus(){
		this.PmcService.retrievebyCivilStatus(this.data.municipality, this.data.year).subscribe(data => {	
			data = data[0]
			this.byCivilStatus.data[0].data = [
				parseInt(data.single_female),
				parseInt(data.live_in_female),
				parseInt(data.widow_female),
				parseInt(data['separated_female']),
			]
			this.byCivilStatus.data[1].data = [
				parseInt(data.single_male),
				parseInt(data.live_in_male),
				parseInt(data.widow_male),
				parseInt(data['separated_male']),
			]
			this.byCivilStatus.data[2].data = [
				(parseInt(data.single_male) + parseInt(data.single_female))  /2 ,
				(parseInt(data.live_in_female) + parseInt(data.live_in_female))/ 2 ,
				(parseInt(data.widow_male) + parseInt(data.widow_female))/ 2 ,
		
				(parseInt(data.separated_male) + parseInt(data.separated_female))/ 2 ,
			]
			this.byCivilStatusData = data
		})
	}
	
	// ------all--------

	fetchData(){
		this.PmcService.showPMC(
			this.data.municipality,
			this.data.year		
		).subscribe(data => {
			this.PMCData = data.data[0] 
			console.log(data)
			for(let index in data.month){
				this.months[data.month[index].month] = data.month[index].total
			}
			console.log('bago na months',this.months)
			if( data.data[0] == null || data.data.length == 0){
				this.hasData = false	
				return Swal.fire('No data on this filters','','info')
			}
			else{
				this.hasData = true
		
				if(data.month == undefined){
				}
				else{
					for(let index in data.month){
						if (!this.MONTHbarChartLabels.includes(data.month[index].month)) {
							this.MONTHbarChartLabels.push(data.month[index].month);
						}
						this.MONTHbarChartData[0].data.push(data.month[index].total || 0);
					}
				}
				this.fetchCharts()
			}
		},error =>{
			this.hasData = false
			this.UtilityService.setAlert('No data on this particular filter yet','info')
		})		
	}


}
