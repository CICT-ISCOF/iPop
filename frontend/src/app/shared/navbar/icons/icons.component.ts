import { Component, OnInit } from '@angular/core';
import { UtilityService }  from '../../../utility.service'
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

	constructor(
		private UtilityService : UtilityService
	) {
		this.subscription = 	this.UtilityService.getNavText().subscribe(classname =>{		
			this.remvoeActiveIcons()		
			this.newNavbarText(classname)
		})
	 }

	ngOnInit(): void {
		
	}

	cms = {
		newContent:false,
		contentList:false,
		newQuickLink:false,
		quickLinks:false
	}

	newNavbarText(classname){
		if(classname == "Home"){
			this.icons.Home = true
		}

		if(classname == "Statistics"){
			this.icons.Statistics = true
		}

		if(classname == "Content Management"){
			// this.icons.CMS = true	
			for(let tab in this.cms){
				this.cms[tab] = false
			}
			this.cms[localStorage.getItem('cms-tab')] = true
		}

		if(classname == "Add CPDP Record"){
			this.icons.CPDB = true
		}

		if(classname == "Add Death Record"){
			this.icons.Deaths = true
		}

		if(classname == "Add Birth Record"){
			this.icons.Births = true
		}

		if(classname == "Add In-Migration Record"){
			this.icons.InMig = true
		}

		if(classname == "Add Out-Migration Record"){
			this.icons.OutMig = true
		}

		if(classname == "Add Marriage Record"){
			this.icons.Marriages = true
		}

		if (classname == "Records"){
			this.icons.Profiling = true
			
		}

		if ( classname == "New Administrator"){
			this.icons.Administrators = true
		}

		if ( classname == "Admin Accounts"){
			this.icons.AdminAccounts = true
		}

		if ( classname == "Logs"){
			this.icons.Logs = true
		}			
		
		if(classname == "Universal Search"){
			this.icons.UniversalSearch = true
		}

		if(classname == "Account Settings"){
			this.icons.Account = true
		}

		if(classname == "Back-Up and Restore"){
			this.icons.BackUpAndRestore = true
		}

		if(classname == "Help Center"){
			this.icons.HelpCenter = true
		}

		
	}
	

	subscription : Subscription

	icons ={
		Administrators:false,
		AdminAccounts:false,	
		Logs:false,

		Home:false,
		Statistics:false,
		CMS:false,

		Profiling:false,
		
		CPDB:false,
		Deaths:false,
		Births:false,
		InMig:false,
		OutMig:false,
		Marriages:false,

	
		UniversalSearch:false,
		Conversations:false,
		Account:false,
		BackUpAndRestore:false,
		HelpCenter:false,


	}

	remvoeActiveIcons(){
		for(let key in this.icons){
			this.icons[key] = false
		}
	}

}
