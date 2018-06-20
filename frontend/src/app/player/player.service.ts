import { Injectable } from '@angular/core';

@Injectable()
export class PlayerService {

    playlist = [
        {
            artist: '',
            title: '',
            src: '',
            type: ''
        }
    ];

    constructor() { }

}
