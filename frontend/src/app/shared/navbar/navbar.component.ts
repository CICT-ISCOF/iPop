import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    constructor(
        private SidebarService: SidebarService
    ) {
        this.SidebarService.getSidebarActiveNav().subscribe(value=>this.nav=value)
    }
    nav:any = {}
    theme = localStorage.getItem('data-theme');
    subscription: Subscription;
    dropdown = false;
    approval = false;
    navText = '';
    account = JSON.parse( localStorage.getItem( 'user-data' ) );
    name = this.account.user.fullname
    ngOnInit(): void {
    }
    
    back() {
        window.history.back()
    }

}
