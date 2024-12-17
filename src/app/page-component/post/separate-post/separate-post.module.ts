import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SeparatePostComponent } from './separate-post.component';
import { Router } from '@angular/router';

export const routes: Routes = [
  { path: '', component: SeparatePostComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    SeparatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ],
  exports: [RouterModule]
})
export class SeparatePostModule { }
