import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import {  OnDestroy,Output,Input,EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

users:any;
user:any;
followers:any;
follower:any;
  constructor(private HomeService:HomeService ) {}

  ngOnInit(): void {
   
    this.userAll();
    this.get();
  }

  userAll() {
    this.HomeService.userAll().subscribe({
      next: (data) => {  
        this.users=data;

      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  get(){
    this.HomeService.getUser().subscribe({
      next: (data)=>{
        this.user=data.user.id;
        console.log("user",this.user);

        this.follower = data.follower;4
      console.log("follower", this.follower);
      
      },
      error: (err) => {
        console.error('Error:', err);
      }
    })
  }
}
