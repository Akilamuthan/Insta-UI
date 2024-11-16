import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './post/form/form.component'; 
import { HttpClientModule } from '@angular/common/http';
import { CounterComponent } from './home/counter/counter.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { PostUpdateComponent } from './post/post-update/post-update.component';
import { PostDeleteComponent } from './post/post-delete/post-delete.component';
import { TagCreateComponent } from './tag/tag-create/tag-create.component';
import { CategoryCreateComponent } from './category/category-create/category-create.component';
import { TagUpdateComponent } from './tag/tag-update/tag-update.component';
import { CategoryUpdateComponent } from './category/category-update/category-update.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryDeleteComponent } from './category/category-delete/category-delete.component';
import { TagDeleteComponent } from './tag/tag-delete/tag-delete.component';
import { TagShowComponent } from './tag/tag-show/tag-show.component';
import { CategoryShowComponent } from './category/category-show/category-show.component';
import { LogoutComponent } from './home/logout/logout.component';
import { PostShowComponent } from './post/post-show/post-show.component';
import { CommentCreateComponent } from './comment/comment-create/comment-create.component';
import { CommentUpdateComponent } from './comment/comment-update/comment-update.component';
import { CommentDeleteComponent } from './comment/comment-delete/comment-delete.component';
import { CommentShowComponent } from './comment/comment-show/comment-show.component';
import { CreateLikeComponent } from './like/create-like/create-like.component';
import { CreateDislikeComponent } from './like/create-dislike/create-dislike.component';
import { DeleteLikeComponent } from './like/delete-like/delete-like.component';
import { DeleteDislikeComponent } from './like/delete-dislike/delete-dislike.component';

import { UserPostComponent } from './post/user-post/user-post.component';
import { SeparatePostComponent } from './post/separate-post/separate-post.component';

import { PostReportComponent } from './Report/post-report/post-report.component';
import { CommentReportComponent } from './Report/comment-report/comment-report.component';
import { AdminReportComponent } from './Report/admin-report/admin-report.component';
import { ShowReportComponent } from './Report/show-report/show-report.component';
import { HeaderComponent } from './home/header/header.component';
import { FooderComponent } from './home/fooder/fooder.component';





@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    CounterComponent,
    RegisterComponent,
    LoginComponent,
    PostUpdateComponent,
    PostDeleteComponent,
    TagCreateComponent,
    CategoryCreateComponent,
    TagUpdateComponent,
    CategoryUpdateComponent,
    AdminComponent,
    CategoryDeleteComponent,
    TagDeleteComponent,
    TagShowComponent,
    CategoryShowComponent,
    LogoutComponent,
    PostShowComponent,
    CommentCreateComponent,
    CommentUpdateComponent,
    CommentDeleteComponent,
    CommentShowComponent,
    CreateLikeComponent,
    CreateDislikeComponent,
    DeleteLikeComponent,
    DeleteDislikeComponent,
    UserPostComponent,
    SeparatePostComponent,

    PostReportComponent,
    CommentReportComponent,
    AdminReportComponent,
    ShowReportComponent,
    HeaderComponent,
    FooderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule ,
    AppRoutingModule,

  ],
  exports: [HeaderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
