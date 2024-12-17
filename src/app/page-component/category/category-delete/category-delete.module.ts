import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDeleteComponent } from './category-delete.component';


export const routes: Routes = [
  { path: '', component: CategoryDeleteComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    CategoryDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CategoryDeleteModule { }
