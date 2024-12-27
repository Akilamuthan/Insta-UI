import { Component, OnInit, OnDestroy,Output,Input,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
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
  likes?: Like[];
  dislikes?: Like[];
}

interface Like {
  id: number;
  status: string;
  user_id: any;
  post_id: any;
}

@Component({
  selector: 'app-post-show',
  templateUrl: './post-show.component.html',
  styleUrls: ['./post-show.component.css']
})
export class PostShowComponent implements OnInit, OnDestroy {
  data:any;
  posts: Post[]=[];
  form: FormGroup;
  forms: FormGroup;
  user: any = null;
  isLoading = true;
  admin: any;
  show: boolean = false;
  categories: any;
  selectedCategory: string = '';
  imageUrl: string = 'http://127.0.0.1:8000/download/';
  isAdmin: boolean = false;


  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private postService: PostService, private router: Router) {
    this.form = this.fb.group({
      searchQuery: [[Validators.required]]     
    });

    this.forms = this.fb.group({
      data: ['', Validators.required] 
    });

  }

  ngOnInit(): void {

    this.loadPosts();

    if (this.selectedCategory) {
      this.fetchPostsByCategory(this.selectedCategory);
    }
  }



  loadPosts() {
    const userRole = localStorage.getItem('token');
    this.isAdmin = userRole === 'Admin';
    console.log("role", this.isAdmin);

    this.postService.categoryShow().subscribe(
      (data) => {
        this.categories = data; 
        console.log("Fetched categories:", this.categories);  
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );

    const categorySubscription = this.postService.getPosts().subscribe({
      next: (response: any) => {
       this.posts = response.posts.map((post: any) => ({
          ...post,
         likes: Array.isArray(post.likes) ? post.likes : [],
         dislikes: Array.isArray(post.dislikes) ? post.dislikes : []
       }));
       console.log('posts',this.posts);
        this.user = response.user;
        console.log('user',this.user);
        console.log('Roles:', this.user?.roles);

        this.admin = this.user?.roles[0]?.name === 'Admin';
        console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

        this.isLoading = false;
        this.show=true;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        const categorySubscription = this.postService.unauthPost().subscribe({
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
    });

    this.subscriptions.add(categorySubscription);
  }

  hasUserLiked(post: Post): any {
    return post.likes?.some(like => like.user_id === this.user.id && like.status === 'like');
  }


  hasUserDisliked(post: Post): any {
    return post.dislikes?.some(dislike => dislike.user_id === this.user.id && dislike.status === 'dislike');
  }

  hasUserLikedOrDisliked(post: Post): boolean {
    return this.hasUserLiked(post) || this.hasUserDisliked(post);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  update(post: Post) {
    this.router.navigate([`/posts/update/${post.id}`]);
  }

  delete(postId: number) {
    this.router.navigate([`/posts/delete/${postId}`]);
  }

  like(id: number) {
    this.router.navigate([`/like/create/${id}`]);
  }

  dislike(id: number) {
    this.router.navigate([`/dislike/create/${id}`]);
  }

  deleteLike(id: number, likeId: number) {
    this.router.navigate([`/like/${id}/delete/${likeId}`]);
  }

  deleteDislike(id: number, likeId: number) {
    this.router.navigate([`/dislike/${id}/delete/${likeId}`]);
  }

  getCategory(category: string) {
    this.fetchPostsByCategory(category); 
  }

  fetchPostsByCategory(category: string) {
    this.postService.getCategory(category).subscribe({
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

/*
  onSearch(){

    const onSearch = this.form.value;
    console.log(onSearch);
    this.postService.onsearch().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;  
          console.log(user);

          this.admin = this.user?.roles?.some((role: any) => role.name === 'Admin');
          console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

  
          if (this.admin) {
            console.log('Navigating to admin page');
            this.router.navigate(['/category/show']);
          } else {
            console.log('Navigating to posts page');
            this.router.navigate(['/']);
          }
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
*/

  pericularpost() {
const data=this.forms.value;
  
    this.postService.pericularpost(data.data).subscribe({
      next: (post: any) => {
        console.log(post);
        this.posts = post; 
       
      },
      error: (err) => {
        console.error(err); 
      }
    });
  }
  
  }
