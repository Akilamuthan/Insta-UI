import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { DeleteDislikeComponent } from './delete-dislike.component';

export const routes: Routes = [
  { path: '', component: DeleteDislikeComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [
    DeleteDislikeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class DeleteDislikeModule { }
