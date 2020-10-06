import { Component, OnInit } from '@angular/core';
import { Subscription }  from 'rxjs';
import { UtilityService }  from '../../utility.service'
import Swal from 'sweetalert2'
import { MediaQueryService } from '../../media-query.service'
import { DeviceService }  from '../../device.service'
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

		this.sidebarColor = this.MediaQueryService.getSize().subscribe(size => 			
			{this.hide = this.processSize(size)}
		) 

		this.sidebarColor = this.DeviceService.sidebarState().subscribe(state=>{
			this.hide = state
		})
	}

	processSize(size){
		if(size <= 600){
			return false
		}
		return true
	}

	hide = false
	

	ngOnInit(): void {
		this.sidebarListener()	
		if(this.account || this.account != undefined){
			this.getRecordCount()
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
		if(color == 'dark'){
			color = "var(--dark1)"
		}
		else if(color == 'green'){
			color = "var(--green1)"
		}
		else if(color == 'blue'){
			color = "var(--blue1)"
		}
		else if(color == 'orange'){
			color = "var(--orange1)"
		}
		else if(color == 'red'){
			color = "var(--red1)"
		}
		else if(color == 'violet'){
			color = "var(--violet1)"
		}
		else{
			color = "var(--blue1)"
		}	
		return color
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

	}

	
	removeActives(){		
		for(let key in this.icons){
			this.icons[key] = false
		}
		this.DeviceService.showSidebar(false)	
	}

	active(classname){	
		this.removeActives()
		if(classname == "Home"){
			this.icons.Home = true
		}
		else if(classname == "Statistics"){
			this.icons.Statistics = true
		}
		else if(classname == "CMS"){
			this.icons.CMS = true
			classname = "Content Management"
		}

		else if(classname == "CPDB"){
			this.icons.CPDB = true
			classname = "Add Census of Population Record"
		}
		else if(classname == "Deaths"){
			this.icons.Deaths = true
			classname = "Add Death Record"
		}
		else if(classname == "Births"){
			this.icons.Births = true
			classname = "Add Birth Record"
		}
		else if(classname == "InMig"){
			this.icons.InMig = true
			classname = "Add In-Migration Record"
		}
		else if(classname == "OutMig"){
			this.icons.OutMig = true
			classname = "Add Out-Migration Record"
		}
		else if(classname == "Marriages"){
			this.icons.Marriages = true
			classname = "Add Marriage Record"
		}

		else if (classname == "Profiling"){
			this.icons.Profiling = true
			classname = "Records"
		}

		else if ( classname == "Administrators"){
			this.icons.Administrators = true
			classname = "New Administrator"
		}

		else if ( classname == "Admin Accounts"){
			this.icons.AdminAccounts = true
			classname = "Admin Accounts"
		}
		else if ( classname == "Logs"){
			this.icons.Logs = true
		}

		this.UtilityService.setNavText(classname)
	}

	sidebarListener(){
		let url = document.createElement('a');
		url.href = window.location.href;
		const path = url.pathname	

		if(path == '/admin-accounts'){
			this.UtilityService.setSidebarItemasActive('Admin Accounts')
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


}
