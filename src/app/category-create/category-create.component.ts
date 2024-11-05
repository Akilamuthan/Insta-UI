import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service'; 
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  
    });
  }

  ngOnInit(): void {}

  create_tag(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;  
    const formData = this.form.value;
    console.log('Form Data:', formData);

    this.subscription.add(
      this.apiService.categoryCreate(formData).subscribe({
        next: (response) => {
          console.log('Tag created successfully:', response);
          this.router.navigate(['/home']); 
        },
        error: (err) => {
          console.error('Error creating tag:', err);
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
