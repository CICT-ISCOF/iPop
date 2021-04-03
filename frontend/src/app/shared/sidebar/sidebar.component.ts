import { Component, OnInit } from '@angular/core';
import { Subscription }  from 'rxjs';
import { UtilityService }  from '../../others/utility.service'
import { MediaQueryService } from '../../others/media-query.service'
import { DeviceService }  from '../../others/device.service'
import * as nav from './sidebar'
import {SidebarService} from './sidebar.service'

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
        private DeviceService: DeviceService,
        private SidebarService: SidebarService
	) {
        this.UtilityService.geColor().subscribe(color => this.sidebar.color = this.formatColorFromLocalStorage(color))

        this.UtilityService.geBackground().subscribe(boolean =>this.sidebar.background = this.formatStringtoBoolean(boolean))

        this.UtilityService.getImage().subscribe(image => this.sidebar.backgroundImage = this.formatImage(image))

        this.MediaQueryService.getSize().subscribe(size => 	this.hide = this.processSize(size)) 

        this.DeviceService.sidebarState().subscribe( state => this.hide = state )
	}

    navs = nav.Sidebar()
	
    ngOnInit(): void {
        let nav = JSON.parse( localStorage.getItem( 'nav' ))
        if ( localStorage.getItem( 'nav' ) != undefined ) {
            this.makeIconAsActive( nav)
        }
    }
    
    hide = false
    icons: any = {}
    
    makeIconAsActive(nav:any) {
        this.icons = {}
        this.icons[ nav.name ] = true
        this.SidebarService.setSidebar( nav )
        localStorage.setItem('nav',JSON.stringify(nav))
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
