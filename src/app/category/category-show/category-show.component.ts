import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
@Component({
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  styleUrls: ['./category-show.component.css']
})
export class CategoryShowComponent implements OnInit {
  categories: any;
  tags: any;
  isLoading = true;
  user: any;
  userID: any;
  admin:any;
  adminuser:any;
  name:any;
  private subscriptions: Subscription = new Subscription();

  constructor(private CategoryService: CategoryService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
   
    this.load();

  }

  
  load(): void {

    const categorySubscription = this.CategoryService.categoryShow().subscribe({
      next: (response) => {
        console.log('Categories:', response);
        this.categories = response;
        this.isLoading = false;
      },
      error: () => {
        console.error('Error loading categories');
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });
    this.subscriptions.add(categorySubscription);

  }

  ngOnDestroy(): void {
    this.getUser();
    this.subscriptions.unsubscribe();
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
            this.router.navigate(['/category/show']);
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


  //delete
  categoryDelete(categoryId:number): void {
    if (!categoryId) {
      console.error('User ID is required to update a category.');
      return;
    }
    this.router.navigate([`/category/delete/${categoryId}`]); 
  }



  categoryUpdate(categoryId:number): void {
    if (!categoryId) {
      console.error('User ID is required to update a category.');
      return;
    }
    this.router.navigate([`/category/update/${categoryId}`]); 
  }

}
