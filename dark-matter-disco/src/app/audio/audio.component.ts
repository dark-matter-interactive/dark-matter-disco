import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../config.service';
import { Subscription } from 'rxjs';
import { LiveSocketService } from '../live-socket.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  val: string = '';
  videoID: string = '';
  vid: string = 'https://www.youtube.com/embed/';
  autoplay: string = '?rel=0;&autoplay=1&controls=0&enablejsapi=1';
  videoSrc: any
  private audioSubscription: Subscription;
  constructor(private configService: ConfigService, private sanitizer: DomSanitizer, private liveSocketService: LiveSocketService) { }
  
  init() {
    let tag = document.createElement('script');
    tag.src = 'httpa://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }


  ngOnInit() {
    this.init();
    this.video = this.videoID

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].PLayer('ytplayer', {
        videoId: this.video,
        events: {
          'onStateChange': this.onPlayerStateChange.bind(this),
          'onError': this.onPlayerError.bind(this),
          'onReady': (e) => {
            if (!this.reframed) {
              this.reframed = true;
              // reframe(e.target.a);
            }
          }
        }
      });
    };
    
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID + this.autoplay);

    // Socket io sending event to change song to other users
    this.liveSocketService.on('changeSong', (videoID) => {
      console.log(videoID);
      this.videoID = videoID;
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID + this.autoplay);
    })
  }

  // function to search youtube then set videoSrc to embed video and render on screen
  loadAudio() {
    this.audioSubscription = this.configService.searchAudio(this.val).subscribe((response: any) => {
      console.log(response, response.items[0].id.videoId);
      this.videoID = response.items[0].id.videoId;
      this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID + this.autoplay);
      // Using websockets to sync audio for users
      this.liveSocketService.emit('changeSong', this.videoID);
    }, () => {}, () => {
      console.log('subscription complete');
    });
    console.log(this.videoSrc);
    
  }

  onPlayerStateChange(event) {
    console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        if (this.cleanTime() === 0) {
          console.log('started ' + this.cleanTime());
        } else {
          console.log('playing ' + this.cleanTime())
        };
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrenttime() !== 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        break;
      case window['YT'].PlayerState.ENDED:
        console.log('ended');
        break;
    };
  };

  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  };

  onPlayerError(event) {
    switch (event.data) {
      case 2:
        console.log('' + this.video)
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }
  
}
