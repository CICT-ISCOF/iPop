import { UserService } from './user.service';
import { ScrollEventService } from './scroll-event.service';
import { Component, OnInit, Directive, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from './utility.service';
import { Subscription } from 'rxjs';
import { NetworkStatusAngularService } from 'network-status-angular';
import Swal from 'sweetalert2';
import { MediaQueryService } from './media-query.service';
import { DeviceService } from './device.service';
import { MapService } from './content/maps/map.service';
import { groupBy } from './helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Directive({
  selector: '[scrollToTop]',
})
export class AppComponent implements OnInit {
  title = 'ipo-web';

  map = true;

  constructor(
    private UtilityService: UtilityService,
    private NetworkStatusAngularService: NetworkStatusAngularService,
    private MediaQueryService: MediaQueryService,
    private DeviceService: DeviceService,
    private MapService: MapService,
    private ScrollEventService: ScrollEventService,
    private UserService: UserService
  ) {
    this.userRole = this.UtilityService.getUserROle().subscribe((role) => {
      this.role = role;
    });
    this.userRole = this.UtilityService.getLogoutValue().subscribe((role) => {
      this.role = role;
    });

    this.userRole = this.NetworkStatusAngularService.status.subscribe(
      (isConnected) => {
        if (isConnected) {
          this.UtilityService.setAlert('Your back online!', 'success');
        } else {
          this.UtilityService.setAlert(
            'You are not connected to the internet',
            'error'
          );
        }
      }
    );

    this.userRole = this.MediaQueryService.getSize().subscribe((media) => {
      this.media = media;
    });

    this.userRole = this.MapService.getMapToggler().subscribe((value) => {
      this.map = false;
      this.map = true;
    });
  }

  userRole: Subscription;

  role: string = '';

  media: number;

  isUser = !this.UserService.isUser();

  onWindowScroll(event) {
    if (this.isUser) {
      if (window.pageYOffset > 150) {
        this.ScrollEventService.hideHeader(true);
      } else {
        this.ScrollEventService.hideHeader(false);
      }
    }
  }

  ngOnInit(): void {
    this.validateRole(function () {
      let url = document.createElement('a');
      url.href = window.location.href;
      const path = url.pathname;
      return path;
    });
    this.checkLocalStorage();
    console.log(
      groupBy(
        [
          { type: 'Birth', value: 1 },
          { type: 'Birth', value: 5 },
          { type: 'Death', value: 2 },
        ],
        'type'
      )
    );
  }

  checkLocalStorage() {
    this.role = localStorage.getItem('role');
  }

  validateRole(path) {
    if (path != '/home' && this.role == 'user') {
      // alert('access denied')
    }
  }

  hideDropdown() {
    this.UtilityService.setDropDown(false);
    this.DeviceService.showSidebar(false);
    this.DeviceService.showDropdown(true);
  }

  @HostListener('window:resize', [])
  public onResize() {
    this.detectScreenSize();
  }

  public ngAfterViewInit() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.MediaQueryService.setSize(width);
  }
}
