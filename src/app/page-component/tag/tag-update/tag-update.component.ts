import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from '../tag.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tag-update',
  templateUrl: './tag-update.component.html',
  styleUrls: ['./tag-update.component.css']
})
export class TagUpdateComponent implements OnInit, OnDestroy {
  tagId!: number;
  form: FormGroup;
  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  errorMessage: string | null = null;
  admin:any;
  user:any;
  adminuser:any;
  name:any;

  constructor(
    private fb: FormBuilder,
    private TagService: TagService,
    private router: Router,
    private route: ActivatedRoute,
    private location:Location  

  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
   this.getUser();
    this.route.paramMap.subscribe((params) => {
      this.tagId = +params.get('id')!; 
    });
  }

  getUser() {
    this.TagService.getUser().subscribe({
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
            this.router.navigate(['/']);
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


  updateTag(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please enter a valid name.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;
    const formData = this.form.value;
    console.log('Form Data:', formData);

    this.subscription.add(
      this.TagService.tagupdate(this.tagId, formData).subscribe({
        next: (response) => {
          console.log('Tag updated successfully:', response);
          this.location.back();
        },
        error: (err) => {
          console.error('Error updating tag:', err);
          this.errorMessage = 'Failed to update the tag. Please try again later.';
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

