import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  postId: number = 0; 
  commentContent: string = '';  

  constructor(
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ) { }

  ngOnInit(): void {
   
    this.route.params.subscribe(params => {
      this.postId = +params['id'];  
      console.log('Post ID:', this.postId);
    });
    this.createComment();
  }

  
  createComment(): void {
   

   
    this.subscription.add(
      this.commentService.create(this.postId, { content: this.commentContent }).subscribe({
        next: (response) => {
          console.log('Comment created successfully:', response);
          this.location.back(); 
        },
        error: (err) => {
          console.error('Error creating comment:', err);
          this.router.navigate(['/login']); 
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
