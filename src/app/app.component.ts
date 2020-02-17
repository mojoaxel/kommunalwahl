import { Component } from '@angular/core';

//TODO: What ist this!? load dynamically!
// import list01 from '../../2020/Fuerth/Stadtrat/liste.01.json';
// import list02 from '../../2020/Fuerth/Stadtrat/liste.02.json';
// import list03 from '../../2020/Fuerth/Stadtrat/liste.03.json';
// import list04 from '../../2020/Fuerth/Stadtrat/liste.04.json';
// import list05 from '../../2020/Fuerth/Stadtrat/liste.05.json';
// import list06 from '../../2020/Fuerth/Stadtrat/liste.06.json';
// import list07 from '../../2020/Fuerth/Stadtrat/liste.07.json';
// import list08 from '../../2020/Fuerth/Stadtrat/liste.08.json';

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

  lists = [
    //list01, list02, list03, list04, list05, list06, list07, list08
  ];
}
