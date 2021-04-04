import { FeaturedArticlesService } from './featured-articles.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-featured-articles',
  templateUrl: './featured-articles.component.html',
  styleUrls: ['./featured-articles.component.scss']
})
export class FeaturedArticlesComponent implements OnInit {
    
    navs = ['All','Today','This Week','This Month']
    
    active = "All"

	constructor(
		private FeaturedArticlesService : FeaturedArticlesService
	) { 
		this.FeaturedArticlesService.triggerListener().subscribe(value =>{
			this.show = value
		})
	}
    
    makeActive( nav: any ) {
        this.isLoading = true
       setTimeout(() => {
           this.active = nav
           if ( nav == 'Today' ) {
               this.FeaturedArticlesService.today().subscribe( data => {
                   this.articles = data
                   this.isLoading = false
               } )
               return
           }
           if ( nav == 'This Week' ) {
               this.FeaturedArticlesService.week().subscribe( data => {
                   this.articles = data
                   this.isLoading = false
               } )
               return
           }
           if ( nav == 'This Month' ) {
               this.FeaturedArticlesService.month().subscribe( data => {
                   this.articles = data
                   this.isLoading = false
               } )
               return
           }
           this.ngOnInit()
       }, 1000);
    }
    

	ngOnInit(): void {
		this.getFeautredArticles()
	}

	articles :any = []

    isLoading = true
	getFeautredArticles(){
        this.isLoading = true
	setTimeout(() => {
        this.FeaturedArticlesService.getFeautredArticles().subscribe( data => {
            this.articles = data
            this.isLoading = false
        } )
    }, 1000);
	}

	show = false

	showArticle(article){
		this.show = true
		localStorage.setItem('article',JSON.stringify(article))		
	}

	tuncateString (string) {		
		const length = 300;	
		const ending = '...';	
		return string.substring(0, length - ending.length) + ending;
    }
    
    deleteArticle( id) {
        Swal.fire( {
            title: 'Are you sure you want to delete this article?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Remove',
            cancelButtonText: 'Nope'
        } ).then( ( result ) => {
            if ( result.value ) {
                this.FeaturedArticlesService.deleteArticle( id ).subscribe( data => {
                    this.ngOnInit()
                } )
            }
        })
        
        
    
    }
	

}
