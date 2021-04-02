import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';
import { NetworkStatusAngularModule } from 'network-status-angular';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AgTableModule, AgTableCustomSettings } from 'ag-table';
import { AgGridModule } from 'ag-grid-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import {NgxPaginationModule} from 'ngx-pagination';
import { AgmCoreModule } from '@agm/core';
import { ResponsiveModule } from 'ngx-responsive'
import 'ag-grid-enterprise';
import { ShimmerModule } from '@sreyaj/ng-shimmer';
import { SlideToggleModule } from 'ngx-slide-toggle';

// components------------
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HomeComponent } from './content/header/home.component';
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
import { BackupAndRestoreComponent } from './content/backup-and-restore/backup-and-restore.component';
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
import { DropdownComponent } from './shared/navbar/dropdown/dropdown.component';
import { SearchComponent } from './content/search/search.component';
import { ShowProfileComponent } from './content/show-profile/show-profile.component';
import { ShowAdminStatusComponent } from './content/admin-accounts/show-admin-status/show-admin-status.component';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LogsComponent } from './content/logs/logs.component';
import { CpdbTableComponent } from './content/profiling/cpdb-table/cpdb-table.component';
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
import { LocationComponent } from './content/admin-accounts/location/location.component';
import { PmcComponent } from './content/pmoc/pmc.component';
import { AhydComponent } from './content/ahyd/ahyd.component';
import { FooterComponent } from './content/footer/footer.component';
import { MPCFDCComponent } from './content/mpc-fdc/mpc-fdc.component';
import { TeenCentersComponent } from './content/teen-centers/teen-centers.component';
import { PpoMandateComponent } from './content/general-public/about/ppo-mandate/ppo-mandate.component';
import { VmgComponent } from './content/general-public/about/vmg/vmg.component';
import { CoreValuesComponent } from './content/general-public/about/core-values/core-values.component';
import { OrgStructureComponent } from './content/general-public/about/org-structure/org-structure.component';
import { PersonnelDirectoryComponent } from './content/general-public/about/personnel-directory/personnel-directory.component';
import { AwardsComponent } from './content/general-public/about/awards/awards.component';
import { RPFPPComponent } from './content/general-public/program-areas/rpfpp/rpfpp.component';
import { AHYDPComponent } from './content/general-public/program-areas/ahydp/ahydp.component';
import { CPDBMPComponent } from './content/general-public/program-areas/cpdbmp/cpdbmp.component';
import { PDIComponent } from './content/general-public/program-areas/pdi/pdi.component';
import { RPFPPServicesComponent } from './content/general-public/services-offered/rpfpp-services/rpfpp-services.component';
import { ADHYDPServicesComponent } from './content/general-public/services-offered/adhydp-services/adhydp-services.component';
import { PDIServicesComponent } from './content/general-public/services-offered/pdi-services/pdi-services.component';
import { PDMServicesComponent } from './content/general-public/services-offered/pdm-services/pdm-services.component';
import { DynamicHomeComponent } from './content/sliders-and-quiclinks/dynamic-home.component';
import { ProvincialOfficialsComponent } from './content/provincial-officials/provincial-officials.component';
import { AhydTeamComponent } from './content/ahyd-team/ahyd-team.component';
import { GeneralComponent } from './content/population-data/general/general.component';
import { MigrationsComponent } from './content/population-data/migrations/migrations.component';
import { DeathsStatComponent } from './content/population-data/deaths-stat/deaths-stat.component';
import { BirthsStatComponent } from './content/population-data/births-stat/births-stat.component';
import { PMOCStatComponent } from './content/population-data/pmoc-stat/pmoc-stat.component';
import { SBMTCStatComponent } from './content/population-data/sbmtc-stat/sbmtc-stat.component';
import { SBMTCInfoComponent } from './content/population-data/sbmtc-info/sbmtc-info.component';
import { MPCAndFDCComponent } from './content/population-data/mpc-and-fdc/mpc-and-fdc.component';
import { ShowMpcFdcComponent } from './content/mpc-fdc/show-mpc-fdc/show-mpc-fdc.component';
import { ShowTeenCentersComponent } from './content/teen-centers/show-teen-centers/show-teen-centers.component';
import { FeaturedArticlesComponent } from './content/featured-articles/featured-articles.component';
import { ShowArticleComponent } from './content/featured-articles/show-article/show-article.component';
import { SbMembersComponent } from './content/provincial-officials/sb-members/sb-members.component';
import { AddNewTeenCenterComponent } from './content/teen-centers/add-new-teen-center/add-new-teen-center.component';
import { TeenCenterAhydTeamComponent } from './content/teen-centers/teen-center-ahyd-team/teen-center-ahyd-team.component';
import { MpcFdcTeamComponent } from './content/mpc-fdc/mpc-fdc-team/mpc-fdc-team.component';
import { ApprovalsComponent } from './shared/navbar/approvals/approvals.component';
import { AddMpcFdcComponent } from './content/mpc-fdc/add-mpc-fdc/add-mpc-fdc.component';
import { PopulationProfileByMunicipalityComponent } from './content/population-profile-by-municipality/population-profile-by-municipality.component';
import { AgeDistributionByMunicipalityComponent } from './content/age-distribution-by-municipality/age-distribution-by-municipality.component';
import { MunicipalityOfficialsComponent } from './content/officials-of/municipality-officials/municipality-officials.component';
import { BarangayOfficialsComponent } from './content/officials-of/barangay-officials/barangay-officials.component';
import { MainComponent } from './modal/main/main.component';
import { AddComponent } from './modal/home/add/add.component';
import { EditComponent } from './modal/home/edit/edit.component';
import { ShimmerComponent } from './shared/shimmer/shimmer.component';



const routes: Routes = [
    // COMMENTS 
    { path:'comments/cpdb/:id', component:CommentCpdbComponent},  
    { path:'comments/births/:id', component:CommentBirthsComponent},  
    { path:'comments/deaths/:id', component:CommentDeathsComponent},  
    { path:'comments/in-migration/:id', component:CommentInMigComponent},  
    { path:'comments/out-migration/:id', component:CommentOutMigComponent},  
    { path:'comments/marriages/:id', component:CommentMarriagesComponent},  
    // START-UP
    { path:'', component:AuthenticateComponent},  
    { path:'home', component:DynamicHomeComponent},  
    // DEMOGRAPHIC DATA
    { path:'profiling', component:ProfilingComponent},   
    { path:'cpdb', component:CpdbComponent},  
    { path:'deaths', component:DeathsComponent},  
    { path:'births', component:BirthsComponent},  
    { path:'in-mig', component:InMigComponent},  
    { path:'out-mig', component:OutMigComponent},  
    { path:'marriages', component:MarriagesComponent}, 
    // STATISITCS  
    { path:'population-data', component:StatisticsComponent},  
    { path:'demographic-data/births', component:BirthsStatComponent},
    { path:'demographic-data/deaths', component:DeathsStatComponent},
    { path:'demographic-data/migration', component:MigrationsComponent},
    // RPFP
    { path:'PMOC', component:PmcComponent},   
    { path:'MPC-FDC', component:MPCFDCComponent}, 
    // AHYD 
    { path:'Teen-Centers', component:TeenCentersComponent}, 
    // OTHERS
    // ABOUT 
    { path:'ABOUT/PPO-MADATE', component:PpoMandateComponent}, 
    { path:'ABOUT/VISION,MISSION,GOALS', component:VmgComponent},
    { path:'ABOUT/CORE-VALUES', component:CoreValuesComponent},     
    { path:'ABOUT/ORGANIZATIONAL-STRUCTURE', component:OrgStructureComponent},  
    { path:'ABOUT/PERSONNEL-DIRECTORY', component:PersonnelDirectoryComponent},  
    { path:'ABOUT/AWARDS', component:AwardsComponent},  
    // PROGRAM AREAS 
    { path:'PROGRAM-AREAS/Responsible-Parenthood-and-Family-Planning-Program', component:RPFPPComponent},
    { path:'PROGRAM-AREAS/Adolscent-Health-&-Youth-Development-Program', component:AHYDPComponent},
    { path:'PROGRAM-AREAS/Comprehensive-Population-Data-Banking-and-Management-Project', component:CPDBMPComponent},  
    { path:'PROGRAM-AREAS/Population-and-Development-Integration', component:PDIComponent},
    // SERVICES OFFERED 
    { path:'SERVICES-OFFERED/Responsible-Parenthood-and-Family-Planning-Program', component:RPFPPServicesComponent},
    { path:'SERVICES-OFFERED/Adolscent-Health-&-Youth-Development-Program', component:ADHYDPServicesComponent}, 
    { path:'SERVICES-OFFERED/Population-and-Development-Integration', component:PDIServicesComponent},
    { path:'SERVICES-OFFERED/Population Data Managment', component:PDMServicesComponent},  
        // PROGRAM AREAS 
    { path:'cms', component:CmsComponent},  
    { path:'content-lists', component:ContentsListComponent},   
    { path:'admin-accounts', component:AdminAccountsComponent},  
    { path:'admin/:id', component:ShowAdminStatusComponent}, 
    { path:'new-admin', component:AdministratorsComponent},  
    { path:'logs', component:LogsComponent},  
    { path:'roles', component:RoleComponent}, 
    // /SEACRH AND WEB SERVICES
    { path:'search', component:SearchComponent},  
    { path:'user-manual', component:UserManualComponent},
    { path:'conversations', component:ConversationsComponent },  
    { path:'account', component:AccountComponent},  
    { path:'backup-adn-restore', component:BackupAndRestoreComponent}, 
    { path:'population-profile-by-municipality', component:PopulationProfileByMunicipalityComponent}, 
    { path:'age-distribution-by-municipality', component:AgeDistributionByMunicipalityComponent},  
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
        BackupAndRestoreComponent,
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
        DropdownComponent,
        SearchComponent,
        ShowProfileComponent,
        ShowAdminStatusComponent,
        LogsComponent,
        CpdbTableComponent,
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
        LocationComponent,
        PmcComponent,
        AhydComponent,
        FooterComponent,
        MPCFDCComponent,
        TeenCentersComponent,
        PpoMandateComponent,
        VmgComponent,
        CoreValuesComponent,
        OrgStructureComponent,
        PersonnelDirectoryComponent,
        AwardsComponent,
        RPFPPComponent,
        AHYDPComponent,
        CPDBMPComponent,
        PDIComponent,
        RPFPPServicesComponent,
        ADHYDPServicesComponent,
        PDIServicesComponent,
        PDMServicesComponent,
        DynamicHomeComponent,
        ProvincialOfficialsComponent,
        AhydTeamComponent,
        GeneralComponent,
        MigrationsComponent,
        DeathsStatComponent,
        BirthsStatComponent,
        PMOCStatComponent,
        SBMTCStatComponent,
        SBMTCInfoComponent,
        MPCAndFDCComponent,
        ShowMpcFdcComponent,
        ShowTeenCentersComponent,
        FeaturedArticlesComponent,
        ShowArticleComponent,
        SbMembersComponent,
        AddNewTeenCenterComponent,
        TeenCenterAhydTeamComponent,
        MpcFdcTeamComponent,
        ApprovalsComponent,
        AddMpcFdcComponent,
        PopulationProfileByMunicipalityComponent,
        AgeDistributionByMunicipalityComponent,
        MunicipalityOfficialsComponent,
        BarangayOfficialsComponent,
        MainComponent,
        AddComponent,
        EditComponent,
        ShimmerComponent,
    ],
    imports: [
        SlideToggleModule,
        ShimmerModule,
        NgxPaginationModule,
        ResponsiveModule,
        BrowserModule,
        AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDEVqvIlmnz4zLo8eIPDP3x2CuRyiHZpm8'
        }),
        NgxFileDropModule,
        FormsModule,
        AppRoutingModule,
        [RouterModule.forRoot(routes)],
        CarouselModule ,
        BrowserAnimationsModule,
        GoogleChartsModule,
        HttpClientModule,
        TextareaAutosizeModule,
        NetworkStatusAngularModule.forRoot(),
        TooltipModule,
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
