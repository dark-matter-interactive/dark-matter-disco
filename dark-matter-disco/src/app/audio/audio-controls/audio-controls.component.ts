import { Component, OnInit, ViewChild, OnChanges, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { ConfigService } from '../../config.service';
import { Subscription } from 'rxjs';
import { LiveSocketService } from '../../live-socket.service';
import { $ } from 'protractor';

@Component({
  selector: 'app-audio-controls',
  templateUrl: './audio-controls.component.html',
  styleUrls: ['./audio-controls.component.css']
})
export class AudioControlsComponent implements OnInit {

  public YT: any;
  public video: any;
  public player: any;
  public reframed: Boolean = false;

  videos: any = [];
  val: string = '';
  @Input() videoID: string; 
  @Input() changeVideoID: any;
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
  }


  // function to search youtube then set videoSrc to embed video and render on screen
  loadAudio() {
    this.audioSubscription = this.configService.searchAudio(this.val).subscribe((response: any) => {
      // console.log(response, response.items[0].id.videoId);
      // this.videoID = response.items[0].id.videoId;

      // Gets list of videos adds to videos
      // console.log(response);
      this.videos = response.items;
      // console.log(this.videos);
    }, () => {}, () => {
      // console.log('subscription complete');
    });
    // console.log(this.videoSrc);    
  }

 


  // selects song and calls loadSong function with videoID
  selectSong = (videoID) => {
    // this.videoID = videoID;
    this.changeVideoID(videoID);
    // this.liveSocketService.emit('changeSong', this.videoID);
    // this.loadSong(videoID);
  }

  // loads song into player, sends to all clients
  loadSong(videoID) {
    this.player.cueVideoById(videoID);
  }
  



}
