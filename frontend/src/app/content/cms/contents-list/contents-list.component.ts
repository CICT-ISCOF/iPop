import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.scss','contents-list.component.responsive.scss']
})
export class ContentsListComponent implements OnInit {



	constructor() { }

	ngOnInit(): void {
		this.getContents()
	}

	active = {	}


	contents :any = [1,2,3,4,5,6]


	getContents(){
		let count = 0
		for(let content of this.contents){
			count += 1
			this.active[count] = false			
		}
	}

	showContent(content){		
		this.active[content] == true ?  this.active[content] = false : this.active[content] = true		
	}

}