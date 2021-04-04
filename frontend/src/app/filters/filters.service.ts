import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

    private municipality = new Subject()
    setMunicipality(municipality:any) {
        this.municipality.next(municipality)
    }
    
    getMunicipality() {
        return this.municipality.asObservable()
    }
    
    private barangay = new Subject()
    setBarangay(barangay:any) {
        this.barangay.next(barangay)
    }
    
    getBarangay() {
        return this.barangay.asObservable()
    }
    
    private year = new Subject()
    setYear( year: any ) {
        this.year.next( year )
    }

    getYear() {
        return this.year.asObservable()
    }
    
    
    private trigger = new Subject()
    setTrigger( ) {
        this.trigger.next(  )
    }

    getTrigger() {
        return this.trigger.asObservable()
    }
}
