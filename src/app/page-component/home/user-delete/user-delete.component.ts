import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from '../home.service';
import {  ActivatedRoute } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  form: FormGroup;
  errorMessage: string | null = null;
  loading: boolean = false;
  id:any;
  user:any;
  private unsubscribe$ = new Subject<void>();

  constructor(private fb: FormBuilder, private HomeService: HomeService, private router: Router, private route:ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!; 
    this.getUser();
  }

getUser(){
  this.HomeService.getUser().pipe(takeUntil(this.unsubscribe$)).subscribe(
    user=>{
      this.user=user.user;
       console.log('user',user.user);
    }
  )
}
  delete(): void {
    this.errorMessage = null; 
    if (this.form.valid) {
      this.loading = true;
      const data = this.form.value;
      console.log(data);
      if(this.user.email===data.email){
        console.log('start');
        this.HomeService.userDelete(this.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          response => {
            console.log('delete successful', response);
            this.loading = false;         
            this.router.navigate(['/']).then(()=>{
              location.reload()
            });
           
            
            
            
          },
          error => {
            this.loading = false;
            console.error('Login error:', error);
            
            this.errorMessage = 'Invalid email or password. Please try again.'; 
          }
        );
      }
      
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
