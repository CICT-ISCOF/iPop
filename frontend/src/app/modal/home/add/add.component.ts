import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/content/sliders-and-quiclinks/slide.service';
import { UtilityService } from 'src/app/others/utility.service';
import { Modal } from '../../modal.service';

@Component({
  selector: 'AddSlider',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    constructor (
        private SlideService: SlideService,
        private UtilityService: UtilityService,
        private Modal: Modal
  ) { }
  

    ngOnInit(): void {
      	this.getSlide()
    }
    
    slides = []
	getSlide(){
		this.SlideService.retrieve().subscribe(data => {
           setTimeout(() => {
               this.slides = data
           }, 100);
        })
    }
    
	newImages = []
    triggerImage(){
		document.getElementById('slider').click()
	}
	clearSlider(){
		this.newImages = []
	}

	readURL(files: FileList,event,type){	
		this.clearSlider()
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
					let img = (<FileReader>event.target).result		
					const toBase64Img = img.toString().split(',')
					if(type == 'video'){		
						this.newImages.push(img ) 															
					}	
					else{	
						this.newImages.push(img) 	
					}
				}	
			})	
		}			
    }
    
    isLoading = false
    save() {
        this.isLoading = true
		let data = {}
		data['photos'] = this.newImages
		this.SlideService.create(data).subscribe(data => {
			this.UtilityService.setAlert('Added an Images to slider', 'success')
            this.clearSlider()
            this.Modal.close()
            this.isLoading = false
		})	
	}
    
    
  

}
