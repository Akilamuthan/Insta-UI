import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CommentService } from '../comment.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

interface Comment {
  content: string;
 
}

@Component({
  selector: 'app-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  postId: any;
  commentId: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location
  ) {
    this.form = this.fb.group({
      comment: ['', [Validators.required]],  
    });
  }

  ngOnInit(): void {
    
    this.postId = this.route.snapshot.paramMap.get('id');
    this.commentId = this.route.snapshot.paramMap.get('commentId');
    
    console.log(`Post ID: ${this.postId}, Comment ID: ${this.commentId}`);
  }

  updateComment(): void {
    if (this.form.invalid) {
      return;
    }
  
    const content = this.form.value.comment;
  
    if (!this.postId || !this.commentId) {
      this.errorMessage = 'Invalid post or comment ID';
      return;
    }
  
    this.loading = true;
    console.log('Updating comment with content:', content);
  

    this.commentService.updateComment(this.postId, this.commentId, content)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (response) => {
          console.log('Comment updated successfully:', response);
          this.location.back();
        },
        error: (err) => {
          console.error('Error updating comment:', err);
          this.errorMessage = 'Error updating comment';
          this.router.navigate(['/login']);
        },
        complete: () => {
          this.loading = false;
        }
      });
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
