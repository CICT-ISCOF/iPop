import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/content/sliders-and-quiclinks/slide.service';
import { UtilityService } from 'src/app/others/utility.service';
import Swal from 'sweetalert2'

@Component( {
    selector: 'EditSlider',
    templateUrl: './edit.component.html',
    styleUrls: [ './edit.component.scss' ]
} )
export class EditComponent implements OnInit {

    constructor (
        private SlideService: SlideService,
        private UtilityService: UtilityService
    ) { }
    
    ngOnInit(): void {
        this.getSlide()
    }

    slides = []
    getSlide() {
        this.SlideService.retrieve().subscribe( data => {
            setTimeout( () => {
                this.slides = data
            }, 100 );
        } )
    }
    
    deletePhoto( id: any ) {
        Swal.fire( {
            title: 'Are you sure you want to delete this photo?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Later'
        } ).then( ( result ) => {
            if ( result.value ) {
                this.SlideService.deletePhoto( id ).subscribe( data => {
                    this.UtilityService.setAlert( 'Photo has been deleted', 'info' )
                    this.ngOnInit()
                } )
            }
        } )
    }

}
 