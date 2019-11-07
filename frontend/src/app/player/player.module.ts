import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {VgCoreModule} from 'videogular2/compiled/core';
import {VgControlsModule} from 'videogular2/compiled/controls';
import {VgOverlayPlayModule} from 'videogular2/compiled/overlay-play';
import {VgBufferingModule} from 'videogular2/compiled/buffering';

import { PlayerComponent } from './player.component';
import { PlayerService } from './player.service';

@NgModule({
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  exports: [PlayerComponent],
  providers: [PlayerService], 
  declarations: [PlayerComponent]
})
export class PlayerModule { }
