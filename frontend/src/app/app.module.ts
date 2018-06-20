import { NgModule } from '@angular/core';   

import { AppComponent } from './app.component';  
import { PlayerModule } from './player/player.module';
import { UploadModule } from './upload/upload.module';
import { LibraryModule } from './library/library.module';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({  
  declarations: [  
    AppComponent, HomeComponent, MenuComponent
  ],  
  imports: [    
    PlayerModule,
    UploadModule,
    LibraryModule,
    AppRoutingModule
  ],  
  providers: [],  
  bootstrap: [
    AppComponent
  ]  
})  
export class AppModule { }  
