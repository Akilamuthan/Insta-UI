import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';

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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup; 
  loading = false; 
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  selectedFile: File | null = null;

  constructor(
    private PostService: PostService, 
    private fb: FormBuilder, 
    private router: Router
  ) {
    this.form = this.fb.group({
      post_type: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      description: ['', Validators.required],
      file_type: ['', Validators.required],
      status: ['', Validators.required],
      file_path: ['', Validators.required],
      category_id:['', Validators.required],
      tag_id:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.PostService.getUser().subscribe({
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
  

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  sendData(): void {
    if (this.form.valid && this.selectedFile) {
      const formData = new FormData();
      
      
      Object.keys(this.form.value).forEach(key => {
        formData.append(key, this.form.value[key]);
      });

    
      formData.append('file_path', this.selectedFile);

      this.loading = true;

      this.PostService.postData(formData).subscribe(
        response => {
          console.log('Data sent successfully', response);
          this.successMessage = 'Data sent successfully!';
          this.form.reset();
          this.selectedFile = null; 
          this.loading = false;
          this.router.navigate(['/posts/show']);
        },
        error => {
          console.log("error1");
          this.loading = false;
          console.error('Error sending data', error);
          this.errorMessage = error.error?.message || 'Error sending data';
          this.router.navigate(['/login']);
        }
      );
    } else {
      this.errorMessage = 'Form is invalid or no file selected';
      console.error('Form is invalid', this.form.errors);
    }
  }
}
