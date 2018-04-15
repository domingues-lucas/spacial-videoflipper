import { Injectable } from '@angular/core';   
import {Http,Response, Headers, RequestOptions } from '@angular/http';   

import { Observable } from 'rxjs/Observable';  
import 'rxjs/add/operator/map';  
import 'rxjs/add/operator/do';  

@Injectable()  
export class CommonService {  

    private _Url = 'http://localhost:4000/api/music';

    constructor(private http: Http) { }  

    addMusic(music){      
        return this.http.post(this._Url, music)  
        .map((response: Response) =>response.json())              
    }  

    getMusic(){       
        return this.http.get(this._Url)  
        .map((response: Response) => response.json())              
    } 
    
    editMusic(id, music){   
        return this.http.put(this._Url + '/' + id, music)  
            .map((response: Response) =>response.json())             
    }

    deleteMusic(id){   
        return this.http.delete(this._Url + '/' + id)  
            .map((response: Response) =>response.json())             
    }  

} 
