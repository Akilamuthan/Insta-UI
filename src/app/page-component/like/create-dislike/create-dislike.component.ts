import { Component, OnInit } from '@angular/core';
import { LikeDislikeService } from '../like-dislike.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-dislike',
  templateUrl: './create-dislike.component.html',
  styleUrls: ['./create-dislike.component.css']
})
export class CreateDislikeComponent implements OnInit {

  postId: any; 

  constructor(
    private likeDislikeService: LikeDislikeService,
    private router: Router,
    private route: ActivatedRoute 
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.postId = +params['id'];  
      this.createDislike(this.postId); 
    });
  }

  getUser() {
    this.likeDislikeService.getUser().subscribe({
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

  createDislike(id: number): void {
    this.likeDislikeService.createDislike(id).subscribe(
      response => {
        console.log('disike created successfully', response);
        this.router.navigate(['/posts/show']);  
      },
      error => {
        console.error('Error creating like', error);
        this.router.navigate(['/login']);  
      }
    );
  }

}
