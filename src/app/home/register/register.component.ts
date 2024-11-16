import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';


interface ApiError {
  error?: {
    message?: string;
    errors?: { [key: string]: string[] };
  };
}

@Component({  
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private HomeService: HomeService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', [Validators.required, Validators.minLength(6)]],
      roll_no: ['', Validators.required],
      department: ['', Validators.required]
    }, { validators: this.passwordMatchValidator }); 
  }

  ngOnInit(): void {}




  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('password_confirm')?.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    console.log('Form submission started');
    
    if (this.form.valid) {
      const password = this.form.value.password;
      const passwordConfirm = this.form.value.password_confirm;
  
      console.log('Password:', password);
      console.log('Confirm Password:', passwordConfirm);
  
      if (password !== passwordConfirm) {
        this.errorMessage = 'Passwords do not match.';
        console.error('Passwords do not match');
        return;
      }
  
      this.loading = true;
      const formData = this.form.value;     
      console.log('Form Data:', formData);
  
      this.subscription.add(
        this.HomeService.register(formData).subscribe(
          response => {
            console.log('Signup successful', response);
            this.loading = false;
            this.errorMessage = null;
            this.form.reset(); 
            this.router.navigate(['/posts/show']);
          },
          (error: ApiError) => { 
            this.loading = false;
            console.error('Signup error:', error);
            this.errorMessage = this.extractErrorMessage(error);
          }
        )
      );
    } else {
      this.loading = false;
      this.errorMessage = 'Please fill in all required fields correctly.';
      console.error('Form is invalid', this.form.errors);
    }
  }
  

  
  private extractErrorMessage(error: ApiError): string {
    if (error.error?.errors) {
      const errorMessages = Object.values(error.error.errors).flat();
      return errorMessages.join(', ');
    }
    return error.error?.message || 'Signup failed';
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe(); 
  }
}
