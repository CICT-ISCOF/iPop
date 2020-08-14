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
			if(classname == "Home"){
				this.icons.Home = true
			}
			else if(classname == "Statistics"){
				this.icons.Statistics = true
			}
			else if(classname == "Content Management"){				
				this.icons.CMS = true				
			}
	
			else if(classname == "Add CPDP Record"){
				this.icons.CPDB = true			
			}
			else if(classname == "Add Death Record"){
				this.icons.Deaths = true			
			}
			else if(classname == "Add Birth Record"){
				this.icons.Births = true			
			}
			else if(classname == "Add In-Migration Record"){
				this.icons.InMig = true			
			}
			else if(classname == "Add Out-Migration Record"){
				this.icons.OutMig = true			
			}
			else if(classname == "Add Marriage Record"){
				this.icons.Marriages = true			
			}	
			
			else if(classname == "New Administrator"){
				this.icons.Administrators = true				
			}
			else if(classname ==  "Admin Accounts"){
				this.icons.AdminAccounts = true				
			}

		
	
			else if(classname == "Help Center"){
				this.icons.HelpCenter = true			
			}
			else if(classname == "Account Settings"){
				this.icons.Account = true			
			}
	
			else if(classname == "Back-Up and Restore"){
				this.icons.BackUpAndRestore = true		
			}
			else if(classname == "Conversations"){
				this.icons.Conversations = true		
			}

			
			else{
				this.icons.Profiling = true			
			}
		})
	 }

	ngOnInit(): void {
		
	}

	subscription : Subscription

	icons ={
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

		Administrators:false,
		AdminAccounts:false,	
		
		Conversations:false,
		Account:false,
		BackUpAndRestore:false,
		HelpCenter:false,

	}

	remvoeActiveIcons(){
		this.icons ={
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
	
			Administrators:false,
			AdminAccounts:false,		

			Conversations:false,
			Account:false,
			BackUpAndRestore:false,
			HelpCenter:false,
		}
	}

}
