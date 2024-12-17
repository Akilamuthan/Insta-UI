import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CreateLikeComponent } from './create-like.component';

export const routes: Routes = [
  { path: '', component: CreateLikeComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    CreateLikeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CreateLikeModule { }
