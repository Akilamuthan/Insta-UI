import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AdminReportComponent } from './admin-report.component';

export const routes: Routes = [
  { path: '', component: AdminReportComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    AdminReportComponent
  ],
  imports: [
    CommonModule,
    
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class AdminReportModule { }
