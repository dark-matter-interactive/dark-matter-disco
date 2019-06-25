import { Injectable } from '@angular/core';
import 'svg.js';
import { AsyncHook } from 'async_hooks';
import { asinh} from '@tensorflow/tfjs-core';

//svg.js adds SVG to the global namespace
declare global {
  interface Window { SVG: any; }
}

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  draw: any;

  /**
   * init calls SVG 'dancer
   */
  init() {
    if (!this.draw) {
      this.draw = window.SVG('dancer').size(900,900); 
    }
    return this.draw;
  }

}
