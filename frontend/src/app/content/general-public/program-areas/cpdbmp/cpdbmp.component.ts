import { UserService } from './../../../../user.service';
import { ProgramAreasService } from './../program-areas.service';
import { UtilityService } from './../../../../utility.service';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-cpdbmp',
  templateUrl: './cpdbmp.component.html',
  styleUrls: ['./cpdbmp.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class CPDBMPComponent implements OnInit {

	constructor(
		private ProgramAreasService : ProgramAreasService,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { }

	ngOnInit(): void {

	}

	isAdmin = this.UserService.isUser()

	cpdbm = {
		description:' The Population Office is mandated to establish and maintain an updated population data bank for program operations, development planning, and an educational program to ensure people’s participation in and understanding of population development.',
		programs:[
				{
					title:
					{
						title:'The Barangay Service Point Officers',
						description:'The Responsible Parenthood and Family Planning Program is one of the key component of the Philippine Population Management Program. The province objective is to help couples/parents exercise responsible parenting to develop the total well-being of children for them to become responsible and capable in contributing to the betterment of society, through the establishment of the Multi-Purpose Counseling and Family Development Centers and Information, Education & Communication (IEC) Advocacies.',
					
				}
			}
		]
	}

	programs = []


	createCPDBM(){
		this.ProgramAreasService.createProgram(this.cpdbm).subscribe(data => {

		})
	}

	retrieveCPDBM(){
		this.ProgramAreasService.retrieveProgram().subscribe(data => {

		})
	}

	updateCPDBM(id){
		this.ProgramAreasService.updateProgram(this.cpdbm, id).subscribe(data => {

		})
	}

	deleteCPDBM(id){
		Swal.fire({
			title: 'Are you sure you want to remove this Actiivity?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove Actiivity',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.ProgramAreasService.deleteProgram(id).subscribe(data => {
					this.UtilityService.setAlert('Award has been removed','info')
				})				
			} 
		})
	}


	addAnAward(){
		
	}

	acitveProgram = {}

	toggleProgram(program_id){		
		this.acitveProgram[program_id] == true ?  this.acitveProgram[program_id] = false : this.acitveProgram[program_id] = true	
		console.log(this.acitveProgram[program_id])
		this.clearSlider()
	}
	
	files = {
		images:[],
		videos:[]
	}
	clearSlider(){
		this.files = {
			images:[],
			videos:[]
		}
	}

	readSliderURL(files: FileList,event,type){	
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
					let img = (<FileReader>event.target).result	
					if(type == 'video'){		
						this.files.videos.push(img) 																
					}	
					else{	
						this.files.images.push(img) 	
					}
				}	
			})	
		}	
	}

	triggerMediaInput(id,index){
		document.getElementById(id + index).click()
	}

	wantsToAddanAward = false

	wantsToAddanAwardFunction(value : boolean){
		this.clearSlider()
		this.wantsToAddanAward = value
	}

	wantsToEditDescription = false

	wantsToEditDescriptionFunction(){
		this.clearSlider()
		this.wantsToEditDescription = true
	}

	customOptions: OwlOptions = {	
		center: true,
		items:2,
		loop:true,
		margin:0,
	   
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:200000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}

}
