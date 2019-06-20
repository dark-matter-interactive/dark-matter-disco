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

  val: string = '';
  videoID: string = '';
  vid: string = 'https://www.youtube.com/embed/';
  autoplay: string = '?rel=0;&autoplay=1';
  videoSrc: any
  private audioSubscription: Subscription;
  constructor(private configService: ConfigService, private sanitizer: DomSanitizer, private liveSocketService: LiveSocketService) { }
  
  


  ngOnInit() {
    this.videoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.vid + this.videoID + this.autoplay);

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

  @ViewChild('audioPlayer', {static: false}) audioPlayer: any;

  ngAfterViewInit() {
    const audioPlayer = this.audioPlayer;
    // console.dir(audioPlayer.nativeElement.contentWindow.document);
    // audioPlayer.nativeElement.click(console.log('clicked'))
  }
  
  test() {
    const audioPlayer = this.audioPlayer;
    console.dir(audioPlayer.nativeElement.contentWindow);
  }
  
}
