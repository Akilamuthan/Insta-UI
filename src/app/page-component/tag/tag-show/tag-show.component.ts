import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-show',
  templateUrl: './tag-show.component.html',
  styleUrls: ['./tag-show.component.css']
})
export class TagShowComponent implements OnInit {

  categories: any;
  tags: any;
  isLoading = true;
  user: any;
  adminuser:any;
  name:any;
  userID: any;
  admin:any
  private subscriptions: Subscription = new Subscription();

  constructor(private TagService: TagService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
   this.getUser();
    this.load();

  }
  load(): void {

    const tagsSubscription = this.TagService.tagShow().subscribe({
      next: (response) => {
        console.log('Tags:', response);
        this.tags = response;
        this.isLoading = false;
      },
      error: () => {
        console.error('Error loading tags');
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    });
    this.subscriptions.add(tagsSubscription);
  }

  ngOnDestroy(): void {
    this.getUser();
    this.subscriptions.unsubscribe();
  }

  getUser() {
    this.TagService.getUser().subscribe({
      next: (user) => {
        if (user) {
          this.adminuser = user;  
          console.log(user);

          this.admin = this.adminuser.roles;
          console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

          this.user = user.user; 
          this.name=this.user.name;
          console.log("user",this.name);
        
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






  tagDelete(tagID: number): void {
    if (!tagID) {
      console.error('User ID is required to update a category.');
      return;
    }
    this.router.navigate([`/tags/delete/${tagID}`]); 
  }


  //update
  tagUpdate(tagID: number): void {
    if (!tagID) {
      console.error('User ID is required to update a category.');
      return;
    }
    console.log(tagID);
    this.router.navigate([`/tags/update/${tagID}`]); 
  }
}
