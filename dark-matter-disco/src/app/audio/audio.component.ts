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
  private audioSubscription: Subscription;
  constructor(private configService: ConfigService, private sanitizer: DomSanitizer, private liveSocketService: LiveSocketService) { }
  
  // create a script tag, iframe api inserted before script
  init() {
    let tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    let firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }


  ngOnInit() {
    this.init();
    this.video = this.videoID

    // create the iframe player
    window['onYouTubeIframeAPIReady'] = (e) => {
      this.YT = window['YT'];
      this.reframed = false;
      this.player = new window['YT'].Player('ytplayer', {
        height: '200',
        width: '280',
        videoId: this.video,
        playerVars: {
          enablejsapi: '1',
          controls: '0'
        },
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
    
    // Socket io sending event to change song to other users
    this.liveSocketService.on('changeSong', (videoID) => {
      console.log(videoID);
      this.videoID = videoID;
      this.player.cueVideoById(videoID);
    })
    // Socket io sending event for pausing audio
    this.liveSocketService.on('pauseSong', () => {
      this.pauseAudio();
    })
    // Socket io sending event for playing audio
    this.liveSocketService.on('playSong', () => {
      this.playAudio();
    })
  }

  // function to search youtube then set videoSrc to embed video and render on screen
  loadAudio() {
    this.audioSubscription = this.configService.searchAudio(this.val).subscribe((response: any) => {
      console.log(response, response.items[0].id.videoId);
      this.videoID = response.items[0].id.videoId;
      // Resets the video id for iframe api player
      this.video = this.videoID;
      this.player.cueVideoById(this.video);

      // Using websockets to sync audio for users
      this.liveSocketService.emit('changeSong', this.videoID);
    }, () => {}, () => {
      console.log('subscription complete');
    });
    // console.log(this.videoSrc);    
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
        this.liveSocketService.emit('playSong');

        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          console.log('paused' + ' @ ' + this.cleanTime());
        };
        this.liveSocketService.emit('pauseSong');

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

  // Create button to play and pause video
  // Create functions to bind to buttons
  playAudio() {
    this.player.playVideo();
  }

  pauseAudio() {
    this.player.pauseVideo();
  }
  
}
