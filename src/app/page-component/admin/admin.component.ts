import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { HomeService } from '../home/home.service';
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
  userAll:any;
  posts:any;

  constructor(private apiService: ApiService, private router: Router,private HomeService:HomeService) {}

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

    this.HomeService.userAll().subscribe({
      next:(userAll)=>{
        this.userAll=userAll;
        console.log(this.userAll.length);
      },
      error:(err)=>{
        console.log(err);
      }
    })

    this.HomeService.userAll().subscribe({
      next:(userAll)=>{
        this.userAll=userAll;
        console.log("users",this.userAll.length);
      },
      error:(err)=>{
        console.log(err);
      }
    });

    this.HomeService.getPosts().subscribe({
      next:(posts)=>{
        this.posts=posts;
        console.log("posts",this.posts.posts);
      },
      error:(err)=>{
        console.log(err);
      }
    })


  }
}
