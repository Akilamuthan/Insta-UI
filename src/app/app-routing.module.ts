import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponentComponent } from './page-component/page-component.component';
import { TagCreateModule } from './page-component/tag/tag-create/tag-create.module';


const routes: Routes = [

{
  path: '',
  component: PageComponentComponent, children: [

    {path: 'home', redirectTo: '/posts/show' },

    { path: 'register', loadChildren: () => import('./page-component/home/register/register.module').then(m => m.RegisterModule) },

    { path: 'login', loadChildren: () => import('./page-component/home/login/login.module').then(m => m.LoginModule) },

    {path:'logout',loadChildren: () => import('./page-component/home/logout/logout.module').then(m => m.LogoutModule)},
    
    
//posts
    {path:'posts/show',loadChildren: () => import('./page-component/post/post-show/post-show.module').then(m => m.PostShowModule)},

    {path:'posts/create',loadChildren: () => import('./page-component/post/form/form.module').then(m => m.FormModule)},

    {path:'posts/update/:id',loadChildren: () => import('./page-component/post/post-update/post-update.module').then(m => m.PostUpdateModule)},

   {path:'posts/delete/:id',loadChildren: () => import('./page-component/post/post-delete/post-delete.module').then(m => m.PostDeleteModule)},

   {path:'posts/user-posts',loadChildren: () => import('./page-component/post/user-post/user-post.module').then(m => m.UserPostModule)},

   {path:'posts/separate-posts/:id',loadChildren: () => import('./page-component/post/separate-post/separate-post.module').then(m => m.SeparatePostModule)},

   //tag
   { path: 'tags/create', loadChildren:()=>import('./page-component/tag/tag-create/tag-create.module').then(m=>m.TagCreateModule) },

   { path: 'tags/update/:id', loadChildren:()=>import('./page-component/tag/tag-update/tag-update.module').then(m=>m.TagUpdateModule) },

   { path: 'tags/delete/:id', loadChildren:()=>import('./page-component/tag/tag-delete/tag-delete.module').then(m=>m.TagDeleteModule) },

  // {path:  'posts/create',component : FormComponent},

   { path: 'tags/show', loadChildren:()=>import('./page-component/tag/tag-show/tag-show.module').then(m=>m.TagShowModule) },

   // Admin route
   { path: 'admin', loadChildren:()=>import('./page-component/admin/admin.module').then(m=>m.AdminModule) },

   //category
   {path:'category/create',loadChildren:()=>import('./page-component/category/category-create/category-create.module').then(m=>m.CategoryCreateModule)},

   {path:'category/delete/:id',loadChildren:()=>import('./page-component/category/category-delete/category-delete.module').then(m=>m.CategoryDeleteModule)},

  {path:'category/update/:id',loadChildren:()=>import('./page-component/category/category-update/category-update.module').then(m=>m.CategoryUpdateModule)},

  {path:'category/show',loadChildren:()=>import('./page-component/category/category-show/category-show.module').then(m=>m.CategoryShowModule)},



//like

  {path:'like/create/:id',loadChildren:()=>import('./page-component/like/create-like/create-like.module').then(m=>m.CreateLikeModule)},

  {path:'dislike/create/:id',loadChildren:()=>import('./page-component/like/create-dislike/create-dislike.module').then(m=>m.CreateDislikeModule)},

  {path:'like/:id/delete/:likeId',loadChildren:()=>import('./page-component/like/delete-like/delete-like.module').then(m=>m.DeleteLikeModule)},

  {path:'dislike/:id/delete/:likeId',loadChildren:()=>import('./page-component/like/delete-dislike/delete-dislike.module').then(m=>m.DeleteDislikeModule)},

//Report 
{path:'posts/report/:id',loadChildren:()=>import('./page-component/Report/post-report/post-report.module').then(m=>m.PostReportModule)},

{path:'comments/report/:id',loadChildren:()=>import('./page-component/Report/comment-report/comment-report.module').then(m=>m.CommentReportModule)},

{path:'show/report',loadChildren:()=>import('./page-component/Report/show-report/show-report.module').then(m=>m.ShowReportModule)},


//comment
{path:'posts/:id/comment/:data',loadChildren:()=>import('./page-component/comment/comment-create/comment-create.module').then(m=>m.CommentCreateModule)},
{path:'posts/:id/comments/:commentId',loadChildren:()=>import('./page-component/comment/comment-update/comment-update.module').then(m=>m.CommentUpdateModule)},

//user
{path:'users/update/:id',loadChildren:()=>import('./page-component/home/user-update/user-update.module').then(m=>m.UserUpdateModule)},
{path:'users/delete/:id',loadChildren:()=>import('./page-component/home/user-delete/user-delete.module').then(m=>m.UserDeleteModule)},
{path:'users/chat',loadChildren:()=>import('./page-component/home/chat/chat.module').then(m=>m.ChatModule)}  ]
},

{ path: '**', redirectTo: '/posts/show' },

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
