import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component'; 
import { HttpClientModule } from '@angular/common/http';
import { CounterComponent } from './counter/counter.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import { TagUpdateComponent } from './tag-update/tag-update.component';





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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
