import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { httpService } from '../config.service';
import { Subscription } from 'rxjs';
import { LiveSocketService } from '../live-socket.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit, OnChanges {

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  videos: any = [];
  val: string = '';
  @Input() videoID: string; 
  @Input() changeVideoID: any;
  private audioSubscription: Subscription;
  constructor(private configService: httpService, private sanitizer: DomSanitizer, private liveSocketService: LiveSocketService) { }
  
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
      // console.log(videoID);
      if (this.videoID !== videoID){
        this.videoID = videoID
        this.player.cueVideoById(videoID);
      }
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
      this.videoID = response.items[0].id.videoId;

      // Gets list of videos adds to videos
      this.videos = response.items;
     
    });
  
  }

  onPlayerStateChange(event) {
    // console.log(event);
    switch (event.data) {
      case window['YT'].PlayerState.PLAYING:
        this.liveSocketService.emit('playSong');
        break;
      case window['YT'].PlayerState.PAUSED:
        if (this.player.getDuration() - this.player.getCurrentTime() !== 0) {
          // console.log('paused' + ' @ ' + this.cleanTime());
        };
        this.liveSocketService.emit('pauseSong');
        break;
      case window['YT'].PlayerState.ENDED:
      
        break;
      case window['YT'].PlayerState.CUED:
        this.liveSocketService.emit('changeSong', this.videoID);
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

  // selects song and calls loadSong function with videoID
  selectSong = (videoID) => {
    this.changeVideoID(videoID);
  }

  // loads song into player, sends to all clients
  loadSong(videoID) {
    this.player.cueVideoById(videoID);
  }
  

 ngOnChanges(changes){
   if (changes.videoID && this.videoID) {
     this.loadSong(changes.videoID.currentValue)
   }
 }

}
