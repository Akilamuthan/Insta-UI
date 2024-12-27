import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponentComponent } from './page-component/page-component.component';
import { TagCreateModule } from './page-component/tag/tag-create/tag-create.module';


const routes: Routes = [

  {
    path: '',
    component: PageComponentComponent, 
    children: [
      { path: 'home', redirectTo: '/' },
  
      {
        path: 'register',
        loadChildren: () => import('./page-component/home/register/register.module').then(m => m.RegisterModule),
        data: {breadcrumb: 'Register'}
      },
  
      {
        path: 'login',
        loadChildren: () => import('./page-component/home/login/login.module').then(m => m.LoginModule),
        data: { breadcrumb: 'Login' }
      },
  
      {
        path: 'logout',
        loadChildren: () => import('./page-component/home/logout/logout.module').then(m => m.LogoutModule),
        data: { breadcrumb: 'Logout' }
      },
  
      // Posts
      {
        path: '',
        loadChildren: () => import('./page-component/post/post-show/post-show.module').then(m => m.PostShowModule),
        data: { breadcrumb: '' }
      },
      {
        path: 'posts/create',
        loadChildren: () => import('./page-component/post/form/form.module').then(m => m.FormModule),
        data: { breadcrumb: 'Create Post' }
      },
      {
        path: 'posts/update/:id',
        loadChildren: () => import('./page-component/post/post-update/post-update.module').then(m => m.PostUpdateModule),
        data: { breadcrumb: 'Update Post' }
      },
      {
        path: 'posts/delete/:id',
        loadChildren: () => import('./page-component/post/post-delete/post-delete.module').then(m => m.PostDeleteModule),
        data: { breadcrumb: 'Delete Post' }
      },
      {
        path: 'posts/user-posts',
        loadChildren: () => import('./page-component/post/user-post/user-post.module').then(m => m.UserPostModule),
        data: { breadcrumb: 'My Posts' }
      },
      {
        path: 'posts/separate-posts/:id',
        loadChildren: () => import('./page-component/post/separate-post/separate-post.module').then(m => m.SeparatePostModule),
        data: { breadcrumb: 'Individual posts' }
      },
    
      // Like/Dislike
      {
        path: 'like/create/:id',
        loadChildren: () => import('./page-component/like/create-like/create-like.module').then(m => m.CreateLikeModule),
        data: { breadcrumb: 'Like Post'}
      },
      {
        path: 'dislike/create/:id',
        loadChildren: () => import('./page-component/like/create-dislike/create-dislike.module').then(m => m.CreateDislikeModule),
        data: { breadcrumb: 'Dislike Post' }
      },
      {
        path: 'like/:id/delete/:likeId',
        loadChildren: () => import('./page-component/like/delete-like/delete-like.module').then(m => m.DeleteLikeModule),
        data: { breadcrumb: 'Delete Like' }
      },
      {
        path: 'dislike/:id/delete/:likeId',
        loadChildren: () => import('./page-component/like/delete-dislike/delete-dislike.module').then(m => m.DeleteDislikeModule),
        data: { breadcrumb: 'Delete Dislike' }
      },
  
      // Comment
      {
        path: 'posts/:id/comment/:data',
        loadChildren: () => import('./page-component/comment/comment-create/comment-create.module').then(m => m.CommentCreateModule),
        data: { breadcrumb: 'Create Comment' }
      },
      {
        path: 'posts/:id/comments/:commentId',
        loadChildren: () => import('./page-component/comment/comment-update/comment-update.module').then(m => m.CommentUpdateModule),
        data: { breadcrumb: 'Update Comment'  }
      },
  
      // User
      {
        path: 'users/update/:id',
        loadChildren: () => import('./page-component/home/user-update/user-update.module').then(m => m.UserUpdateModule),
        data: { breadcrumb: 'Update User' }
      },
      {
        path: 'users/delete/:id',
        loadChildren: () => import('./page-component/home/user-delete/user-delete.module').then(m => m.UserDeleteModule),
        data: { breadcrumb: 'Delete User' }
      },
      {
        path: 'users/chat',
        loadChildren: () => import('./page-component/home/chat/chat.module').then(m => m.ChatModule),
        data: { breadcrumb: 'Chat' }
      },

      // Admin route
      {
        path: 'admin',
        loadChildren: () => import('./page-component/admin/admin.module').then(m => m.AdminModule),
        data: { breadcrumb: '' }
      },
    
      // Category
      {
        path: 'category/create',
        loadChildren: () => import('./page-component/category/category-create/category-create.module').then(m => m.CategoryCreateModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Create Category'  }
      },
      {
        path: 'category/delete/:id',
        loadChildren: () => import('./page-component/category/category-delete/category-delete.module').then(m => m.CategoryDeleteModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Delete Category'  }
      },
      {
        path: 'category/update/:id',
        loadChildren: () => import('./page-component/category/category-update/category-update.module').then(m => m.CategoryUpdateModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Update Category'  }
      },
      {
        path: 'category/show',
        loadChildren: () => import('./page-component/category/category-show/category-show.module').then(m => m.CategoryShowModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Categories'}
      },
      
      // Tag
      {
        path: 'tags/create',
        loadChildren: () => import('./page-component/tag/tag-create/tag-create.module').then(m => m.TagCreateModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Create Tag'  }
      },
      {
        path: 'tags/update/:id',
        loadChildren: () => import('./page-component/tag/tag-update/tag-update.module').then(m => m.TagUpdateModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Update Tag' }
      },
      {
        path: 'tags/delete/:id',
        loadChildren: () => import('./page-component/tag/tag-delete/tag-delete.module').then(m => m.TagDeleteModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Delete Tag' }
      },
      {
        path: 'tags/show',
        loadChildren: () => import('./page-component/tag/tag-show/tag-show.module').then(m => m.TagShowModule),
        data: { breadcrumbs: 'admin',breadcrumb: 'Tags' }
      },

      
      // Report
      {
        path: 'posts/report/:id',
        loadChildren: () => import('./page-component/Report/post-report/post-report.module').then(m => m.PostReportModule),
        data: { breadcrumb: 'Report Post'}
      },
      {
        path: 'comments/report/:id',
        loadChildren: () => import('./page-component/Report/comment-report/comment-report.module').then(m => m.CommentReportModule),
        data: { breadcrumb: 'Report Comment' }
      },
      {
        path: 'show/report',
        loadChildren: () => import('./page-component/Report/show-report/show-report.module').then(m => m.ShowReportModule),
        data: { breadcrumbs: 'admin',breadcrumb: ' Reports' }
      },
  
  
    ],
    data: { breadcrumb: '' },
  
  },
  { path: '**', redirectTo: '/'}

]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
