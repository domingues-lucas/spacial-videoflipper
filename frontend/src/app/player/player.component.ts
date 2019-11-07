import { Component, OnInit } from '@angular/core';

import {VgAPI} from 'videogular2/compiled/core';
import { PlayerService } from './player.service';

export interface IMedia {
    title: string;
    src: string;
    type: string;
}

// import * as $ from 'jquery';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})

export class PlayerComponent implements OnInit {

    constructor( private playerService: PlayerService ) { }

    playlist: Array<IMedia> = this.playerService.playlist;
    currentIndex = 0;
    currentItem: IMedia = this.playlist[ this.currentIndex ];
    api: VgAPI;

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    nextVideo() {
        this.currentIndex++;
        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }
        this.currentItem = this.playlist[ this.currentIndex ];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: IMedia, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
        this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
    }

    onClickRemovelistItem(item: IMedia, index: number) {
        this.playlist.splice(index, 1);
    }

    ngOnInit() {

    }

}
