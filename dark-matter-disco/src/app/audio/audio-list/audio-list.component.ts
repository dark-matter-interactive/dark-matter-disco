import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AudioComponent } from '../audio.component';

@Component({
  selector: 'audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.css']
})
export class AudioListComponent implements OnInit {

  videoID: string = '';

  constructor() { }

  @Input() videos: any;
  @Input() selectSong;
  // @Output() selectSong = new EventEmitter<string>()
  ngOnInit() {
  }

}
