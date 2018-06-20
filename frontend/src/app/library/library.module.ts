import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { LibraryService } from './library.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [LibraryComponent],
  providers: [LibraryService],
  declarations: [LibraryComponent]
})
export class LibraryModule { }
