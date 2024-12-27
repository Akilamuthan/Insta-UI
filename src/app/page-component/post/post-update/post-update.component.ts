import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Location } from '@angular/common';

export interface YourDataType {
  post_type: string; 
  title: string;
  content: string;
  description: string;
  file_type: string;
  status: string;
  file_path: File;  
}

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  form: FormGroup; 
  loading = false; 
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  selectedFile: File | null = null;
  id: any; 
  categories:any;
  tags:any;
  userId:any;
  constructor(
    private PostService: PostService, 
    private fb: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private location: Location   
  ) {
    this.form = this.fb.group({
      post_type: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      description: ['', Validators.required],
      file_type: ['', Validators.required],
      category_id: ['', Validators.required],
      tag_id: ['', Validators.required],
      file_path:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.getUser();
    this.load();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  getUser() {
    this.PostService.getUser().subscribe({
      next: (user) => {
        if (user) {
      this.userId=user.user;
          console.log("user",this.userId.id);
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
  load(){
    this.PostService.categoryShow().subscribe(
      (data) => {
  
        this.categories = data; 
        console.log("categories:", this.categories);  
        
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );
    this.PostService.tagShow().subscribe(
      (data) => {
  
        this.tags = data; 
        console.log("tags:", this.tags);  
        
      },
      (error) => {
        console.error("Error fetching tags:", error);
      }
    );
    
  } 
  
  updatePost(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      
      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });

      formData.append('file_path', this.selectedFile, this.selectedFile.name);



      formData.append('user_id',this.userId.id)
      this.loading = true;

      this.PostService.update(this.id, formData).subscribe(
        response => {
          console.log('Data sent successfully', response);
          this.successMessage = 'Data sent successfully!';
          this.form.reset();
          this.selectedFile = null; 
          this.loading = false;
          this.location.back();
        },
        error => {
          this.loading = false;
          console.error('Error sending data', error);
          this.errorMessage = error.error?.message || 'Error sending data';

        }
      );
    } else {

      this.errorMessage = 'Form is invalid or no file selected';
      console.error('Form is invalid', this.form.errors);
    }
  }
}


