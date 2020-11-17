import { UserService } from './../../../../user.service';
import { AboutService } from './../about.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-org-structure',
  templateUrl: './org-structure.component.html',
  styleUrls: ['./org-structure.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class OrgStructureComponent implements OnInit {

	constructor(
		private AboutService : AboutService,
		private UserService : UserService
	) { }

	ngOnInit(): void {	
	}

	isAdmin = this.UserService.isUser()

	organizationalStructure : any = '../../../../../assets/org.jpg'


	triggerInputTypeFile(){
		document.getElementById('input-type-file').click()
	}

	readUrl(files: FileList,event,index,type){	
		if (event.target.files && event.target.files[0]) {				
			const reader = new FileReader()	
			reader.readAsDataURL(event.target.files[0]);   		
			reader.onload = (event) => {	
				let img = (<FileReader>event.target).result		
				const base64String = img.toString().split(',')
				this.organizationalStructure = base64String
				this.storeOrganizationalStructure(base64String)
			}	
		}	
		
	}


	storeOrganizationalStructure(file){
		console.log('store',file)
		// this.AboutService.storeOrganizationalStructure(file).subscribe(data => {
			
		// })		
	}

	getOrganizationalStructure(){
		// this.AboutService.getOrganizationalStructure().subscribe(data => {
			
		// })
	}

	updateOrganizationalStructure(file){
		// this.AboutService.updateOrganizationalStructure(file).subscribe(data => {

		// })
	}
}
