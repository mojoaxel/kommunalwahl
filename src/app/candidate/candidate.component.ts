import { Component, OnInit, Input, HostBinding } from '@angular/core';
import padWithleadingZeroes from 'leading-zeroes';

export interface Candidate {
  position: number;
  weight: number;
  titels: [string];
  forename: string;
  surname: string;
  gender?: string;
  birthyear: number;
  district?: string;
  image?: string;
  webpage?: string;
  ebay?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  jobs?: [string];
}

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit {

  @Input() listNumber: number;
  @Input() candidate: Candidate;

  constructor() {}

  ngOnInit() {
  }

  get number() {
    if (this.candidate && this.candidate.position) {
      return `${this.listNumber}${padWithleadingZeroes(this.candidate.position, 2)}`;
    }
    return '';
  }

  get age() {
    if (this.candidate && this.candidate.birthyear) {
      return (new Date()).getFullYear() - this.candidate.birthyear;
    }
    return '';
  }

  @HostBinding('class')
  get gender() {
    if (this.candidate.gender) {
      if (this.candidate.gender === 'm') {
        return 'male';
      } else if (this.candidate.gender === 'w') {
        return 'female';
      }
    }
    return '';
  }

}
