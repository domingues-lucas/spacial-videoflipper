import { Injectable } from '@angular/core';
import { Item } from './Item';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class ItemService {
    private _Url = 'http://localhost:4000/api/item';

    constructor(private _http: Http) { }

    getItem(name: string): Observable<Item> {
        return this._http.get(this._Url)
            .map((response: Response) => <Item>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }
    
    addItem(name: string): Observable<Item> {
        return this._http.post(this._Url)
            .map((response: Response) => <Item>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
