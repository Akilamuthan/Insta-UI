import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';

interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  file_type: string;
  file_path: string;
  user_id: string;
  category_id: string;
  post_type: string;
}

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {
  posts: any;
  isLoading = true;
  user:any;
  imageUrl: string = 'http://127.0.0.1:8000/download/';
  private subscriptions: Subscription = new Subscription();

  constructor(private HomeService: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }


  loadPosts() {
    const categorySubscription = this.HomeService.getPosts().subscribe({
      next: (response: Post[]) => {
        console.log('API Response:', response);
        this.posts = response; 
        this.isLoading = false; 
        console.log('Posts:', this.posts);
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
      }
    });
    this.subscriptions.add(categorySubscription);


    
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  
  update(post: Post) {
    console.log('Update post', post.id);
    this.router.navigate([`/login`]);
  }

  
  delete(postId: number) {
    console.log('Delete post', postId);
    this.router.navigate([`/login`]);
  }
}
