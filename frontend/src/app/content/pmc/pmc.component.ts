import Swal from 'sweetalert2';
import { UtilityService } from './../../utility.service';
import { PmcService } from './pmc.service';
import { LocationService } from './../../location.service';
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
		private UtilityService : UtilityService
	
	) { }
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
	pmcStat = this.data
	getDataParams = {
		barangay:'',
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
		labels:[],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
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
		console.log(this.coupleByAgeGroupData.data )
		console.log('jam lantawa ', this.coupleByAgeGroupData['data'])
		console.log(this.coupleByAgeGroupData)
		this.PmcService.storeCoupleByAgeGroup(this.coupleByAgeGroupData).subscribe(data =>{
			// Swal.fire('New PMC Couple Applicants by Age Group Data has been Added','','success')
			// this.fetchData()
		})
	}




	applicantsByEmploymentStatus = {
		labels:[],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	averageMonthlyIncome = {
		labels:[],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	knowLedgeOnFP = {
		labels:[],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
	}

	byCivilStatus = {
		labels:[],
		type:'bar',
		legend:true,
		data:[
			{ data: [], label: 'Female'},
			{ data: [], label: 'Male'},
		],
		options:{
			scaleShowVerticalLines: false,
			responsive: true
		}
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
		 
	getMuncipalities(){		
		this.LocationService.getMunicipalities().subscribe(data => {
		   this.municipalities = data			
	   })
   }
   
   getBarangays(event){	
	   this.data.municipality = event.target.options[event.target.options.selectedIndex].text
	   this.LocationService.getBarangays(event.target.value).subscribe(data => {
		   this.barangays = data
		   this.hasData = true	
	   })
   }

   save(){		
		this.data['barangay'] = "Sample"
		this.data['applicants_by_age_group'] = 1
		this.data['applicants_by_employment_status'] = 1
		this.data['applicants_by_income_class'] = 1
		this.data['applicants_by_knowledge_on_fp'] = 1
		this.PmcService.postToMOnthController(this.data).subscribe(data => {
			this.PmcService.create(this.data).subscribe(data => {			
				this.UtilityService.setAlert('New Death Statistics Data has been added', 'success')
			})
		})
	}


	editChartData = false
	updateChart(){
		this.PMCData['barangay'] = 'test'
		this.PMCData['year'] = this.data.year	
		this.data['year'] = this.data.year	
		this.PMCData['gender'] = 'Male'
		this.PMCData['type'] = 'PMOC'
		this.PmcService.postToMOnthController(this.PMCData).subscribe(data => {	
			this.editChartData = false		
			this.MONTHbarChartLabels = []
			this.MONTHbarChartData[0].data = []
			this.fetchData()
			this.UtilityService.setAlert('Chart has been updated','success')			
		})
	}


	getBarangaysandGet(event){	
		this.getDataParams.municipality = event.target.options[event.target.options.selectedIndex].text;	
		this.LocationService.getBarangays(event.target.value).subscribe(data => {
			this.barangays = data		
		})
	}

	PMCData:any = {}
	fetchData(){
		this.PmcService.showPMC(
			this.data.municipality,
			this.data.year		
		).subscribe(data => {
			this.hasSelectedData = true
			this.PMCData = data.data[0]	
			console.log(data.month)
			for(let index in data.month){
				if (!this.MONTHbarChartLabels.includes(data.month[index].month)) {
					this.MONTHbarChartLabels.push(data.month[index].month);
				}
				this.MONTHbarChartData[0].data.push(data.month[index].total);
			}
			this.PMCData.months = this.data.months		
			// this.PmcService.retrieveCoupleByAgeGroup().subscribe(data => {
			// 	this.coupleByAgeGroupData.data = data.data
			// 	console.log('pmc',data)
			// })
		
		},error =>{
			this.hasSelectedData = false
			this.UtilityService.setAlert('No data on this particular filter yet','info')
		})		
	}


	updateBottomChart(type){

	}











	pmcTeam:any = {}

	savePMCTEAM(){
		this.pmcTeam['photo'] = this.pmcTeam.file
		this.PmcService.createTeams(this.pmcTeam).subscribe(data => {
			this.ngOnInit()
			Swal.fire('Team Successfully Added','','success')
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
			this.UtilityService.setAlert(team['name'] + ' has been updated','success')	
			this.ngOnInit()
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



}
