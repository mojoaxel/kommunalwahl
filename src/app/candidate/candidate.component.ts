import { Component, OnInit, Input } from '@angular/core';
import padWithleadingZeroes from 'leading-zeroes';

export interface Candidate {
  listenplatz: number;
  titel?: [string];
  vorname: string;
  nachname: string;
  alter?: number;
  berufe?: [string];
  webseite?: string;
  image?: string;
}

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
  }

  getNumber() {
    if (this.candidate && this.candidate.listenplatz) {
      return `${padWithleadingZeroes(this.candidate.listenplatz, 2)}`;
    }
    return '';
  }

}
