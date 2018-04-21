import { Component, OnInit } from '@angular/core';  
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';  
import {CommonService} from './app.service';  
   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  

export class AppComponent {  
    
    constructor(private newService: CommonService) {   }  

    musics;
    files;
    addOrEdit = { action: "add" };  
    
    ngOnInit() {    
        this.newService.getMusic().subscribe(data => this.musics = data)  
        this.newService.getFile().subscribe(data => this.files = data)  
    }  
    
    add = function(music,isValid: boolean) {    
        this.newService.addMusic(music).subscribe(data => {
            this.ngOnInit();    
        }, error => this.errorMessage = error )  
    }   
    
    edit = function(music,isValid: boolean) {    
        this.newService.editMusic(this.id, music).subscribe(data => {
            this.ngOnInit();    
        }, error => this.errorMessage = error )  
    }  

    del = function(id) {  
        this.newService.deleteMusic(id).subscribe(data => { 
            this.ngOnInit();
        }, error => this.errorMessage = error )   
    }  

    view = function(music) {  
        this.id = music._id;  
        this.title = music.title;  
        this.artist = music.artist; 
        this.album = music.album; 
        this.file = music.file; 
        this.addOrEdit = { action: "edit" };
    }  

    clear = function() {  
        this.id = '';  
        this.title = '';  
        this.artist = ''; 
        this.album = ''; 
        this.file = ''; 
        this.addOrEdit = { action: "add" };
    } 
    
} 