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

  womensQuota(max) {
    if (this.list && this.list.kandidaten && this.list.kandidaten.length) {
      max = max || this.list.kandidaten.length;
      const womanCount = this.list.kandidaten
        .map(c => c.gender)
        .splice(0, max)
        .filter(g => g === 'w')
        .length;
      return ((womanCount / max) * 100).toFixed(0);
    }
    return '?';
  }

  ageAverage(max) {
    if (this.list && this.list.kandidaten && this.list.kandidaten.length) {
      max = max || this.list.kandidaten.length;
      const year = (new Date()).getFullYear();
      const avrgAge = (
        this.list.kandidaten
          .map(c => (year - c.birthyear))
          .splice(0, max)
          .reduce((sum, age) => sum + age, 0)
      ) / max;
      return avrgAge.toFixed(0);
    }
    return '?';
  }
}
