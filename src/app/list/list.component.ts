import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from '../candidate/candidate.component';

export interface List {
  nummer: number;
  partei: {
    kurzform: string;
    langform?: string;
    farbe?: string;
    homepage?: string;
    logo?: string;
  };
  kandidaten: [Candidate];
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List;

  constructor() { }

  ngOnInit() { }

  getSubtitle() {
    if (this.list.partei) {
      if (this.list.partei.homepage && this.list.partei.langform) {
        return `<a href="${this.list.partei.homepage}">${this.list.partei.langform}</a>`;
      } else if (this.list.partei.langform) {
        return this.list.partei.langform;
      } else if (this.list.partei.homepage) {
        return `<a href="${this.list.partei.homepage}">Homepage</a>`;
      }
    }
    return ``;
  }
}
