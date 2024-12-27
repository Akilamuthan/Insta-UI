import { Component, OnInit } from '@angular/core';
import { LikeDislikeService } from '../like-dislike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-delete-dislike',
  templateUrl: './delete-dislike.component.html',
  styleUrls: ['./delete-dislike.component.css']
})
export class DeleteDislikeComponent implements OnInit {

  postId: any;
  likeId: any;

  constructor(
    private likeDislikeService: LikeDislikeService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location 
  ) { }

  ngOnInit(): void {
    
    this.getUser();

    
    this.route.params.subscribe(params => {
      this.postId = +params['id'];  
      this.likeId = +params['likeId']; 
       console.log(this.postId,this.likeId);
      if (this.postId && this.likeId) {
       
        this.deleteDislike(this.postId, this.likeId);
      } else {
        console.error("Invalid postId or likeId");
      }
    });
  }


  getUser() {
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


  deleteDislike(postId: number, likeId: number): void {
    if (!postId || !likeId) {
      console.error("Invalid postId or likeId");
      return;
    }


    this.likeDislikeService.deleteDislike(postId, likeId).subscribe(
      response => {
        console.log('Dislike deleted successfully', response);
  
        this.location.back();
      },
      error => {
        console.error('Error deleting dislike', error);

        this.router.navigate(['/login']);
      }
    );
  }
}
