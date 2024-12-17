import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private HomeService: HomeService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    
  }


  login(): void {
    this.errorMessage = null; 
    if (this.form.valid) {
      this.loading = true;
      const loginData = this.form.value;
  
      this.HomeService.login(loginData)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            console.log('Login successful', response);
            this.loading = false;
            
            if (Array.isArray(response) && response.length > 0) {
              const token = response[0]; 
              if (token) {
                localStorage.setItem('token', token);
              } else {
                console.error('Token not received. Please try again.');
                this.errorMessage = 'Token not received. Please try again.';
              }
            } else {
              console.error('Unexpected response structure', response);
              this.errorMessage = 'Unexpected response structure. Please try again.';
            } 
            
           
            this.router.navigate(['/posts/show']).then(()=>{
                  location.reload();
            });
            
            
          },
          error => {
            this.loading = false;
            console.error('Login error:', error);
            
            this.errorMessage = 'Invalid email or password. Please try again.'; 
          }
        );
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
