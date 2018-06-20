import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { PlayerService } from '../player/player.service';
import { UploadService } from '../upload/upload.service';
import { LibraryService } from './library.service';


// import * as $ from 'jquery';


@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})

export class LibraryComponent implements OnInit {

    constructor(
        private playerService: PlayerService,
        private newService: UploadService,
        private libraryService: LibraryService
    ) { }

    musics = this.libraryService.musics;

    ngOnInit() {

        this.newService.getMusic().subscribe(data => {
            this.libraryService.musics = data
            this.musics = this.libraryService.musics
        })

        setInterval(()=> {
            this.musics = this.libraryService.musics
        }, 5000);
    }


    enqueue(artist, title, filePath) {
        this.playerService.playlist.push({
            artist: artist,
            title: title,
            src: "//localhost:4000/files/" + filePath.replace('/home/ninguem/Música/', ''),
            type: 'audio/mp3'
        });
    }

}
