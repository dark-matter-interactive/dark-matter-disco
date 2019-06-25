import { Injectable } from '@angular/core';
// import 'svg.js';

declare global {
  interface Window { SVG: any; }
 }
@Injectable({
  providedIn: 'root'
})
//svg.js adds SVG to the global namespace
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
