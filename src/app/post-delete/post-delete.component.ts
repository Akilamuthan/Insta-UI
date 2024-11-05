import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Import ApiService
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  postId!: number;

  constructor(
    private apiService: ApiService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = +params['id']; 
      this.deletePost();
    });
  }

 
  deletePost(): void {
    if (!this.postId) {
      console.error('Post ID is required to delete a post.');
      return;
    }

    
    this.apiService.delete(this.postId).subscribe(() => {
      console.log('Post deleted successfully');
      this.router.navigate(['/home']); 
    }, error => {
      console.error('Error deleting post:', error);
    });
  }
}
