import { UserService } from './../../../user.service';
import { UtilityService } from './../../../utility.service';
import { MPCFDCComponent } from './../mpc-fdc.component';
import { MpcService } from './../mpc.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-show-mpc-fdc',
  templateUrl: './show-mpc-fdc.component.html',
  styleUrls: ['./show-mpc-fdc.component.scss']
})
export class ShowMpcFdcComponent implements OnInit {

	constructor(
		private MpcService : MpcService,
		private MPCFDCComponent : MPCFDCComponent,
		private UtilityService : UtilityService,
		private UserService  : UserService,
	) {
		this.MpcService.getMPC().subscribe(data => {
			this.mpc = data
		})
	}

	isUser =  !this.UserService.isUser()


	mpc:any = JSON.parse(localStorage.getItem('mpc-ref'))

	ngOnInit(): void {
		this.retrievePersonnel()
	}

	triggerInput(){
		document.getElementById('file').click()
	}

	readURL(files, event){
		this.mpc['files'] = []
		Object.keys(files).forEach(i => {				
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[i]);   		     
			reader.onload = (event) => {	
				this.mpc['files'].push( (<FileReader>event.target).result		)
				this.MpcService.updateMPC(this.mpc).subscribe(data => {
					this.ngOnInit()
					this.mpc = data
				})
			}	
		})
	}

	nl2br (str, is_xhtml) {
		if (typeof str === 'undefined' || str === null) {
			return '';
		}
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br /><br />' : '<br><br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	}



	triggerFile(){
		document.getElementById('personnel').click()
	}

	readAddUrl(files:FileList,event){
		const reader = new FileReader();   
		reader.readAsDataURL(event.target.files[0]);   
		reader.onload = (event) => {		
			this. src = (<FileReader>event.target).result
		}
	}

	src:any = '../../../../assets/avatars/boy-blue.png'

	triggerFile2(){
		document.getElementById('file2').click()
	}

	 

	personnel = {
		mpcfdc_id:this.mpc.id
	}
	personnels = []

	savePersonnel(){
		this.personnel['photo'] = this.src
		this.MpcService.createPersonnel(this.personnel).subscribe(data => {
			this.UtilityService.setAlert(`New Personnel on ${this.mpc['name']} has been added`,'success')
			this.ngOnInit()
		},
		(error) => {
			for (let message in error.error.errors) {
			  this.UtilityService.setAlert(error.error.errors[message], 'error');
			}
		})
	}


	retrievePersonnel(){
		this.MpcService.retrivePersonnel(this.mpc.id).subscribe(data => {
			this.personnels = data
		})
	}

	updatePersonnel(personnel){
		let tempPhoto = {}
		tempPhoto = personnel['photo']
		delete personnel['photo']
		this.MpcService.updatePersonnel(personnel).subscribe(data => {
			this.UtilityService.setAlert(`${personnel.name} has been has been successfully updated `,'success')
			this.ngOnInit()
			personnel['photo'] = tempPhoto
		})
	}

	deletePersonnel(personnel){
		this.MpcService.deletePersonnel(personnel.id).subscribe(data => {
			this.UtilityService.setAlert(`${personnel.name} has been removed as a personnel on ${this.mpc['name']} `,'success')
			this.ngOnInit()
		})
	}

	activePersonnel = {}
	togglePesonnel(index){
		this.activePersonnel[index] == true ?  this.activePersonnel[index] = false : this.activePersonnel[index] = true	
	}










	customOptions: OwlOptions = {
		center: true,
		items:2,
		loop:true,
		margin:0,
	
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:2000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}
	back(){
		this.MPCFDCComponent.show = false
	}

}
