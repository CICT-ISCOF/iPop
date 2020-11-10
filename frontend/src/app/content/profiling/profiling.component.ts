import { keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CountService } from '../../services/count.service'
import { SocketsService } from '../../services/sockets.service'

@Component({
  selector: 'app-profiling',
  templateUrl: './profiling.component.html',
  styleUrls: ['./profiling.component.scss','../cms/cms.component.responsive.scss']
})
export class ProfilingComponent implements OnInit {

	constructor(
		private CountService : CountService,
		private SocketsService : SocketsService
	) { }

	ngOnInit(): void {
		
		if (!(localStorage.getItem("tab") != null)) {
			
		}else{
			this.maekActive(localStorage.getItem('tab'))
		}
		this.getCountTpyes()
		this.getSocketsAll()
		this.getSocketsComments()
		this.getSocketRecords()
	}

	tabs = {
		Deaths:false,
		Births:false,
		InMigs:false,
		OutmiGS:false,
		Marraige:false,
		CPDB:true,
		fileUpload:false
	}

	tables = {
		Deaths:false,
		Births:false,
		InMigs:false,
		OutmiGS:false,
		Marraige:false,
		CPDB:true,
		fileUpload:false
	}

	maekActive(tab){
		this.removeActive()
		if(tab == "Deaths"){
			this.tabs.Deaths = true
		}
		else if(tab == "Births"){
			this.tabs.Births = true
		}
		else if(tab == "InMigs"){
			this.tabs.InMigs = true
		}
		else if(tab == "OutmiGS"){
			this.tabs.OutmiGS = true
		}
		else if(tab == "Marraige"){
			this.tabs.Marraige = true
		}
		else if(tab == "CPDB"){
			this.tabs.CPDB = true
		}
		else{
			this.tabs.fileUpload = true
		}

		localStorage.setItem('tab',tab)
	}

	removeActive(){
		for(let key in this.tabs){
			this.tabs[key] = false
		}
	}

	count = {
		'Birth':'',
		'Death':'' ,
		'CPDB':'',
		'InMigration':'' ,
		'OutMigration':'' ,
		'Marriage':'' ,
	}

	getCountTpyes(){
		for(let key in this.count){
			this.CountService.getRecordCount(key).subscribe(data => {
				this.count[key] = data
			})			
		}
	}


	commentSubscriptions 

	getSocketsAll(){
		this.SocketsService.getAll().subscribe(data => {
			console.log('getAll',data)
		})
	}

	getSocketsComments(){
		this.SocketsService.getComments().subscribe(data => {
			console.log('getComments',data)
			this.commentSubscriptions = data
		})

		this.commentSubscriptions.forEach(element => {
			//socket io element
		});
	}


	getSocketRecords(){
		this.SocketsService.getRecord().subscribe(data => {
			console.log('getRecord',data)
		})
	}

	
}
