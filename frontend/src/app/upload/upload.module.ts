import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';  
import { HttpModule } from '@angular/http';  
import { FormsModule } from '@angular/forms';  

import { UploadComponent } from './upload.component';
import { UploadService } from './upload.service';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterializeModule } from "angular2-materialize";

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    FormsModule,  
    FileUploadModule,
    MaterializeModule
  ],
  exports: [
    UploadComponent
  ],
  providers: [UploadService],  
  declarations: [UploadComponent]
})
export class UploadModule { }
