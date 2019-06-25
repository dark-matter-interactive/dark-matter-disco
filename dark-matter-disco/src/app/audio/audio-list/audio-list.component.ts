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

  // import videos from youtube search
  @Input() videos: any;
  // import function to be called on selected video
  @Input() selectSong;
  // @Output() selectSong = new EventEmitter<string>()
  ngOnInit() {
  }

}
