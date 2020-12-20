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
	
	municipalities:any = [] 
	barangays:any = [] 
	
	

	data:any = {
		municipality:'',
		barangay:'',
		sessions:'',
		oriented_couples:'',
		individuals_interviewed:'',
		applicants_by_age_group:'',
		applicants_by_employment_status:'',
		applicants_by_income_class:'',
		applicants_by_knowledge_on_fp:'',
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
		{data: [65, 59, 80, 81, 14, 55, 61, 11, 14, 55, 61, 61], label: 'Number of Couples'},
	
	]

	wantsToAddPMCTeam = false

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

	ngOnInit(): void {
		this.getMuncipalities()
		this.retrieveTeams()
	}



	save(){		
		this.PmcService.create(this.data).subscribe(data => {
			
			this.UtilityService.setAlert(`New PMOC in municipality of ${this.data['municipality']} barangay ${this.data['barangay']} has been added`,'success')
			for(let key in this.data){
				this.data[key]= ""
			}
		})
	}

	hasData = false
	fetch ={
		municipality:'',
		barangay:''
	}

	pmcStat:any
	fetchData(){
		this.hasData = true
		this.PmcService.retrieve(this.fetch.municipality, this.fetch.barangay).subscribe(data=>{
			this.pmcStat = data.data[0]
		})
	}

	update(){
		this.PmcService.create(this.pmcStat).subscribe(data=>{
			this.ngOnInit()
		})
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


	// --------- pmc Team -------

	pmcTeam:any = {
		name:'',
		position:'',
		file:'',
	}
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



}
