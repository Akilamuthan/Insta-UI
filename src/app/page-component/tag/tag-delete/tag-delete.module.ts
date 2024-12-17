import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { TagDeleteComponent } from './tag-delete.component';

export const routes: Routes = [
  { path: '', component: TagDeleteComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    TagDeleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class TagDeleteModule { }
