import { Injectable } from '@angular/core';
import 'svg.js';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  draw: any;

  init() {
    if (!this.draw) {
      this.draw = window.SVG('dancer').size(900,900); 
    }
    return this.draw;
  }

}
