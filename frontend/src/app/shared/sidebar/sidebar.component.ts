import { Component, OnInit } from '@angular/core';
import { Subscription }  from 'rxjs';
import { UtilityService }  from '../../others/utility.service'
import { MediaQueryService } from '../../others/media-query.service'
import { DeviceService }  from '../../others/device.service'
import * as nav from './sidebar'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    account = JSON.parse( localStorage.getItem( 'user-data' ) )

	constructor(
		private UtilityService: UtilityService,
		private MediaQueryService : MediaQueryService,
		private DeviceService : DeviceService,
	) {
		this.sub = this.UtilityService.geColor().subscribe(color => this.sidebar.color = this.formatColorFromLocalStorage(color))

		this.sub = this.UtilityService.geBackground().subscribe(boolean =>this.sidebar.background = this.formatStringtoBoolean(boolean))

		this.sub = this.UtilityService.getImage().subscribe(image => this.sidebar.backgroundImage = this.formatImage(image))

		this.sub = this.MediaQueryService.getSize().subscribe(size => 	this.hide = this.processSize(size)) 

		this.sub = this.DeviceService.sidebarState().subscribe(state=>this.hide = state)
	}

    navs = nav.Sidebar()
	
	ngOnInit(): void {
    }
    
    hide = false
    icons: any = {}
    
    makeIconAsActive(name:any) {
        this.icons = {}
        this.icons[ name ] = true
    }

    processSize( size: number ) {
        let type = false
        size <= 1024 ? type = false : type = true
        return type
    }

	sub : Subscription
	sidebar = {
		background : this.formatStringtoBoolean(localStorage.getItem('sidebar-background')),
		backgroundImage : this.formatImage(localStorage.getItem('sidebar-image')),
		color : this.formatColorFromLocalStorage(localStorage.getItem('color')),	
	}

	formatImage(image){
		if(image == null){
			image = '/wallpapers/land-3.jpg'
		}
		let imageDirectory ='../../../assets'
		image = imageDirectory + image 	
		return image
	}

	formatStringtoBoolean(boolean){
		boolean == 'true' ?  boolean = true : boolean = false 
		return boolean
	}

	formatColorFromLocalStorage(color){			
		let sideBarColor =   "var(--" + color +")"		
		return  sideBarColor
	}
	

}
