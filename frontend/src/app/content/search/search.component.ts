import { Component, OnInit } from '@angular/core';
import { CpdbService } from '../cpdb/cpdb.service'
import { DeathsService } from '../deaths/deaths.service'
import { BirthsService } from '../births/births.service'
import { OutMigService } from '../out-mig/out-mig.service'
import { InMigService } from '../in-mig/in-mig.service'
import { MarriagesService } from '../marriages/marriages.service'
import { SearchService } from './search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    constructor(
		private CpdbService : CpdbService,
		private DeathsService : DeathsService,
		private BirthsService : BirthsService,
		private OutMigService : OutMigService,
		private InMigService : InMigService,
		private MarriagesService : MarriagesService, 
		private SearchService :SearchService
	) { }

    ngOnInit(): void {
		const tab = localStorage.getItem('search-tab')
      	if( tab && tab != undefined){
			this.changeTab(tab)
		}		
	}
	
	suggestions = []
	keyword = ''

    tabs:any = {
		  cpdb:true,
		  deaths:false,
		  births:false,
		  inmigration:false,
		  outmigration:false,
		  marriages:false,
	}
	
	changeTab(chosenTab){
		for(let tab in this.tabs){
			this.tabs[tab] = false
		}
		this.tabs[chosenTab] = true
		localStorage.setItem('search-tab',chosenTab)
		this.search()
	}

	suggesting = false
	inputHandler(){		
		this.suggesting = true
		if(this.keyword == '' || this.keyword == null){
			this.suggesting = false				
		}
	}
 

	search(){
		this.suggesting = false
		// cpdb 
		if(this.tabs.cpdb){			
			this.CpdbService.search(this.keyword).subscribe(data=>{
				this.SearchService.setCPDBData(data)
				this.SearchService.setCPDBData(data)
			})
		}
		// birth 
		if(this.tabs.births){
			this.BirthsService.search(this.keyword).subscribe(data=>{
				this.SearchService.setBirthData(data)
				this.SearchService.setBirthData(data)
			})
		}
		// death 
		if(this.tabs.deaths){
			this.DeathsService.search(this.keyword).subscribe(data=>{
				this.SearchService.setDeathData(data)
				this.SearchService.setDeathData(data)
			})
		}
		// inmigration
		if(this.tabs.inmigration){
			this.InMigService.search(this.keyword).subscribe(data=>{
				this.SearchService.setInMIgrationData(data)
				this.SearchService.setInMIgrationData(data)
			})
		}
		// outmigration
		if(this.tabs.outmigration){
			this.OutMigService.search(this.keyword).subscribe(data=>{
				this.SearchService.setOutMigrationData(data)
				this.SearchService.setOutMigrationData(data)
			})
		}
		//  marriage
		if(this.tabs.marriages){
			this.MarriagesService.search(this.keyword).subscribe(data=>{
				this.SearchService.setMarriageData(data)
				this.SearchService.setMarriageData(data)
			})
		}				
		this.SearchService.setKeyword(this.keyword)
		
	}

	
	


}
 