import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CategoryShowComponent } from './category-show.component';

export const routes: Routes = [
  { path: '', component: CategoryShowComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    CategoryShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CategoryShowModule { }
