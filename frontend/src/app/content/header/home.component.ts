import { UserService } from '../../others/user.service';
import { ScrollEventService } from '../../others/scroll-event.service';
import { Component, OnInit } from '@angular/core';
import {headers} from './header'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
    
    navs = headers

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
