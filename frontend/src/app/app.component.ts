import { Component, OnInit } from '@angular/core';  
import { FormGroup,FormControl,Validators,FormsModule } from '@angular/forms';  
import { CommonService} from './app.service';  
import { Http,Response, Headers, RequestOptions } from '@angular/http';   
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  

export class AppComponent {  
    
    constructor(private newService: CommonService) {}  

    public uploader:FileUploader = new FileUploader({url: 'http://localhost:4000/api/upload', itemAlias: 'music'});

    musics;
    files;
    filesStatus = '';
    addOrEdit = { action: "add" };  
    
    ngOnInit() {    
        this.newService.getMusic().subscribe(data => this.musics = data)  
        this.newService.getFile().subscribe(
            data => {
                this.files = data.json
                // data.json.forEach(element => {
                //     this.newService.addID3({'file': element}).subscribe(data => this.filesStatus += data.artist + ' - ' + data.album + ' - ' + data.title + '<br>')
                // });
            }
        )  

        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status, response);
        };
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
        this.md5 = music.md5;  
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