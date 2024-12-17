import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserUpdateComponent } from './user-update.component';

export const routes: Routes = [
  { path: '', component: UserUpdateComponent, pathMatch: 'full' }  
];

@NgModule({
  declarations: [UserUpdateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes), 
  ]
})
export class UserUpdateModule { 

  
}
