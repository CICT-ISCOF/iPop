import { UtilityService } from '../../../others/utility.service';
import { Component, OnInit } from '@angular/core';
import { CmsService } from '../cms.service'
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/app/others/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-new-quick-links',
  templateUrl: './new-quick-links.component.html',
  styleUrls: ['./new-quick-links.component.scss']
})
export class NewQuickLinksComponent implements OnInit {

	constructor(
		private CmsService : CmsService,
		private UtilityService : UtilityService,
	) { }
    
	ngOnInit(): void {

	}
	src = '../../../../assets/avatars/girl-black.png'
	article ={
		files : [],
		title:'',
		body:''
	}

	clearEverything(){
		this.
		article ={
			files : [],
			title:'',
			body:''
		}
		this.imagesToRender = []
	}

	imagesToRender = []

	readURL(files: FileList,event){	
		this.article.files = []
		if (event.target.files && event.target.files[0]) {	
			Object.keys(files).forEach(i => {				
				const reader = new FileReader();   
				reader.readAsDataURL(event.target.files[i]);   		     
				reader.onload = (event) => {	
					let img = (<FileReader>event.target).result		
					const toBase64Img = img.toString().split(',')	
					this.article.files.push( toBase64Img[1] )					
					this.imagesToRender.push( img )
				}					 						
			})	
		}	
	}

	triggerInput(){
		document.getElementById('quick-link-picture').click()
	}
    
    saveQuicLink() {
        if ( this.article.title == "" || this.article.body == "" ) {
            Swal.fire( 'Title or body is empty', '', 'error' )
            return
        }
		this.CmsService.saveArticle(this.article).subscribe(data => {
			this.article ={
				files : [],
				title:'',
				body:''
            }
            if ( JSON.parse( localStorage.getItem( 'user-data' ) ).user.roles[ 0 ].name != 'Super Admin' ) {
                Swal.fire( 'Article has been submitted to the Super Admin', 'Please wait for its approval', 'info' )
                return
            }
            Swal.fire( 'New Article successfully posted', '', 'success' )
		})
	}
	
	customOptions: OwlOptions = {	
		center: true,
		items:2,
		loop:true,
		margin:0,
	   
		navSpeed: 700,
		autoplay:true,	
		autoplayTimeout:200000,
		responsive:{
			600:{
				items:1.3
			}
		}
	}
}
