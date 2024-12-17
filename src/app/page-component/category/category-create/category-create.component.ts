import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit, OnDestroy {
  admin:any;
  user:any;
  adminuser:any;
  name:any;
  form: FormGroup;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor( private fb: FormBuilder, private CategoryService: CategoryService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],  
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.CategoryService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.user = user;  
          console.log(user);
          this.adminuser = user;  
          console.log(user);

          this.admin = this.adminuser.roles;
          console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

          this.user = user.user; 
          this.name=this.user.name;
          console.log("user",this.name);
  
          if (this.admin) {
            console.log('Navigating to admin page');
           
          } else {
            console.log('Navigating to posts page');
            this.router.navigate(['/posts/show']);
          }
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
      this.CategoryService.categoryCreate(formData).subscribe({
        next: (response) => {
          console.log('Tag created successfully:', response);
         
        },
        error: (err) => {
          console.error('Error creating tag:', err);
          this.errorMessage = 'Failed to create the tag. Please try again later.';
          this.router.navigate(['/login']);
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
