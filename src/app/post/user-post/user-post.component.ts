import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

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
  likes ?: Like[]; 
}

export interface Like {
  id: number;
  user_id: number;
  status: string;
}


@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  posts: Post[] = [];
  user: any = null;
  isLoading = true;
  admin: boolean = false;
  categories:any;
  followers:any;
  following:any;
  selectedCategory: string = '';
  imageUrl: string = 'http://127.0.0.1:8000/download/';
  private subscriptions: Subscription = new Subscription(); 

  constructor(private PostService:PostService,private router:Router) { }

  ngOnInit(): void {
    this.getUser();
    this.loadPosts();
    if (this.selectedCategory) {
      this.fetchPostsByCategory(this.selectedCategory);
    }
  }

  getUser() {
    this.PostService.getUser().subscribe({
      next: (user) => {
        if (user) {
      
          console.log(user);
        } else {
        
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
       
        console.error('Error fetching user', err);
        this.router.navigate(['/login']);
      }
    });
  }
  loadPosts() {

    this.PostService.categoryShow().subscribe(
      (data) => {
        this.categories = data; 
        console.log("Fetched categories:", this.categories);  
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );

    const categorySubscription = this.PostService.getPosts().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        this.posts = response.posts.map((post: any) => ({
          ...post,
          likes: Array.isArray(post.likes) ? post.likes : [] 
        }));

        this.user = response.user;
        console.log('User:', this.user);
        console.log('Roles:', this.user?.roles);

        this.admin = this.user?.roles[0]?.name === 'Admin';
        console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

        this.isLoading = false;
        console.log('Posts:', this.posts);
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });

    const followingSubscription = this.PostService.following().subscribe({
      next: (response: any) => {
        this.following=response;
        console.log("following",this.following);
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        
      }
    });


    const followeresSubscription = this.PostService.followers().subscribe({
      next: (response: any) => {
        this.followers=response;
        console.log("followers",this.followers);
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        
      }
    });



    this.subscriptions.add(categorySubscription);
    this.subscriptions.add(followingSubscription);
    this.subscriptions.add(followeresSubscription);
  }

  

  update(post: Post) {
    console.log('Updating post', post.id);
    this.router.navigate([`/posts/update/${post.id}`]);
  }

  delete(postId: number) {
    console.log('Deleting post', postId);
    this.router.navigate([`/posts/delete/${postId}`]);
  }

  like(id: number) {
    console.log(id);
    this.router.navigate([`/like/create/${id}`]);
  }

  dislike(id: number) {
    console.log(id);
    this.router.navigate([`/dislike/create/${id}`]);
  }

  deleteLike(id: number,likeId:number) {
    console.log(id,likeId);
    this.router.navigate([`/like/${id}/delete/${likeId}`]);
  }

  deleteDislike(id: number,likeId:number) {
    console.log(id,likeId);
    this.router.navigate([`/dislike/${id}/delete/${likeId}`]);
  }


  getCategory(category: string) {
    this.fetchPostsByCategory(category); 
  }

  fetchPostsByCategory(category: string) {
    this.PostService.getCategory(category).subscribe({
      next: (response: any) => {
        this.posts = response.posts;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching posts:', err);
        this.isLoading = false;
      }
    });
  }
}
