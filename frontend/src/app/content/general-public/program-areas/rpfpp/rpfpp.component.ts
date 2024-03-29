import { UserService } from '../../../../others/user.service';
import { ProgramAreasService } from './../program-areas.service';
import { UtilityService } from '../../../../others/utility.service';

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o'

@Component({
  selector: 'app-rpfpp',
  templateUrl: './rpfpp.component.html',
  styleUrls: ['./rpfpp.component.scss','../../../header/home.component.scss','../../../header/home.component.inherit.cms.responsive.scss','../../../header/home.tablet.scss','../../../header/home.tablet.scss','../../general-public.style.scss']
})
export class RPFPPComponent implements OnInit {

	constructor(
		private ProgramAreasService : ProgramAreasService,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { }

	ngOnInit(): void {
		this.getProramArea()	
	}
	theme = localStorage.getItem('data-theme')

	isAdmin = this.UserService.isUser()

	programArea = {}

	activity = {		
		program_area_id:1,
		title:'',
		description:'',
		files:[]
	}


 
	programs = []


	getProramArea(){
		this.ProgramAreasService.getProgramArea().subscribe(data => {
			this.programArea = data[0]		
		})
	}

	updateProgramArea(programArea){
		
		this.ProgramAreasService.updateProgramArea(programArea, 1).subscribe(data => {		
			this.activity = {		
				program_area_id:1,
				title:'',
				description:'',
				files:[]
			}
		})
	}


	createRPFP(){		
		let files = []
		if(this.files['images'].length != 0){
			for(let images of this.files.images){
				this.activity.files.push(images)
			}			
		}
		if(this.files['videos'].length != 0){
			for(let videos of this.files.videos){
				this.activity.files.push(videos)
			}			
		}		
		this.ProgramAreasService.createProgram(this.activity).subscribe(data => {
			this.ngOnInit()
			this.wantsToAddanAward = false
		})
	}

	

	updateRPFP(id, program : any, index){
		let data = {}
		data['title'] = program['title']
		data['description'] = program['description']
		data['files'] = []
		if(this.files['images'].length != 0){
			for(let images of this.files.images){
				data['files'].push(images)
			}			
		}
		if(this.files['videos'].length != 0){
			for(let videos of this.files.videos){
				data['files'].push(videos)
			}			
		}			
		Swal.fire({
			title: 'Are you sure you want to update this Actiivity?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Update Actiivity',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.ProgramAreasService.updateProgram(data, id).subscribe(data => {
					this.toggleProgram(index)
					this.ngOnInit()
				})			
			} 
		})
	
	}

	deletePhoto(id){
		Swal.fire({
			title: 'Are you sure you want to remove this Photo?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.ProgramAreasService.deletePhoto(id).subscribe(data => {
					this.ngOnInit()
				})		
			} 
		})	
	}


	deleteRPFP(id){
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
					this.ngOnInit()
				})				
			} 
		})
	}


	addAnAward(){
		
	}

	acitveProgram = {}

	toggleProgram(program_id){		
		this.acitveProgram[program_id] == true ?  this.acitveProgram[program_id] = false : this.acitveProgram[program_id] = true
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
