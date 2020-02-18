import { Component } from '@angular/core';

import lists from '../../parties.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kommunalwahl';
  year = '2020';
  town = 'Fürth';
  listCount = 8;
  lists = lists;
}
