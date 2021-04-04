import { Component ,OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CmsService } from './cms.service'
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { UtilityService } from '../../others/utility.service'
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
		if( localStorage.getItem('cms-tab') && localStorage.getItem('cms-tab') != undefined  ){
			this.changeTab(localStorage.getItem('cms-tab'))
		}
		this.getParentLinks()
	}

	tabs = {
		newContent:false,
		contentList:false,
		newQuickLink:true,
		quickLinks:false
	}
	
	changeTab( item : string ){
		for(let tab in this.tabs){
			this.tabs[tab] = false
		}
		this.tabs[item] = true
		localStorage.setItem('cms-tab',item)
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
		if(this.existingCategory == false){	
			this.items.push(this.categories)						
			this.CmsService.save(this.items).subscribe(data => {
			})
		}
		else{			
			this.CmsService.setChild(this.childParams).subscribe(data=>{
			})
		}
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

	existingCategory
	categories = {
		title:'',		
		type:'link',
		sub_categories:[{
			title:''
		}],	
	}
	titles:any = []	

	newCategory = false
	newSubCategory = false
	items:any = []	
	newMainCategory = false

	childParams = {
		parent_id:'',
		title:''
	}
	
	selectHandler(event){
		if(event.target.value == 'New Main Category'){
			this.newMainCategory = true
		}			
	}

	parentIdHandler(event){		
		this.childParams.parent_id = event.target.value
	}





	getParentLinks(){
		this.CmsService.getLinks().subscribe(data => {			
			this.titles = data
		})
	}
	
	triggerMediaInput(id, index){	
		document.getElementById(id + index).click()		
	}
		

	readURL(files: FileList,event,index,type) {  	
		this.items[index].pdf  = ''
		this.items[index].video  = ''
		this.items[index].image  = ''		
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {		
				if(type == 'video'){		
					this.items[index].video  = (<FileReader>event.target).result;			
				}	
				else if (type == 'image'){
					this.items[index].image = (<FileReader>event.target).result;			
				}
				else if (type == 'pdf'){					
					this.items[index].pdf  =  (<FileReader>event.target).result;	
				}			
				const img = (<FileReader>event.target).result
				const toBase64Img = img.toString().split(',')
				this.items[index].file =  toBase64Img[1]	
			}
		}
		this.items[index].attachment = files.item(0)	
	}


	cleanURL(oldURL: string): SafeResourceUrl {
		return this.DomSanitizer.bypassSecurityTrustResourceUrl(oldURL);
	}


	readGridUrl(files: FileList,event,index,gridIndex){
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0]);   
			reader.onload = (event) => {	
				const img = (<FileReader>event.target).result
				this.items[index].items[gridIndex].image  =  img
				const toBase64Img = img.toString().split(',')
				this.items[index].items[gridIndex].file =  toBase64Img[1]	

			
			}
		}
		this.items[index].items[gridIndex].attachment = files.item(0)			
	}


	
	addGrid(index){
		this.items[index].items.push({
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
				const img = (<FileReader>event.target).result
				this.items[index].items[cardIndex].image  =  img
				const toBase64Img = img.toString().split(',')
				this.items[index].items[cardIndex].file =  toBase64Img[1]	
			}
		}
		this.items[index].carditems[cardIndex].attachment = files.item(0)	
	}

	
	addCard(index){		
		this.items[index].items.push({
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
					let img = (<FileReader>event.target).result		
					const toBase64Img = img.toString().split(',')
					if(type == 'video'){				
						this.items[index].videos.push( (<FileReader>event.target).result ) 
						this.items[index].items.push({ file: toBase64Img[1] }) 												
					}	
					else{		
						this.items[index].images.push( (<FileReader>event.target).result )
						this.items[index].items.push({ file: toBase64Img[1] }) 	
					}
				}	
				 						
			})	
		}	
	}
	
	reload(){
		this.items = []
		this.existingCategory = undefined
		for(let item in this.categories){
			this.categories[item] = ''
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
					title:'',
					body:'',						
					position:'`',
					type:'text'		
				})
		}
		if(item == 'Media'){
			this.items.push({						
				attachment:'',				
				video:'',
				image:'',	
				pdf:'',							
				position:'',
				type:'media'					
			})		
		}
		if(item == 'Grids'){
			this.items.push({			
				items:[],								
				position:'',	
				type:'grid'								
			})		
		}
		if(item == 'Cards'){
			this.items.push({				
				items:[],					
				position:'',					
				type:'card'				
			})		
		}
		if(item == 'Sliders'){
			this.items.push({				
				images:[],
				videos:[],				
				position:'',		
				items:[],		
				type:'slider'	
			})		
		}

		if(item == 'Articles'){
			this.items.push({				
				image:'../../../assets/placeholders/image.jpg',	
				attachment:[],
				title:'',
				body:'',		
				type:'article'				
			})		
		}
		if(item == 'Lists'){
			this.items.push({			
				items:[''],						
				title:'',					
				type:'list'		
			})		
		}
	}

	insertItem(item, index){		
		if(item == 'Texts'){			
			this.items.splice(index, 0, ({						
					title:'',
					body:'',						
					position:'`',
					type:'text'		
				})
			)
		}

		if(item == 'Media'){
			this.items.splice(index, 0, ({						
					attachment:'',				
					video:'',
					image:'',	
					pdf:'',							
					position:'',	
					type:'media'		
				})	
			)	
		}

		if(item == 'Grids'){
			this.items.splice(index, 0, ({					
					items:[],								
					position:'',	
					type:'grid'				
				})	
			)	
		}

		if(item == 'Cards'){
			this.items.splice(index, 0, ({				
					items:[],					
					position:'',	
					type:'card'		
				})	
			)	
		}
		if(item == 'Sliders'){
			this.items.splice(index, 0, ({				
					images:[],
					videos:[],				
					position:'',		
					items:[],
					type:'slider'		
				})	
			)	
		}

		if(item == 'Articles'){
			this.items.splice(index, 0, ({				
					image:'../../../assets/placeholders/image.jpg',	
					attachment:[],
					title:'',
					body:'',
					type:'article'		
				})	
			)	

		}
		if(item == 'Lists'){
			this.items.splice(index, 0, ({					
					items:[''],						
					title:'',	
					type:'list'						
				})
			)
		}
		
	}

	readArticleUrl(files: FileList,event,index){
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();   
			reader.readAsDataURL(event.target.files[0])		     
			reader.onload = (event) => {
				const img = (<FileReader>event.target).result
				const toBase64Img = img.toString().split(',')
				this.items[index].image = event.target.result
				this.items[index].attachment.push(files.item(0)) 
				this.items[index].file =  toBase64Img[1]	
			}
		}	
	}

	list =''
	addList(index){	
		this.items[index].items.push('')
	}

	clearList(index,listIndex){
		this.items[index].items[listIndex] = ''
	}

	pushList(index,listIndex){		
		this.items[index].items[listIndex] = {body:this.list}
		this.list = ''
		this.addList(index)
	}

	popList(index, listIndex){
		this.items[index].splice(listIndex, 1)
	}




	

	

}

