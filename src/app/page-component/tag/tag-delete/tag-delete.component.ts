import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-delete',
  templateUrl: './tag-delete.component.html',
  styleUrls: ['./tag-delete.component.css']
})
export class TagDeleteComponent implements OnInit {
  tagId: any; 
user:any;
adminuser:any;
name:any;
admin:any;
  constructor(
    private TagService: TagService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.route.params.subscribe(params => {
      this.tagId = +params['id'];
      if (this.tagId) {
        this.categorydelete(this.tagId); 
      } else {
        console.log('Invalid category ID.');
      }
    });
  }

  getUser() {
    this.TagService.getUser().subscribe({
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

  categorydelete(tagId: number): void {
    console.log("Deleting category with ID:", tagId);
    if (!tagId) {
      console.log('Category ID is required to delete a category.');
      return;
    }

    this.TagService.deleteTag(tagId).subscribe(
      () => {
        console.log('Category deleted successfully');
        this.router.navigate(['/tags/show']);
      },
      error => {
        console.error('Error deleting category:', error);
        this.router.navigate(['/login']);
      }
    );
  }
}