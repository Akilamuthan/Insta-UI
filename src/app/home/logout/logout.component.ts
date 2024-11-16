import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  ngOnInit(): void {
    this.logout()
  }

  constructor(private HomeService: HomeService, private router: Router) {}

  logout() {
    this.HomeService.logout().subscribe({
      next: () => { 
        localStorage.removeItem('access_token');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Logout failed', err);
        this.router.navigate(['/home']);
      },
    });
  }
  
}
