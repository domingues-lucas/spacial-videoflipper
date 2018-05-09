import { BrowserModule } from '@angular/platform-browser';  
import { NgModule } from '@angular/core';   
  
import { HttpModule } from '@angular/http';  
import { FormsModule } from '@angular/forms';  

import { FileSelectDirective } from 'ng2-file-upload';
import { AppComponent } from './app.component';  
import { CommonService} from './app.service';  
import { MaterializeModule } from "angular2-materialize";

@NgModule({  
  declarations: [  
    AppComponent,
    FileSelectDirective
  ],  
  imports: [  
    BrowserModule,
    HttpModule,
    FormsModule,  
    MaterializeModule
  ],  
  providers: [CommonService],  
  bootstrap: [AppComponent]  
})  
export class AppModule { }  
