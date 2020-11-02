import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { SlideToggleModule } from 'ngx-slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { NetworkStatusAngularModule } from 'network-status-angular';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AgTableModule, AgTableCustomSettings } from 'ag-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { Ng2OdometerModule } from 'ng2-odometer';
import {NgxPaginationModule} from 'ngx-pagination';
// import { AngularOpenlayersModule } from "ngx-openlayers";
import { ChartsModule } from 'ng2-charts';

import { ResponsiveModule } from 'ngx-responsive'
import 'ag-grid-enterprise';
import { TreeNgxModule } from 'tree-ngx';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './content/home/home.component';
import { DashoardComponent } from './content/dashoard/dashoard.component';
import { CmsComponent } from './content/cms/cms.component';
import { ProfilingComponent } from './content/profiling/profiling.component';
import { AccountComponent } from './content/settings/account/account.component';
import { PreviewComponent } from './content/cms/preview/preview.component';
import { ContentsListComponent } from './content/cms/contents-list/contents-list.component';
import { StatisticsComponent } from './content/statistics/statistics.component';
import { UserManualComponent } from './content/user-manual/user-manual.component';
import { ConversationsComponent } from './content/conversations/conversations.component';
import { AdminAccountsComponent } from './content/admin-accounts/admin-accounts.component';
import { AdministratorsComponent } from './content/administrators/administrators.component';
import { ShowContentComponent } from './content/show-content/show-content.component';
import { BackupAndRestoreComponent } from './content/backup-and-restore/backup-and-restore.component';
import { PageNotFoundComponent } from './content/page-not-found/page-not-found.component';
import { DeathsComponent } from './content/deaths/deaths.component';
import { BirthsComponent } from './content/births/births.component';
import { InMigComponent } from './content/in-mig/in-mig.component';
import { OutMigComponent } from './content/out-mig/out-mig.component';
import { MarriagesComponent } from './content/marriages/marriages.component';
import { DeathsTableComponent } from './content/profiling/deaths-table/deaths-table.component';
import { BirthsTableComponent } from './content/profiling/births-table/births-table.component';
import { InMigsTableComponent } from './content/profiling/in-migs-table/in-migs-table.component';
import { OutMigsTableComponent } from './content/profiling/out-migs-table/out-migs-table.component';
import { MarriageTableComponent } from './content/profiling/marriage-table/marriage-table.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { CreateComponent } from './sign-in/create/create.component';
import { AuthenticateComponent } from './sign-in/authenticate/authenticate.component';
import { CpdbComponent } from './content/cpdb/cpdb.component';
import { IconsComponent } from './shared/navbar/icons/icons.component';
import { DropdownComponent } from './shared/navbar/dropdown/dropdown.component';
import { SearchComponent } from './content/search/search.component';
import { ProfileShowComponent } from './content/profile-show/profile-show.component';
import { ShowProfileComponent } from './content/show-profile/show-profile.component';
import { ShowAdminStatusComponent } from './content/admin-accounts/show-admin-status/show-admin-status.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LogsComponent } from './content/logs/logs.component';
import { CpdbTableComponent } from './content/profiling/cpdb-table/cpdb-table.component';
import { TestsComponent } from './content/tests/tests.component';
import { ActionButtonsComponent } from './content/tests/action-buttons/action-buttons.component';
import { RoleComponent } from './content/admin-accounts/role/role.component';
import { TableAdministratorComponent } from './content/admin-accounts/table-administrator/table-administrator.component';
import { ActionButtonAdminComponent } from './content/admin-accounts/action-button-admin/action-button-admin.component';
import { TableCpdbComponent } from './content/profiling/cpdb-table/table-cpdb/table-cpdb.component';
import { RecordStatusComponent } from './content/profiling/cpdb-table/record-status/record-status.component';
import { ActionButtonsCpdbComponent } from './content/profiling/cpdb-table/action-buttons-cpdb/action-buttons-cpdb.component';
import { RecordStatusDeathsComponent } from './content/profiling/deaths-table/record-status-deaths/record-status-deaths.component';
import { ActionButtonsDeathsComponent } from './content/profiling/deaths-table/action-buttons-deaths/action-buttons-deaths.component';
import { TableDeathsComponent } from './content/profiling/deaths-table/table-deaths/table-deaths.component';
import { TableBirthsComponent } from './content/profiling/births-table/table-births/table-births.component';
import { StatusBirthComponent } from './content/profiling/births-table/status-birth/status-birth.component';
import { ActionButtonsBirthComponent } from './content/profiling/births-table/action-buttons-birth/action-buttons-birth.component';
import { ActionButtonsInMigsComponent } from './content/profiling/in-migs-table/action-buttons-in-migs/action-buttons-in-migs.component';
import { TableInMigsComponent } from './content/profiling/in-migs-table/table-in-migs/table-in-migs.component';
import { StatusInMigsComponent } from './content/profiling/in-migs-table/status-in-migs/status-in-migs.component';
import { StatusOutMigsComponent } from './content/profiling/out-migs-table/status-out-migs/status-out-migs.component';
import { TableOutMigsComponent } from './content/profiling/out-migs-table/table-out-migs/table-out-migs.component';
import { ActionButtonsOutMigsComponent } from './content/profiling/out-migs-table/action-buttons-out-migs/action-buttons-out-migs.component';
import { ActionButtonsMarriageComponent } from './content/profiling/marriage-table/action-buttons-marriage/action-buttons-marriage.component';
import { StatusMarriageComponent } from './content/profiling/marriage-table/status-marriage/status-marriage.component';
import { TableMarriageComponent } from './content/profiling/marriage-table/table-marriage/table-marriage.component';
import { TableLogseComponent } from './content/logs/table-logse/table-logse.component';
import { ActionButtonsLogsComponent } from './content/logs/action-buttons-logs/action-buttons-logs.component';
import { RoleLogsComponent } from './content/logs/role-logs/role-logs.component';
import { BirthsSearchComponent } from './content/search/births-search/births-search.component';
import { DeathsSearchComponent } from './content/search/deaths-search/deaths-search.component';
import { AdminSearchComponent } from './content/search/admin-search/admin-search.component';
import { InMigsSearchComponent } from './content/search/in-migs-search/in-migs-search.component';
import { OutMigsSearchComponent } from './content/search/out-migs-search/out-migs-search.component';
import { MarriagesSearchComponent } from './content/search/marriages-search/marriages-search.component';
import { CpdbSearchComponent } from './content/search/cpdb-search/cpdb-search.component';
import { DeviceComponent } from './content/logs/device/device.component';

import { CommentCpdbComponent } from './content/shared/comments/comment-cpdb/comment-cpdb.component';
import { CommentBirthsComponent } from './content/shared/comments/comment-births/comment-births.component';
import { CommentDeathsComponent } from './content/shared/comments/comment-deaths/comment-deaths.component';
import { CommentInMigComponent } from './content/shared/comments/comment-in-mig/comment-in-mig.component';
import { CommentOutMigComponent } from './content/shared/comments/comment-out-mig/comment-out-mig.component';
import { CommentMarriagesComponent } from './content/shared/comments/comment-marriages/comment-marriages.component';
import { MapLogsComponent } from './content/logs/map-logs/map-logs.component';
import { NewQuickLinksComponent } from './content/cms/new-quick-links/new-quick-links.component';
import { QuickLinksListComponent } from './content/cms/quick-links-list/quick-links-list.component';
import { UpdateContentComponent } from './content/cms/update-content/update-content.component';
import { UpdateQuickLinkComponent } from './content/cms/update-quick-link/update-quick-link.component';
import { ShowQuickLinkComponent } from './content/cms/show-quick-link/show-quick-link.component';
import { MobileAuthenticationComponent } from './sign-in/mobile/mobile-authentication/mobile-authentication.component'
import { NavbarMobileComponent } from './shared/devices/mobile/navbar-mobile/navbar-mobile.component'
import { DropdownComponentMobile }  from './shared/devices/mobile/dropdown/dropdown.component';
import { FileUploadComponent } from './content/profiling/file-upload/file-upload.component';
import { MapsComponent } from './content/maps/maps.component';
import { LocationComponent } from './content/admin-accounts/location/location.component';
import { PreloaderComponent } from './shared/preloader/preloader.component';
import { PmcComponent } from './content/pmc/pmc.component';
import { AhydComponent } from './content/ahyd/ahyd.component';
import { FooterComponent } from './content/footer/footer.component'


const routes: Routes = [
  
  { path:'comments/cpdb/:id', component:CommentCpdbComponent},  
  { path:'comments/births/:id', component:CommentBirthsComponent},  
  { path:'comments/deaths/:id', component:CommentDeathsComponent},  
  { path:'comments/in-migration/:id', component:CommentInMigComponent},  
  { path:'comments/out-migration/:id', component:CommentOutMigComponent},  
  { path:'comments/marriages/:id', component:CommentMarriagesComponent},  


  { path:'test', component:TestsComponent},  
  { path:'search', component:SearchComponent},  


  
  { path:'home', component:HomeComponent},  
  { path:'statistics', component:StatisticsComponent},  
  { path:'cms', component:CmsComponent},  
  { path:'content-lists', component:ContentsListComponent},   

  { path:'content/:title/:id', component:ShowContentComponent},  

   { path:'cpdb', component:CpdbComponent},  
  { path:'deaths', component:DeathsComponent},  
  { path:'births', component:BirthsComponent},  
  { path:'in-mig', component:InMigComponent},  
  { path:'out-mig', component:OutMigComponent},  
  { path:'marriages', component:MarriagesComponent},  

  { path:'admin-accounts', component:AdminAccountsComponent},  
  { path:'admin/:id', component:ShowAdminStatusComponent}, 
  { path:'new-admin', component:AdministratorsComponent},  
  { path:'logs', component:LogsComponent},  
 
  { path:'profiling', component:ProfilingComponent},
  { path:'pmc', component:PmcComponent}, 
  { path:'ahyd', component:AhydComponent},  


  { path:'user-manual', component:UserManualComponent},
  { path:'conversations', component:ConversationsComponent },  
  { path:'account', component:AccountComponent},  
  { path:'backup-adn-restore', component:BackupAndRestoreComponent}, 
  { path:'aww-snap', component:PageNotFoundComponent},  


  { path:'', component:AuthenticateComponent},  
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarMobileComponent,
    DropdownComponentMobile,
    MobileAuthenticationComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DashoardComponent,
    CmsComponent,
    ProfilingComponent,
    AccountComponent,
    PreviewComponent,
    ContentsListComponent,
    StatisticsComponent,
    UserManualComponent,
    ConversationsComponent,
    AdminAccountsComponent,
    AdministratorsComponent,
    ShowContentComponent,
    BackupAndRestoreComponent,
    PageNotFoundComponent,
    DeathsComponent,
    BirthsComponent,
    InMigComponent,
    OutMigComponent,
    MarriagesComponent,
    DeathsTableComponent,
    BirthsTableComponent,
    InMigsTableComponent,
    OutMigsTableComponent,
    MarriageTableComponent,
    AlertsComponent,
    CreateComponent,
    AuthenticateComponent,
    CpdbComponent,
    IconsComponent,
    DropdownComponent,
    SearchComponent,
    ProfileShowComponent,
    ShowProfileComponent,
    ShowAdminStatusComponent,
    LogsComponent,
    CpdbTableComponent,
    TestsComponent,
    ActionButtonsComponent,
    RoleComponent,
    TableAdministratorComponent,
    ActionButtonAdminComponent,
    TableCpdbComponent,
    RecordStatusComponent,
    ActionButtonsCpdbComponent,
    RecordStatusDeathsComponent,
    ActionButtonsDeathsComponent,
    TableDeathsComponent,  
    TableBirthsComponent,
    StatusBirthComponent,
    ActionButtonsBirthComponent,
    ActionButtonsInMigsComponent,
    TableInMigsComponent,
    StatusInMigsComponent,
    StatusOutMigsComponent,
    TableOutMigsComponent,
    ActionButtonsOutMigsComponent,
    ActionButtonsMarriageComponent,
    StatusMarriageComponent,
    TableMarriageComponent,
    TableLogseComponent,
    ActionButtonsLogsComponent,
    RoleLogsComponent,
    BirthsSearchComponent,
    DeathsSearchComponent,
    AdminSearchComponent,
    InMigsSearchComponent,
    OutMigsSearchComponent,
    MarriagesSearchComponent,
    CpdbSearchComponent,
    RecordStatusDeathsComponent,
    DeviceComponent,
    CommentCpdbComponent,
    CommentBirthsComponent,
    CommentDeathsComponent,
    CommentInMigComponent,
    CommentOutMigComponent,
    CommentMarriagesComponent,
    MapLogsComponent,
    NewQuickLinksComponent,
    QuickLinksListComponent,
    UpdateContentComponent,
    UpdateQuickLinkComponent,
    ShowQuickLinkComponent,
    FileUploadComponent,
    MapsComponent,
    LocationComponent,
    PreloaderComponent,
    PmcComponent,
    AhydComponent,
    FooterComponent,
    

  ],
  imports: [
    ChartsModule,
    TreeNgxModule,
    NgxPaginationModule,
    ResponsiveModule,
    BrowserModule,
    NgxFileDropModule,
    FormsModule,
    AppRoutingModule,
    [RouterModule.forRoot(routes)],
    CarouselModule ,
    BrowserAnimationsModule,
    GoogleChartsModule,
    LeafletModule,
    SlideToggleModule,
    HttpClientModule,
    TextareaAutosizeModule,
    NetworkStatusAngularModule.forRoot(),
    TooltipModule,
    Ng2OdometerModule.forRoot(),
    AgTableModule,
    NgxPaginationModule,
    AgGridModule.withComponents([

      // -----admin----------------
      ActionButtonAdminComponent,
      RoleComponent,
      LocationComponent,

      // -----logs----------------
      ActionButtonsLogsComponent,
      RoleLogsComponent,
      DeviceComponent,
      MapLogsComponent,

      // -----cpdb----------------
      ActionButtonsCpdbComponent,
      RecordStatusComponent,

      // -----deaths----------------   
      ActionButtonsDeathsComponent,
      RecordStatusDeathsComponent,

      // -----births----------------
      ActionButtonsBirthComponent,
      StatusBirthComponent,

      // -----in migration----------------
      ActionButtonsInMigsComponent,
      StatusInMigsComponent,

      // -----out migration----------------
      ActionButtonsOutMigsComponent,
      StatusOutMigsComponent,
      
      // -----marriages----------------
      ActionButtonsMarriageComponent,
      StatusMarriageComponent,



      
    
    ])
    // ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

    
  ], 
  exports: [RouterModule],
  providers: [    
    {
      provide: AgTableCustomSettings,
      useValue: { lang: 'en-US' } // Default is 'en-US'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
