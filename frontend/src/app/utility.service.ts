import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {


	constructor() { }
	  
	private sidebarActive  = new Subject<any>();
	private userRole  = new Subject<any>();
	private pin  = new Subject<any>();
	private navText  = new Subject<any>();
	private logoutListener  = new Subject<any>();
	private dropdown  = new Subject<any>();
	private sideBarColor  = new Subject<any>();
	private sidebarBackground  = new Subject<any>();
	private sidebarImage = new Subject<any>();
	private alert = new Subject<any>();
	


	setAlert(message,type) {
	
		const success = new Audio('../assets/audio/success.mp3')
		const info = new Audio('../assets/audio/info.mp3')
		const error = new Audio('../assets/audio/error.mp3')
		if(type == 'success'){
			success.play()
		}
		else if (type == 'error'){
			error.play()
		}
		else{
			info.play()
		}
		this.alert.next({message,type});	
	}

	getAlert(){
		return this.alert.asObservable();
	}

	// ------------------


	setImage(boolean) {
		this.sidebarImage.next(boolean);			
	}

	getImage(){
		return this.sidebarImage.asObservable();
	}

	// ------------------


	seBackground(boolean) {
		this.sidebarBackground.next(boolean);			
	}

	geBackground(){
		return this.sidebarBackground.asObservable();
	}

	// ----------------------------------

	seColor(color) {
		this.sideBarColor.next(color);			
	}

	geColor(){
		return this.sideBarColor.asObservable();
	}

	// ----------------------------------

	setDropDown(boolean) {
		this.dropdown.next(boolean);			
	}

	getDropDown(){
		return this.dropdown.asObservable();
	}

	// ----------------------------------

	setNavText(text) {
		this.navText.next(text);			
	}

	getNavText(){
		return this.navText.asObservable();
	}

	// ----------------------------------

	logout(boolean) {
		this.logoutListener.next(boolean);			
	}

	getLogoutValue(){
		return this.logoutListener.asObservable();
	}

	// ----------------------------------

	setLoginWithPin(boolean) {
		this.pin.next(boolean);			
	}

	getLoginWithPin(){
		return this.pin.asObservable();
	}

	// ----------------------------------
	
	setSidebarItemasActive(item) {
		this.sidebarActive.next(item);
	
	}

	getActiveItemonSidebar(){
		return this.sidebarActive.asObservable();
	}

	// ----------------------------------

	setUserRole(role) {
		this.userRole.next(role);		
	
	}

	getUserROle(){
		return this.userRole.asObservable();
	}



}
