import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { CreateDislikeComponent } from './create-dislike.component';


export const routes: Routes = [
  { path: '', component: CreateDislikeComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    CreateDislikeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CreateDislikeModule { }
