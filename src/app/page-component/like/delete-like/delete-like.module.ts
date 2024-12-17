import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { DeleteLikeComponent } from './delete-like.component';

export const routes: Routes = [
  { path: '', component: DeleteLikeComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
 DeleteLikeComponent 

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class DeleteLikeModule { }
