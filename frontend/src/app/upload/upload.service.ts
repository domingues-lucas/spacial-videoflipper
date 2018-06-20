import { Injectable } from '@angular/core';   
import { Http, Response } from '@angular/http'; 

import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do'; 


@Injectable()  
export class UploadService {  

    private _Url = 'http://localhost:4000/api/music/';

    constructor(
        private http: Http
    ){ }  
    
    addMusic(music){  
        return this.http.post(this._Url, music)
            .map((response: Response) =>response.json())
    }  

    getMusic(query=''){       
        let urlQuery;
        urlQuery = query !== '' ? 'http://localhost:4000/api/search/artist/' + query : this._Url;
        return this.http.get(urlQuery)  
            .map((response: Response) => response.json())              
    } 
    
    editMusic(id, music){   
        return this.http.put(this._Url + id, music)  
            .map((response: Response) =>response.json())             
    }

    deleteMusic(id){   
        return this.http.delete(this._Url + id)  
            .map((response: Response) =>response.json())             
    }  

    getFile(){       
        return this.http.get('http://localhost:4000/api/files')  
        .map((response: Response) => response.json())              
    } 

    deleteFile(data){       
        return this.http.post('http://localhost:4000/api/files/delete/', data)  
        .map((response: Response) => response.json())              
    } 

    searchByMD5(md5){       
        return this.http.get('http://localhost:4000/api/search/md5/' + md5)  
        .map((response: Response) => response.json())              
    } 

    addID3(data){   
        return this.http.post('http://localhost:4000/api/files/id3/', data)  
        .map((response: Response) => response.json())              
    } 

} 
