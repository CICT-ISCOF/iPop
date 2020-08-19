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

const routes: Routes = [
 
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
     
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    [RouterModule.forRoot(routes)],
    CarouselModule ,
    BrowserAnimationsModule,
    GoogleChartsModule,
    LeafletModule,
    SlideToggleModule,
    HttpClientModule,
    NetworkStatusAngularModule.forRoot(),
    TooltipModule,
    AgTableModule
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
