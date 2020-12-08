import { UserService } from './../../../../user.service';
import { UtilityService } from './../../../../utility.service';
import { AwardsService } from './../awards.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss','../../../home/home.component.scss','../../../home/home.component.inherit.cms.responsive.scss','../../../home/home.tablet.scss','../../general-public.style.scss']
})
export class AwardsComponent implements OnInit {

	isUser = !this.UserService.isUser()
	theme = localStorage.getItem('data-theme')
	constructor(
		private AwardsService : AwardsService,
		private UtilityService : UtilityService,
		private UserService : UserService
	) { }

	ngOnInit(): void {
		this.retrieveAwards()
	}

	award = {		
		url:'',
		title:'',
		files:[]
	}

	files = {
		images:[],
		videos:[]
	}

	awards:any = []

	createNewAward = false

	activeAward = {	}

	wantsToAddanAward = false

	wantsToAddanAwardFunction(value : boolean){
		this.clearSlider()
		this.wantsToAddanAward = value
	}


	createAward(){	
		if(this.files['images'].length != 0){
			for(let images of this.files.images){
				this.award.files.push(images)
			}			
		}
		if(this.files['videos'].length != 0){
			for(let videos of this.files.videos){
				this.award.files.push(videos)
			}			
		}		
		this.isLoading = true
		this.AwardsService.createAward(this.award).subscribe(data => {
			this.UtilityService.setAlert('New Award has been added!','success')
			this.award = {		
				url:'',
				title:'',
				files:[]
			}
			this.isLoading = false
			this.wantsToAddanAward = false
			this.ngOnInit()
		},error=>{
			for(let message in error.error.errors){
				this.UtilityService.setAlert(error.error.errors[message],'error')
			}	
			this.isLoading = false
		})
	}

	isLoading = false
	retrieveAwards(){
		this.AwardsService.retrieveAwards().subscribe(data => {
			this.awards = data
			console.log(data)
		})
		let count = 0
		for(let award of this.awards){
			count += 1
			this.activeAward[count] = false			
		}	
	}

	updateAward(id, award){
		award['files'] = []
		if(this.files['images'].length != 0){
			for(let images of this.files.images){
				award['files'].push(images)
			}			
		}
		if(this.files['videos'].length != 0){
			for(let videos of this.files.videos){
				award['files'].push(videos)
			}			
		}				
		Swal.fire({
			title: 'Are you sure you want to save changes for this award?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Save Changes',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.AwardsService.updateAward(award, id).subscribe(data => {
					this.ngOnInit()
					this.award = {		
						url:'',
						title:'',
						files:[]
					}
					this.UtilityService.setAlert('Changes saved!','success')
				})				
			} 
		})	
	}

	deleteAward(id){
		Swal.fire({
			title: 'Are you sure you want to remove this Award?',		
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Remove',
			cancelButtonText: 'Nope'
		  }).then((result) => {
			if (result.value) {
				this.AwardsService.deleteAward(id).subscribe(data => {
					this.UtilityService.setAlert('Award has been removed','info')
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
				this.AwardsService.deletePhoto(id).subscribe(data => {
					this.ngOnInit()
				})		
			} 
		})	
		
	}



	
	toggleAward(award_id){		
		this.activeAward[award_id] == true ?  this.activeAward[award_id] = false : this.activeAward[award_id] = true	
		console.log(this.activeAward[award_id])
		this.clearSlider()
		
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
					const toBase64Img = img.toString().split(',')
					if(type == 'video'){		
						this.files.videos.push(img ) 
						alert('ari')												
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
