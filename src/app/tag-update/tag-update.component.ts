import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; 
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent implements OnInit , OnDestroy {
  form: FormGroup;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required
      ]], 
    });
  }

  ngOnInit(): void {}

  update_tag(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;  
    const formData = this.form.value;
    console.log('Form Data:', formData);

    this.subscription.add(
      this.apiService.tagupdate(formData).subscribe({
        next: (response) => {
          console.log('Tag updated successfully:', response);
          this.router.navigate(['/home']); 
        },
        error: () => {
          console.error('Error creating tag:', );
          this.errorMessage = 'Failed to create the tag. Please try again later.';
        },
        complete: () => {
          this.isLoading = false; 
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }

}
