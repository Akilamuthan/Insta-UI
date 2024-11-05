import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component'; 
import { CounterComponent } from './counter/counter.component'; 
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';
import { TagCreateComponent } from './tag-create/tag-create.component';
import { TagUpdateComponent } from './tag-update/tag-update.component';
import { CategoryCreateComponent } from './category-create/category-create.component';

const routes: Routes = [
  { path: 'form', component: FormComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: CounterComponent }, 
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'posts/update/:id', component: PostUpdateComponent },
  { path: 'posts/delete/:id', component: PostDeleteComponent },
  
  // Tag routes
  { path: 'tags/create', component: TagCreateComponent }, 
  { path: 'tags/update', component: TagUpdateComponent },


  //category

  {path:'category/create',component:CategoryCreateComponent},
  // Wildcard route for 404 handling
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
