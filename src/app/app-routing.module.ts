import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

//post
import { PostShowComponent } from './post/post-show/post-show.component';
import { FormComponent } from './post/form/form.component';
import { PostDeleteComponent } from './post/post-delete/post-delete.component';
import { PostUpdateComponent } from './post/post-update/post-update.component';
import { UserPostComponent } from './post/user-post/user-post.component';
import { SeparatePostComponent } from './post/separate-post/separate-post.component';

//user 
import { CounterComponent } from './home/counter/counter.component'; 
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { LogoutComponent } from './home/logout/logout.component';

//category
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { CategoryShowComponent } from './category/category-show/category-show.component';
//tag 
import { TagCreateComponent } from './tag/tag-create/tag-create.component';
import { TagUpdateComponent } from './tag/tag-update/tag-update.component';
import { TagDeleteComponent } from './tag/tag-delete/tag-delete.component';
import { TagShowComponent } from './tag/tag-show/tag-show.component';


//like
import { CreateLikeComponent } from './like/create-like/create-like.component';
import { CreateDislikeComponent } from './like/create-dislike/create-dislike.component';
import { DeleteLikeComponent } from './like/delete-like/delete-like.component';
import { DeleteDislikeComponent } from './like/delete-dislike/delete-dislike.component';


//comment
import { CommentCreateComponent } from './comment/comment-create/comment-create.component';
import { CommentUpdateComponent } from './comment/comment-update/comment-update.component';

//Report
import { PostReportComponent } from './Report/post-report/post-report.component';
import { CommentReportComponent } from './Report/comment-report/comment-report.component';
import { ShowReportComponent } from './Report/show-report/show-report.component';



//header
import { HeaderComponent } from './home/header/header.component';

const routes: Routes = [

  { path: '', redirectTo: '/posts/show', pathMatch: 'full' },

//user
{ path: 'home', component: PostShowComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{path:'logout',component:LogoutComponent},

  
//post
{path:'posts/show',component:PostShowComponent},
{path:'posts/create',component : FormComponent},
{path:'posts/update/:id',component:PostUpdateComponent},
{path:'posts/delete/:id',component:PostDeleteComponent},
{path:'posts/user-posts',component:UserPostComponent},
{path:'posts/separate-posts/:id',component:SeparatePostComponent},
  
//tag
{ path: 'tags/create', component: TagCreateComponent },
{ path: 'tags/update/:id', component: TagUpdateComponent },
{ path: 'tags/delete/:id', component: TagDeleteComponent },
{path:'posts/create',component : FormComponent},
{ path: 'tags/show', component: TagShowComponent },

//category
{path:'category/create',component:CategoryCreateComponent},
{path:'category/delete/:id',component:CategoryDeleteComponent},
{path:'category/update/:id',component:CategoryUpdateComponent},
{path:'category/show',component:CategoryShowComponent},



//like

{path:'like/create/:id',component:CreateLikeComponent},
{path:'dislike/create/:id',component:CreateDislikeComponent},

{path:'like/:id/delete/:likeId',component:DeleteLikeComponent},
{path:'dislike/:id/delete/:likeId',component:DeleteDislikeComponent},




//Report 
{path:'posts/report/:id',component:PostReportComponent},
{path:'comments/report/:id',component:CommentReportComponent},
{path:'show/report',component:ShowReportComponent},

//comment
{path:'posts/:id/comment/:data',component:CommentCreateComponent},
{path:'posts/:id/comments/:commentId',component:CommentUpdateComponent},


//header
{path:'header',component:HeaderComponent},






// Admin route
{ path: 'admin', component: AdminComponent },
{ path: '**', redirectTo: '/posts/show' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
