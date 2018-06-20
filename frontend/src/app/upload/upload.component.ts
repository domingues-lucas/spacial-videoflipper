import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';  
import { Http, Response, Headers, RequestOptions } from '@angular/http';  

import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

import { UploadService } from './upload.service'; 

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})

export class UploadComponent implements OnInit {

    musics;
    files;
    addOrEdit = { action: "add" };  

    constructor(
        private newService: UploadService, 
        private http: Http
    ) {}

    public uploader:FileUploader = new FileUploader({url: 'http://localhost:4000/api/upload', itemAlias: 'music'});

    ngOnInit() {

        this.newService.getMusic().subscribe(data => this.musics = data)  

        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.add(JSON.parse(response));
            console.log("Upload concluído: ", item);
        };
    }

    add = function(music: any) {

        this.filesStatus = '';

        this.newService.addID3(music).subscribe(data => {
            data.md5 = music.md5;
            data.filePath = music.filePath;
            this.filesStatus += '<h5>' + data.artist + ' - ' + data.album + ' - ' + data.title + '</h5><p>' + data.filePath +'</p>';
            this.checkMusic(data);
        })

        this.checkMusic = function (music) {
            this.newService.searchByMD5(music.md5).subscribe(data => {
                if ( !data.length ) {
                    this.newService.addMusic(music).subscribe(data => {
                        this.ngOnInit();    
                    }, error => this.errorMessage = error ) 
                    console.log('Nova Música: ' + music.title);
                } else {
                    if ( music.filePath !== data[0].filePath ) {
                        this.newService.deleteFile(music).subscribe(data => {
                            console.log(data);
                        })
                    } else {
                        console.log('Música existente: ', music.filePath);
                    }
                }
            }) 
        }
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

    scanMusicsDirectory = function() {
        this.newService.getFile().subscribe( data => {
            data.json.forEach(element => {
                this.add(element);
            })
        })
    }

}
