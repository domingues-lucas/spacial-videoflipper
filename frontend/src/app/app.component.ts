import { Component, OnInit, EventEmitter } from '@angular/core';  
import { FormGroup, FormControl, Validators, FormsModule } from '@angular/forms';  
import { CommonService} from './app.service';  
import { Http, Response, Headers, RequestOptions } from '@angular/http';   
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { MaterializeAction } from 'angular2-materialize';

@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  

export class AppComponent {  
    
    constructor(
        private newService: CommonService, 
        private http: Http
    ) {}  

    public uploader:FileUploader = new FileUploader({url: 'http://localhost:4000/api/upload', itemAlias: 'music'});

    musics;
    files;
    addOrEdit = { action: "add" };  
    
    ngOnInit() {
        
        this.newService.getMusic().subscribe(data => this.musics = data)  

        this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            // data.md5 = element.md5;
            // data.file = item.file.name;
            // this.add(data);
            console.log("ImageUpload:", item, status, response);
        };
    }  
    
    add = function(music: any,isValid: boolean) {

        this.newService.searchByMD5(music.md5).subscribe(data => {
            if ( !data.length ) {
                this.newService.addMusic(music).subscribe(data => {
                    this.ngOnInit();    
                }, error => this.errorMessage = error ) 
                console.log('Nova Música: ' + data[0].title);
            } else {
                console.log('Música existente: ' + data[0].title);
                //this.openModal();
            }
        }) 

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
        
        this.filesStatus = '';
        this.newService.getFile().subscribe(
            data => {
                data.json.forEach(element => {
                    this.newService.addID3({'filePath': element.filePath}).subscribe(data => {
                        data.md5 = element.md5;
                        data.file = element.filePath;
                        this.add(data);
                        this.filesStatus += '<h5>' + data.artist + ' - ' + data.album + ' - ' + data.title + '</h5><p>' + element.filePath +'</p>';
                    })
                });
            }
        )  
    }

    modalActions = new EventEmitter<string|MaterializeAction>();
    openModal() {
        this.modalActions.emit({action:"modal",params:['open']});
    }
    closeModal() {
        this.modalActions.emit({action:"modal",params:['close']});
    }

} 