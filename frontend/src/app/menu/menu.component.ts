import { Component, OnInit } from '@angular/core';

import { LibraryService } from '../library/library.service'; 
import { UploadService } from '../upload/upload.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

    constructor(
        private libraryService: LibraryService,
        private newService: UploadService
    ) { }

    ngOnInit() {
    }

    filterByArtist(query) {
        document.querySelector('.screen-overlay').classList.add('hide');
        this.newService.getMusic(query).subscribe(data => this.libraryService.musics = data)
    }

    showScreenOverlay() {
        document.querySelector('.screen-overlay').classList.remove('hide');
    }

}
