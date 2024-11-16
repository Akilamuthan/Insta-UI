import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  postId!: number;

  constructor(
    private PostService: PostService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.postId = +params['id']; 
      this.deletePost();
    });
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
  
  deletePost(): void {
    if (!this.postId) {
      console.error('Post ID is required to delete a post.');
      return;
    }

    
    this.PostService.delete(this.postId).subscribe(() => {
      console.log('Post deleted successfully');
      this.router.navigate(['/posts/show']); 
    }, error => {

      console.error('Error deleting post:', error);
      this.router.navigate(['/login']);
    });
  }
}
