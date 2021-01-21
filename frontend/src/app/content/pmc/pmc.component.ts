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
	   this.fetch.municipality = event.target.options[event.target.options.selectedIndex].text		
	   this.LocationService.getBarangays(event.target.value).subscribe(data => {
		   this.barangays = data
		   this.hasData = true	
	   })
   }

   save(){		
		this.PmcService.postToMOnthController(this.data).subscribe(data => {
			this.PmcService.create(this.data).subscribe(data => {			
				this.UtilityService.setAlert('New Death Statistics Data has been added', 'success')
			})
		})
	}

	fetch = {
		municipality:'',
		barangay:''
	}

	editChartData = false
	updateChart(){
		this.data['barangay'] = this.fetch.barangay
		this.data['municipality'] = this.fetch.municipality	
		this.PmcService.postToMOnthController(this.data).subscribe(data => {	
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

	PMCData = {}
	fetchData(){
		this.PmcService.showPMC(
			this.getDataParams.municipality,
			this.getDataParams.barangay		
		).subscribe(data => {
			this.hasSelectedData = true
			this.PMCData = data.data	
			// data.incidence.forEach(element => {				
			// 	if(!this.DEATHRATEbarChartLabels.includes(element.year)){
			// 		this.DEATHRATEbarChartLabels.push(element.year)
			// 	}
			// 	this.DEATHRATEbarChartData[0].data.push(element.value)				
			// })
			data.month.forEach(element => {
				if(!this.MONTHbarChartLabels.includes(element.month)){
					this.MONTHbarChartLabels.push(element.month)					
				}
				if(this.checked.male){
					this.MONTHbarChartData[0].data.push(element.males)
	 				this.data.months[element.month] = element.males				
				}
				if(this.checked.female){
					this.MONTHbarChartData[0].data.push(element.females)
					this.data.months[element.month] = element.females				
				}
				if(this.checked.all){
					this.MONTHbarChartData[0].data.push(element.total)
					this.data.months[element.month] = element.total					
				}
			})
		},error =>{
			this.hasSelectedData = false
			this.UtilityService.setAlert('No data on this particular filter yet','info')
		})		
	}
	pmcTeam:any = {}
	savePMCTEAM(){
		this.pmcTeam['photo'] = this.pmcTeam.file
		this.PmcService.createTeams(this.pmcTeam).subscribe(data => {

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
		})
	}

	deleteTeam(id){
		this.PmcService.deletePMCTeams(id).subscribe(data => {
			this.UtilityService.setAlert('You have deleted a team member','info')
		})
	}



}
