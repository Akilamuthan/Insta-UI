import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: any;
  adminuser:any;
  name:any;
  admin: boolean = false; 

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getUser();
  }


  getUser() {
    this.apiService.getUser().subscribe({
      next: (user) => {
        if (user) {
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
}
