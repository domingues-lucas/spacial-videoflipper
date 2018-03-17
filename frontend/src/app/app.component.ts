import { Component } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Item } from 'app/Item';
import { ItemService } from 'app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Spacial Videoflipper';

  item: Item;
  name: string;

  constructor(private _itemService: ItemService) {

  }

  CalcularItem(): void {
      this._itemService.getItem(this.name)
          .subscribe((data: Item) => this.item = data,
          error => console.log(error));
  }

}
