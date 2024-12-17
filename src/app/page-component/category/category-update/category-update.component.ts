import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit , OnDestroy {
  form: FormGroup;
  id:any;
admin:any;
user:any;
adminuser:any;
name:any;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;


  constructor(private fb: FormBuilder, private CategoryService: CategoryService, private router: Router,
    private route: ActivatedRoute) {
    this.form = this.fb.group({
      name: ['', [Validators.required
      ]], 
    });
  }

  ngOnInit(): void {
    this.getUser();
    this.id = +this.route.snapshot.paramMap.get('id')!; 
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
            this.router.navigate(['/category/create']);
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
      this.CategoryService.categoryupdate(this.id,formData).subscribe({
        next: (response) => {
          console.log('Tag updated successfully:', response);
          this.router.navigate(['/admin']); 
        },
        error: () => {
          console.error('Error creating tag:', );
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
