import { Component, OnInit, OnDestroy,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';


interface Post {
  id: number;
  title: string;
  content: string;
  description: string;
  file_type: string;
  file_path: string;
  user_id: string;
  category_id: string;
  post_type: string;
  likes?: Like[];
  dislikes?: Like[];
}

interface Like {
  id: number;
  status: string;
  user_id: any;
  post_id: any;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() posts: Post[]=[];

  form: FormGroup;
  user: any = null;
  isLoading = true;
  admin: any;
  categories: any;
  selectedCategory: string = '';
  imageUrl: string = 'http://127.0.0.1:8000/download/';
  isAdmin: boolean = false;
  menu:boolean=false;
  private subscriptions: Subscription = new Subscription();

  constructor(private fb: FormBuilder,private HomeService:HomeService, private router: Router) {
    this.form = this.fb.group({
      searchQuery: [[Validators.required]]     
    });
  }

  ngOnInit(): void {

    this.loadPosts();
    if (this.selectedCategory) {
      this.fetchPostsByCategory(this.selectedCategory);
    }
    
  }

  loadPosts() {
    const userRole = localStorage.getItem('token');
    this.isAdmin = userRole === 'Admin';
    console.log("role", this.isAdmin);

    this.HomeService.categoryShow().subscribe(
      (data) => {
        this.categories = data; 
        console.log("Fetched categories:", this.categories);  
      },
      (error) => {
        console.error("Error fetching categories:", error);
      }
    );

    const categorySubscription = this.HomeService.getPosts().subscribe({
      next: (response: any) => {
        this.posts = response.posts.map((post: any) => ({
          ...post,
          likes: Array.isArray(post.likes) ? post.likes : [],
          dislikes: Array.isArray(post.dislikes) ? post.dislikes : []
        }));
        this.user = response.user;

        console.log('Roles:', this.user?.roles);

        this.admin = this.user?.roles[0]?.name === 'Admin';
        console.log('Role:', this.admin ? 'Admin' : 'Not Admin');

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading posts:', err);
        this.isLoading = false;
        const categorySubscription = this.HomeService.unauthPost().subscribe({
          next: (response: Post[]) => {
            console.log('API Response:', response);
            this.posts = response; 
            this.isLoading = false; 
            console.log('Posts:', this.posts);
          },
          error: (err) => {
            console.error('Error loading posts:', err);
            this.isLoading = false;
          }
        });
        this.subscriptions.add(categorySubscription);
    
      }
    });

    this.subscriptions.add(categorySubscription);
  }



  getCategory(category: string) {
    this.fetchPostsByCategory(category); 
  }

  fetchPostsByCategory(category: string) {
    this.HomeService.getCategory(category).subscribe({
      next: (response: any) => {
        this.posts = response.posts;
        console.log('post  category',this.posts);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching posts:', err);
        this.isLoading = false;
      }
    });
  }

  home(){
    this.router.navigate(['/']).then(()=>{
      location.reload();
    })
  }

  onHover(isHovered: boolean): void {
    this.menu = isHovered;
  }
}
