import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
	selector: 'app-cms',
	templateUrl: './cms.component.html',
	styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
	}

	customOptions: OwlOptions = {
		loop: true,			
		mouseDrag: true,
		touchDrag: true,
		pullDrag: true,
		dots: true,		
		navSpeed: 700,
		autoplay:true,		
		autoplayTimeout:2000,		
		responsive: {
		  0: {
			items: 1
		  },
		  400: {
			items: 1
		  },
		  740: {
			items: 1
		  },
		  940: {
			items: 1
		  }
		},	
	}
		
	categories = {
		main:'',
		sub:''
	}

	newCategory = false
	newSubCategory = false

	items = []; grids = [];cards = [];texts = [];medias = [];sliders = []

	slider = {	
		attachment:'',
		position:'',
	}

	grid  = {
		img:'',
		title:'',
		position:'',
	}
	
	text = {
		title:'',
		body:'',
		position:'',
	}

	media = {
		attachment:'',
		position:'',
	}

	card = {
		img:'',
		title:'',
		position:'',
	}

	addItem(item){
		this.items.push(item)		
	}
	
	addGrid(){
		this.grids.push(this.grid)
	}
	
	addCard(){		
		this.cards.push(this.card)		
	}

	reload(){
		location.reload()
	}

	submit(){
		let body:any = []
		body.push(this.slider);body.push(this.grids);body.push(this.cards);body.push(this.texts);body.push(this.media)		
		body = JSON.stringify(body)


	}

	

	

}
