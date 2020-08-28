import { Component ,OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CmsService } from './cms.service'
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UtilityService } from '../../utility.service'

@Component({
	selector: 'app-cms',
	templateUrl: './cms.component.html',
	styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

	constructor(
		private CmsService : CmsService,
		private DomSanitizer : DomSanitizer,
		private UtilityService : UtilityService
	) { }

	ngOnInit(): void {

	}

	theme = localStorage.getItem('data-theme')

	
	submit(){	
		for(let key in this.categories){
			if(this.categories[key]== ''){
				this.UtilityService.setAlert('Categories should not be left empty','error')
				return
			}
		}
		this.items.push(this.categories)
		console.log(this.items)
	}





	// ----------------- content options --------------------------

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

		
	categories = {
		title:'',
		subcategory:''
	}

	newCategory = false
	newSubCategory = false

	items:any = []

	
	autoIncrement = 0
	addItem(item){
		this.autoIncrement += 1
		if(item == 'Texts'){			
			this.items.push({
					Texts:{					
						title:'',
						body:'',	
						id:this.autoIncrement,
						position:'`',											
					},
				})
		}
		if(item == 'Media'){
			this.items.push({
				Media: {				
					attachment:'',				
					video:'',
					image:'',	
					pdf:'',		
					id:this.autoIncrement,
					position:'',
				},
				
			})		
		}
		if(item == 'Grids'){
			this.items.push({
				Grids: {	
					griditems:[],
					id:this.autoIncrement,					
					position:'',					
				},			
			})		
		}
		if(item == 'Cards'){
			this.items.push({
				Cards: {	
					carditems:[],
					id:this.autoIncrement,
					position:'',					
				},			
			})		
		}
		if(item == 'Sliders'){
			this.items.push({
				Sliders: {	
					images:[],
					videos:[],
					id:this.autoIncrement,
					position:'',		
					attachments:[]			
				},			
			})		
		}
	}

	
	triggerMediaInput(id, index){		
		document.getElementById(id + index).click()
	}
		

	readURL(files: FileList,event,index,type) {  	
		this.items[index].Media.pdf  = ''
		this.items[index].Media.video  = ''
		this.items[index].Media.image  = ''		
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {		
				if(type == 'video'){		
					this.items[index].Media.video  = (<FileReader>event.target).result;			
				}	
				else if (type == 'image'){
					this.items[index].Media.image = (<FileReader>event.target).result;			
				}
				else if (type == 'pdf'){					
					this.items[index].Media.pdf  =  (<FileReader>event.target).result;	
				}			
			}
		}
		this.items[index].Media.attachment = files.item(0)	
	}


	cleanURL(oldURL: string): SafeResourceUrl {
		return this.DomSanitizer.bypassSecurityTrustResourceUrl(oldURL);
	}


	readGridUrl(files: FileList,event,index,gridIndex){
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {	
				this.items[index].Grids.griditems[gridIndex].image  = (<FileReader>event.target).result;			
			}
		}
		this.items[index].Grids.griditems[gridIndex].attachment = files.item(0)	
	}

	
	addGrid(index){
		this.items[index].Grids.griditems.push({
			image:'',
			title:'',
			attachment:'',
		})
		console.log(this.items)
	}


	readCardURL(files: FileList,event,index,cardIndex){
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {	
				this.items[index].Cards.carditems[cardIndex].image  = (<FileReader>event.target).result;			
			}
		}
		this.items[index].Cards.carditems[cardIndex].attachment = files.item(0)	
	}

	
	addCard(index){		
		this.items[index].Cards.carditems.push({
			image:'',
			title:'',
			attachment:'',
		})
	}

	readSliderURL(files: FileList,event,index,type){	
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {	
				if(type == 'video'){
					this.items[index].Sliders.videos.push( (<FileReader>event.target).result ) 	
				}	
				else{
					this.items[index].Sliders.images.push( (<FileReader>event.target).result ) 	
				}	
			}
		}
		this.items[index].Sliders.attachments.push(files.item(0))  	
	}
	
	reload(){
		this.items = []
		this.categories = {
			title:'',
			subcategory:''
		}
	}

	

	

}
