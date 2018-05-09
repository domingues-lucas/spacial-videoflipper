import { Component, OnInit, EventEmitter } from '@angular/core';  
import { FormGroup,FormControl,Validators,FormsModule } from '@angular/forms';  
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
            console.log("ImageUpload:uploaded:", item, status, response);
        };
    }  
    
    add = function(music: any,isValid: boolean) {

        this.http.get('http://localhost:4000/api/search/md5/' + music.md5).map((response: Response) => response.json()).subscribe(data => {
            if ( !data.length ) {
                // this.newService.addMusic(music).subscribe(data => {
                //     this.ngOnInit();    
                // }, error => this.errorMessage = error ) 
                console.log('Nova Música');
            } else {
                console.log('Música existente:' + data[0].title);
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
                    console.log(element);
                    this.newService.addID3({'file': element}).subscribe(data => {
                        this.filesStatus = data.artist + ' - ' + data.album + ' - ' + data.title + ' - ' + element +'<br>'
                        data.file = element;
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