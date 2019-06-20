import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../config.service';
import { Subscription } from 'rxjs';
import { LiveSocketService } from '../live-socket.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  val: string = '';
  videoID: string = '';
  vid: string = 'https://www.youtube.com/embed/';
  videoSrc: any
  private audioSubscription: Subscription;
  constructor(private configService: ConfigService, private sanitizer: DomSanitizer, private liveSocketService: LiveSocketService) { }
  
  


  ngOnInit() {
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID);

    this.liveSocketService.on('changeSong', (videoID) => {
      console.log(videoID);
      this.videoID = videoID;
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID);
    })
  }

  // function to search youtube then set videoSrc to embed video and render on screen
  loadAudio() {
    this.audioSubscription = this.configService.searchAudio(this.val).subscribe((response: any) => {
      console.log(response, response.items[0].id.videoId);
      this.videoID = response.items[0].id.videoId;
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID);
      // Using websockets to sync audio for users
      this.liveSocketService.emit('changeSong', this.videoID);
    }, () => {}, () => {
      console.log('subscription complete');
    });
    console.log(this.videoSrc);
    
  }

  
}
