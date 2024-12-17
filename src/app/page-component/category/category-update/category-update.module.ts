import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoryUpdateComponent } from './category-update.component';

export const routes: Routes = [
  { path: '', component: CategoryUpdateComponent, pathMatch: 'full' }  
];



@NgModule({
  declarations: [
    CategoryUpdateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CategoryUpdateModule { }
