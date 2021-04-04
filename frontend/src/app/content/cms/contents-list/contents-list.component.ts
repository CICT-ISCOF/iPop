import { Component, OnInit } from '@angular/core';
import { CmsService} from '../cms.service'
@Component({
  selector: 'app-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.scss','contents-list.component.responsive.scss']
})
export class ContentsListComponent implements OnInit {



	constructor(
		private CmsService : CmsService
	) { }

	ngOnInit(): void {
		this.getContents()
	}

	active = {	}


	public list :any = []


	getContents(){
		let count = 0
		for(let content of this.list){
			count += 1
			this.active[count] = false			
		}

		this.CmsService.getLinks().subscribe(data => {
			this.list = data
		})
	}

	showContent(content){		
		this.active[content] == true ?  this.active[content] = false : this.active[content] = true		
	}

	

}