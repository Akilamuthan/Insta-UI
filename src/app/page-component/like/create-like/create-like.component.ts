import { Component, OnInit } from '@angular/core';
import { LikeDislikeService } from '../like-dislike.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-like',
  templateUrl: './create-like.component.html',
  styleUrls: ['./create-like.component.css']
})
export class CreateLikeComponent implements OnInit {
  postId: any; 

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
      this.createLike(this.postId); 
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


  createLike(id: number): void {
    this.likeDislikeService.createLike(id).subscribe(
      response => {
        console.log('Like created successfully', response);
        this.location.back();
      },
      error => {
        console.error('Error creating like', error);
        this.router.navigate(['/login']);  
      }
    );
  }
}
