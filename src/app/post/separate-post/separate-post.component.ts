import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Define types for User and Post (assuming their structure based on your code)
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  content: string;
  user_id: number;
  likes: any[];
  dislikes: any[];
  file_path: string;
}
interface Follower {
  followers: string;
  user_id: string;
}


@Component({
  selector: 'app-separate-post',
  templateUrl: './separate-post.component.html',
  styleUrls: ['./separate-post.component.css']
})
export class SeparatePostComponent implements OnInit, OnDestroy {
  user: any;
  posts: any;
  postId: number = 0; 
  comments: any;
  likes:any;
  dislikes:any;
  followCheck:any;
  comment: any;
  follow: Follower[] = [];
  form: FormGroup; 
  errorMessage: string = '';
  view:any;

  length:any;
  postUser:any;
  imageUrl: string = 'http://127.0.0.1:8000/download/'; 
  private subscriptions: Subscription = new Subscription(); 

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,  
  ) {
    // Initialize the form with validation
    this.form = this.fb.group({
      comment: ['', [Validators.required]],  
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.postId = +params['id']; 
      console.log('Post ID:', this.postId);
    });

  }

  getUser() {
    this.postService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user.user;
          console.log("user",user);
          this.loadPosts(this.postId); 

          this.follow = user.follower;
          console.log("followers", this.follow);

        
         

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

  loadPosts(id: number) {
    const commentSubscription = this.postService.commentShow(id).subscribe({
      next: (comments: any) => {
        this.comments = comments.comment;
        console.log(this.comments);
      }
    });
  
    const likeSubscription = this.postService.like(id).subscribe({
      next: (like: any) => {
        this.likes = like;
        console.log("likes count", this.likes);
      }
    });
  
    const disSubscription = this.postService.dislikeCount(id).subscribe({
      next: (dislike: any) => {
        this.dislikes = dislike;
        console.log("dislikes count", this.dislikes);
      }
    });
  
    const categorySubscription = this.postService.Post(id).subscribe({
      next: (response: any) => {
        this.posts = response;
        console.log("post", this.posts.id);
  
       
        const viewSubscription = this.postService.view(this.posts.id).subscribe({
          next: (response: any) => {
            console.log("View response", response);
          },
          error: (err: any) => {
            console.error('Error fetching view count:', err);
          }
        });

        const viewcountSubscription = this.postService.viewCount(this.posts.id).subscribe({
          next: (response: any) => {
            console.log("View count", response);
            this.view=response;
          },
          error: (err: any) => {
            console.error('Error fetching view count:', err);
          }
        });

        const postuserSubscription = this.postService.postUser(this.posts.user_id).subscribe({
          next: (response: any) => {
            console.log("post user", response);
        
            this.postUser = response;
            console.log(this.postUser);

            this.followCheck = this.follow.some(follower => 
          follower.user_id === this.user.id && follower.followers === this.posts.user_id);

            console.log(this.followCheck);

          
          },
          error: (err: any) => {
            console.error('Error fetching user data:', err);
          }
        });
        
  
        this.subscriptions.add(viewSubscription);
        this.subscriptions.add(viewcountSubscription);
        this.subscriptions.add(postuserSubscription);
      },
      error: (err) => {
        console.error('Error loading post:', err);
        this.router.navigate(['/login']);
      }
    });
  
    this.subscriptions.add(commentSubscription);
    this.subscriptions.add(likeSubscription);
    this.subscriptions.add(disSubscription);
    this.subscriptions.add(categorySubscription);
  }
  

  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe(); 
    }
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
        console.log("",this.posts.id);
      },
      error: (err: any) => {
        console.error('Error fetching posts:', err);
      }
    });
  }



  createComment(id: number) {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid comment (at least 3 characters).';
      return;
    }

    const formData = this.form.value; 
    console.log('Form Data:', formData);

    this.subscriptions.add(
      this.postService.create(this.postId, { content: formData.comment }).subscribe({
        next: (response) => {
          console.log('Comment created successfully:', response);
          this.router.navigate([`/posts/separate-posts/${this.postId}`]); 
        },
        error: (err) => {
          console.error('Error creating comment:', err);
          this.router.navigate(['/login']); 
        }
      })
    );
  }

  delteComment(id:any,Comment:any){
    this.subscriptions.add(
      this.postService.deleteComment(id,Comment).subscribe({
        next: (response) => {
          console.log('delete created successfully:', response);
          this.router.navigate([`/posts/separate-posts/${id}`]); 
        },
        error: (err) => {
          console.error('Error creating comment:', err);
          this.router.navigate(['/login']); 
        }
      })
    );
  }
  
  postReport(id:number){
    this.subscriptions.add(
      this.postService.postReport(id).subscribe({
        next: (response) => {
          console.log('report successfully:', response);
          this.router.navigate([`/posts/separate-posts/${id}`]); 
        },
        error: (err) => {
          console.error('Error creating comment:', err);
          this.router.navigate(['/login']); 
        }
      })
    );
  }
  commentReport(id:number){
    this.subscriptions.add(
      this.postService.commentReport(id).subscribe({
        next: (response) => {
          console.log('report successfully:', response);
          this.router.navigate([`/posts/separate-posts/${id}`]); 
        },
        error: (err) => {
          console.error('Error creating comment:', err);
          this.router.navigate(['/login']); 
        }
      })
    );
  }




  Follow(id:number){
    this.subscriptions.add(
      this.postService.follow(id).subscribe({
        next: (response) => {
          console.log('follow successfully:', response);
          
        },
        error: (err) => {
          console.error('Error creating Follow:', err);
        
        }
      })
    );
  }
  unfollow(id:number){
    this.subscriptions.add(
      this.postService.unfollow(id).subscribe({
        next: (response) => {
          console.log('unfollow successfully:', response);
        },
        error: (err) => {
          console.error('Error creating unfollow:', err);
         
        }
      })
    );
  }
}
