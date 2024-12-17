import { Component, OnInit } from '@angular/core';
import { LikeDislikeService } from '../like-dislike.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-like',
  templateUrl: './delete-like.component.html',
  styleUrls: ['./delete-like.component.css']
})
export class DeleteLikeComponent implements OnInit {
  postId: any;
  likeId: any;

  constructor(
    private likeDislikeService: LikeDislikeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.postId = +params['id'];  
      this.likeId = +params['likeId']; 

      console.log(this.postId,this.likeId);

      if (this.postId && this.likeId) {
        this.deleteLike(this.postId, this.likeId);
      } else {
        console.error("Invalid postId or likeId");
      }
    });
  }

  getUser(): void {
    this.likeDislikeService.getUser().subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error fetching user', err);
        this.router.navigate(['/login']);
      }
    });
  }

  deleteLike(postId: number, likeId: number): void {
    if (!postId || !likeId) {
      console.error("Invalid postId or likeId");
      return;
    }

    this.likeDislikeService.deleteLike(postId, likeId).subscribe(
      response => {
        console.log('Like deleted successfully', response);
        this.router.navigate(['/posts/show']);
      },
      error => {
        console.error('Error deleting like', error);
        this.router.navigate(['/login']);
      }
    );
  }
}
