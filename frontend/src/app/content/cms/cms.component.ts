import { Component ,OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CmsService } from './cms.service'
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UtilityService } from '../../utility.service'
import { Subscription } from 'rxjs'
import {trigger, transition, style, animate, query, stagger, keyframes} from '@angular/animations'

@Component({
	selector: 'app-cms',
	templateUrl: './cms.component.html',
	styleUrls: ['./cms.component.scss','cms.component.responsive.scss'],
	animations: [
		trigger('listAnimation', [
			transition('* => *',[
				query(':enter', [
					stagger(3000, [
						animate('.3s ease-in', keyframes([
							style({opacity:0,transform: 'translateX(-25px)', offset:0}),
							style({opacity:.5,transform: 'translateX(-10px)', offset:0.3}),
							style({opacity:1,transform: 'translateX(0)', offset:1})
						]))
					]),
				], { optional: true }),
				query(':leave', [
					stagger(3000, [
						animate('.2s ease-in', keyframes([	
							style({opacity:1,transform: 'translateX(0)', offset:0}),
							style({opacity:.5,transform: 'translateX(-50px)', offset:0.3}),
							style({opacity:0,transform: 'translateX(-100%)', offset:1}),
						]))
					]),
				], { optional: true })
			]),
		  ])
	]
})
export class CmsComponent implements OnInit {

	constructor(
		private CmsService : CmsService,
		private DomSanitizer : DomSanitizer,
		private UtilityService : UtilityService
	) { 
		this.subscription = this.CmsService.getPreview().subscribe(preview => {
			this.preview = preview
		})
	}

	ngOnInit(): void {

	}


	tabs = {
		newContent:true,
		contentList:false,
		newQuickLink:false,
		quickLinks:false
	}

	
	changeTab( item : string ){
		this.removActiveTab()
		this.tabs[item] = true
	}

	removActiveTab(){
		this.tabs = {
			newContent:false,
			contentList:false,
			newQuickLink:false,
			quickLinks:false
		}	
	}



	subscription

	preview = false

	theme = localStorage.getItem('data-theme')



	previewData(){
		this.preview = true		
		setTimeout(() => {
			this.CmsService.setData(this.items)	
			
		}, 500);
	

		setTimeout(() => {
			this.CmsService.setCategory(this.categories)	
			
		}, 500);
	
	}

	
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
			image:'../../../assets/placeholders/image.jpg',	
			title:'',
			attachment:'',
		})
		
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
			image:'../../../assets/placeholders/image.jpg',	
			title:'',
			attachment:'',
		})
	}

	readSliderURL(files: FileList,event,index,type){	
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {			
					if(type == 'video'){				
						this.items[index].Sliders.videos.push( (<FileReader>event.target).result ) 											
					}	
					else{		
						this.items[index].Sliders.images.push( (<FileReader>event.target).result )
					}
				}	
				this.items[index].Sliders.attachments.push(files.item(0)) 						
			})	
		}	
	}
	
	reload(){
		this.items = []
		this.categories = {
			title:'',
			subcategory:''
		}
	}


	removeItem(index){
		this.items.splice(index, 1)				
	}


	removeGrid(index, gridIndex){
		this.items[index].Grids.griditems.splice(gridIndex, 1)
	}

	removeCard(index, cardIndex){
		this.items[index].Cards.carditems.splice(cardIndex, 1)
	}
	
	addItem(item){	
		if(item == 'Texts'){			
			this.items.push({
					Texts:{					
						title:'',
						body:'',						
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
					position:'',
				},
				
			})		
		}
		if(item == 'Grids'){
			this.items.push({
				Grids: {	
					griditems:[],								
					position:'',					
				},			
			})		
		}
		if(item == 'Cards'){
			this.items.push({
				Cards: {	
					carditems:[],					
					position:'',					
				},			
			})		
		}
		if(item == 'Sliders'){
			this.items.push({
				Sliders: {	
					images:[],
					videos:[],				
					position:'',		
					attachments:[]			
				},			
			})		
		}

		if(item == 'Articles'){
			this.items.push({
				Articles: {	
					image:'../../../assets/placeholders/image.jpg',	
					attachment:[],
					title:'',
					body:'',		
				},			
			})		
		}
		if(item == 'Lists'){
			this.items.push({
				Lists: {	
					listitems:[''],						
					title:'',					
				},			
			})		
		}
	}


	insertItem(item, index){		

		if(item == 'Texts'){			
			this.items.splice(index, 0, ({
					Texts:{					
						title:'',
						body:'',						
						position:'`',											
					},
				})
			)
		}

		if(item == 'Media'){
			this.items.splice(index, 0, ({
					Media: {				
						attachment:'',				
						video:'',
						image:'',	
						pdf:'',							
						position:'',
					},
					
				})	
			)	
		}

		if(item == 'Grids'){
			this.items.splice(index, 0, ({
					Grids: {	
						griditems:[],								
						position:'',					
					},			
				})	
			)	
		}

		if(item == 'Cards'){
			this.items.splice(index, 0, ({
					Cards: {	
						carditems:[],					
						position:'',					
					},			
				})	
			)	
		}
		if(item == 'Sliders'){
			this.items.splice(index, 0, ({
					Sliders: {	
						images:[],
						videos:[],				
						position:'',		
						attachments:[]			
					},			
				})	
			)	
		}

		if(item == 'Articles'){
			this.items.splice(index, 0, ({
					Articles: {	
						image:'../../../assets/placeholders/image.jpg',	
						attachment:[],
						title:'',
						body:'',		
					},			
				})	
			)	

		}
		if(item == 'Lists'){
			this.items.splice(index, 0, ({
					Lists: {	
						listitems:[''],						
						title:'',					
					},			
				})
			)	

		}
		
	}

	readArticleUrl(files: FileList,event,index){
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0])		     
			reader.onload = (event) => {
				this.items[index].Articles.image = event.target.result
				this.items[index].Sliders.attachment.push(files.item(0)) 	
			}
		}	
	}

	list =''
	addList(index){	
		this.items[index].Lists.listitems.push('')
	}

	clearList(index,listIndex){
		this.items[index].Lists.listitems[listIndex] = ''
	}

	pushList(index,listIndex){		
		this.items[index].Lists.listitems[listIndex] = this.list
		this.list = ''
		this.addList(index)
	}

	popList(index, listIndex){
		this.items[index].Lists.splice(listIndex, 1)
	}




	

	

}

