import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponentComponent } from './page-component/page-component.component';
import { HeaderComponent } from './theme/header/header.component';
import { FooderComponent } from './theme/fooder/fooder.component';
import { PostShowModule } from './page-component/post/post-show/post-show.module';
//import { ChatComponent } from './page-component/home/chat/chat.component';


@NgModule({
  declarations: [
    AppComponent,
    PageComponentComponent,
    HeaderComponent,
    FooderComponent,
   // ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    PostShowModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
