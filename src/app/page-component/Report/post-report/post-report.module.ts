import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { PostReportComponent } from './post-report.component';

export const routes: Routes = [
  { path: '', component: PostReportComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    PostReportComponent
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class PostReportModule { }
