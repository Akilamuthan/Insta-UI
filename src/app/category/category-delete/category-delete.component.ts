import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  categoryId: any; 
admin:any;
user:any;
adminuser:any;
name:any;

  constructor(
    private CategoryService: CategoryService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.categoryId = +params['id'];
      if (this.categoryId) {
        this.categorydelete(this.categoryId); 
      } else {
        console.log('Invalid category ID.');
      }
    });
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
            this.router.navigate(['/category/create']);
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
  
  categorydelete(categoryId: number): void {
    console.log("Deleting category with ID:", categoryId);
    if (!categoryId) {
      console.log('Category ID is required to delete a category.');
      return;
    }

    this.CategoryService.deleteCategory(categoryId).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.router.navigate(['/admin']);
      },
      error => {
        console.error('Error deleting category:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}
