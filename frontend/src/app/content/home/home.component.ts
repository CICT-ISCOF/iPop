import { UserService } from './../../user.service';
import { ScrollEventService } from './../../scroll-event.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss','home.component.inherit.cms.responsive.scss','home.tablet.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private ScrollEventService : ScrollEventService,
		private UserService : UserService
	) { 
		this.ScrollEventService.gethideHeaderValue().subscribe(value => {
			this.hide = value	
		})
	}

	role = localStorage.getItem('role')

	hide = false

	isUser = !this.UserService.isUser()

	ngOnInit(): void {
		if(window.pageYOffset > 150){
			this.ScrollEventService.hideHeader(true)
		}else{
			this.ScrollEventService.hideHeader(false)
		}
	} 




}
