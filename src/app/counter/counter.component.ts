import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  currentUser: any;  
  user:any;
  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }


  loadPosts() {
    this.user=this.apiService.getUser();
    console.log("user",this.user);
    const postsSubscription = this.apiService.getPosts().subscribe({
      next: (response: Post) => {
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
    this.subscriptions.add(postsSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  
  update(post: Post) {
    console.log('Update post', post.id);
    this.router.navigate([`/posts/update/${post.id}`]);
  }

  
  delete(postId: number) {
    console.log('Delete post', postId);
    this.router.navigate([`/posts/delete/${postId}`]);
  }
}
