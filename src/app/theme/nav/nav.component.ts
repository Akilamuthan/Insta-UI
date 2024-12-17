import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  categories:any;
  selectedCategory: string = '';
  posts:any;
  constructor( private HomeService:HomeService) { }

  ngOnInit(): void {

    this.loaded();
    if (this.selectedCategory) {
      this.fetchPostsByCategory(this.selectedCategory);
    }

  }

  loaded(){
    this.HomeService.categoryShow().subscribe(
      (data) => {
        this.categories = data; 
        console.log("Fetched categories:", this.categories);  
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
  }

  getCategory(category: string) {
    this.fetchPostsByCategory(category); 
  }

  fetchPostsByCategory(category: string) {
    this.HomeService.getCategory(category).subscribe({
      next: (response: any) => {
        this.posts = response.posts;
        console.log(this.posts);
      
      },
      error: (err: any) => {
        console.error('Error fetching posts:', err);
        
      }
    });
  }

}
