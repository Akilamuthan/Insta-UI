import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommentReportComponent } from './comment-report.component';

export const routes: Routes = [
  { path: '', component: CommentReportComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    CommentReportComponent
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class CommentReportModule { }
