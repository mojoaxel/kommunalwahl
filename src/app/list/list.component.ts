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

  get womensQuota() {
    if (this.list && this.list.kandidaten && this.list.kandidaten.length) {
      const womanCount = this.list.kandidaten.map(c => c.gender).filter(g => g === 'w').length;
      return ((womanCount / this.list.kandidaten.length) * 100).toFixed(0);
    }
    return '?';
  }

  get ageAverage() {
    if (this.list && this.list.kandidaten && this.list.kandidaten.length) {
      const year = (new Date()).getFullYear();
      const avrgAge = this.list.kandidaten.map(c => (year - c.birthyear)).reduce((sum, age) => sum + age, 0) / this.list.kandidaten.length;
      return avrgAge.toFixed(0);
    }
    return '?';
  }
}
