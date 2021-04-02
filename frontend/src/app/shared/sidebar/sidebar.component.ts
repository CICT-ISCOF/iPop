import { Component, OnInit } from '@angular/core';
import { Subscription }  from 'rxjs';
import { UtilityService }  from '../../others/utility.service'
import Swal from 'sweetalert2'
import { MediaQueryService } from '../../others/media-query.service'
import { DeviceService }  from '../../others/device.service'
import { CountService } from '../../services/count.service'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

	constructor(
		private UtilityService: UtilityService,
		private MediaQueryService : MediaQueryService,
		private DeviceService : DeviceService,
		private CountService : CountService
	) {
		this.findRoute()
		this.sidebarColor = this.UtilityService.geColor().subscribe(color => {
			this.sidebar.color = this.formatColorFromLocalStorage(color)
		})

		this.sidebarColor = this.UtilityService.geBackground().subscribe(boolean => {
			this.sidebar.background = this.formatStringtoBoolean(boolean)
		})

		this.sidebarColor = this.UtilityService.getImage().subscribe(image => {
			this.sidebar.backgroundImage = this.formatImage(image)
		})

		this.sidebarColor = this.MediaQueryService.getSize().subscribe(size => {
			this.hide = this.processSize(size)		
		}
			
		) 

		this.sidebarColor = this.DeviceService.sidebarState().subscribe(state=>{
			this.hide = state
		})
	}

	processSize(size){
		if(size <= 1024){
			return false
		}
		return true
	}

	dropDown = { 
		demographics:false,
		addData:false,
		RPFP:false,
		AHYD:false,
		Statistics:false
	}

	hide = false
	ngOnInit(): void {
		this.sidebarListener()	
		if(this.account || this.account != undefined){
			this.getRecordCount()
		}
		
		if(localStorage.getItem('sidebar-dropdwons') && localStorage.getItem('sidebar-dropdwons') != undefined){
			this.dropDown = JSON.parse(localStorage.getItem('sidebar-dropdwons'))
		}
	}
 
	sidebarColor : Subscription

	sidebar = {
		background : this.formatStringtoBoolean(localStorage.getItem('sidebar-background')),
		backgroundImage : this.formatImage(localStorage.getItem('sidebar-image')),
		color : this.formatColorFromLocalStorage(localStorage.getItem('color')),	
	}

	account = JSON.parse(localStorage.getItem('user-data'))	

	formatImage(image){
		if(image == null){
			image = '/wallpapers/land-3.jpg'
		}
		let imageDirectory ='../../../assets'
		image = imageDirectory + image 	
		return image
	}

	formatStringtoBoolean(boolean){
		boolean == 'true' ?  boolean = true : boolean = false 
		return boolean
	}

	formatColorFromLocalStorage(color){			
		let sideBarColor =   "var(--" + color +")"		
		return  sideBarColor
	}
	
	subscription : Subscription
	
	icons = {
		Administrators:false,
		AdminAccounts:false,
		Logs:false,

		Home:true,
		Statistics:false,
		CMS:false,

		Profiling:false,
	
	
		CPDB:false,
		Births:false,
		Deaths:false,
		InMig:false,
		OutMig:false,
		Marriages:false,

		BirthStat:false,
		DeathStat:false,
		MigrationStat:false,

		PMOC:false,
		MPCFDC:false,

		TeenCenters:false,
		IssuesAndConerns:false,

		Others:false,
		Roles:false,

	}
	
	active(classname){	
		for(let key in this.icons){
			this.icons[key] = false
		}
		this.DeviceService.showSidebar(false)	
		this.icons[classname] = true
		

		if(classname == "CMS"){
			classname = "Content Management"
		}
		if(classname == "Statistics"){
			classname = "Population Data"
		}
		if(classname == "CPDB"){		
			classname = "Add Census of Population Record"
		}
		if(classname == "Deaths"){			
			classname = "Add Death Record"
		}
		if(classname == "Births"){			
			classname = "Add Birth Record"
		}
		if(classname == "InMig"){			
			classname = "Add In-Migration Record"
		}
		if(classname == "OutMig"){			
			classname = "Add Out-Migration Record"
		}
		if(classname == "Marriages"){			
			classname = "Add Marriage Record"
		}
		if (classname == "Profiling"){
			classname = "Records"
		}
		if (classname == "Administrators"){			
			classname = "New Administrator"
		}	

		if (classname == "PMC"){			
			classname = "Pre Marriage Counseling"
		}	

		if (classname == "AHYD"){			
			classname = "Adolescent Health Youth Development"
		}	
		
		if( classname == 'AdminAccounts' ){
			classname == 'Admin Accounts'
		}
		
		this.UtilityService.setNavText(classname)
	}

	sidebarListener(){
		let url = document.createElement('a');
		url.href = window.location.href;
		const path = url.pathname	

		if(path == '/admin-accounts'){
			this.UtilityService.setSidebarItemasActive('AdminAccounts')
		}
		else if(path == '/logs'){
			this.UtilityService.setSidebarItemasActive('Logs')		
		}

		else if(path == '/new-admin'){
			this.UtilityService.setSidebarItemasActive('Administrators')		
		}





		else if(path == '/home'){
			this.UtilityService.setSidebarItemasActive('Home')
		}
		else if(path == '/statistics'){
			this.UtilityService.setSidebarItemasActive('Statistics')
		}
		else if(path == '/cms'){
			this.UtilityService.setSidebarItemasActive('CMS')
		}


		else if(path == '/profiling'){
			this.UtilityService.setSidebarItemasActive('Profiling')
		}


		else if(path == '/cpdb'){
			this.UtilityService.setSidebarItemasActive('CPDB')
		}	
		else if(path == '/deaths'){
			this.UtilityService.setSidebarItemasActive('Deaths')
		}	
		else if(path == '/births'){
			this.UtilityService.setSidebarItemasActive('Births')
		}	
		else if(path == '/in-mig'){
			this.UtilityService.setSidebarItemasActive('InMig')
		}	
		else if(path == '/out-mig'){
			this.UtilityService.setSidebarItemasActive('OutMig')
		}	
		else if(path == '/marriages'){
			this.UtilityService.setSidebarItemasActive('Marriages')
		}	


		else if(path == '/user-manual'){
			this.UtilityService.setSidebarItemasActive('Help Center')
		}
		else if(path == '/account'){
			this.UtilityService.setSidebarItemasActive('Account Settings')
		}	
		else if(path == '/backup-adn-restore'){
			this.UtilityService.setSidebarItemasActive('Back-Up and Restore')
		}
		else if(path == '/conversations'){
			this.UtilityService.setSidebarItemasActive('Conversations')
		
		}	
		else if(path == '/pmc'){
			this.UtilityService.setSidebarItemasActive('PMC')
		
		}	
		else if(path == '/ahyd'){
			this.UtilityService.setSidebarItemasActive('AHYD')
		
		}	
		

	
	}

	findRoute(){
		this.subscription = this.UtilityService.getActiveItemonSidebar().subscribe(data =>{
		
			this.active(data)	
		})
	}

	pendingCount = 0
	getRecordCount(){		
		this.CountService.getOverlAllCount().subscribe(data => {		
			this.pendingCount = data
		})
	}

	

	showDropDown(item){		
		this.dropDown[item] = this.dropDown[item] == true ? false :true
		localStorage.setItem('sidebar-dropdwons',JSON.stringify(this.dropDown))
	}


}
