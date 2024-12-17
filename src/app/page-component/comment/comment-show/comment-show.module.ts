import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommentShowComponent } from './comment-show.component';

export const routes: Routes = [
  { path: '', component: CommentShowComponent, pathMatch: 'full' }  
];


@NgModule({
  declarations: [
    CommentShowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CommentShowModule { }
