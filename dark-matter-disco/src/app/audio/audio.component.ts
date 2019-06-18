import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../config.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  val: string = '';
  videoID: string = '';
  vid: string = 'https://www.youtube.com/embed/';
  html;

  constructor(private http: HttpClient, private configService: ConfigService, private sanitizer: DomSanitizer) { }
  // https://www.googleapis.com/youtube/v3
  ngOnInit() {
    // this.loadAudio();
    // this.loadPlayer();
  }

  loadAudio() {
    this.configService.searchAudio(this.val).subscribe(response => {
      console.log(response.items[0].id.videoId);
      this.videoID = response.items[0].id.videoId;
    });
    this.vid = "https://www.youtube.com/embed/" + this.videoID;
    console.log(this.vid);
  }

  loadPlayer() {
    return this.html = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid);
  }

}
