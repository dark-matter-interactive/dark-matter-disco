import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {

  val: string = '';
  videoID: string = '';
  URL: string = '';

  constructor(private http: HttpClient, private configService: ConfigService) { }
  // https://www.googleapis.com/youtube/v3
  ngOnInit() {
    // let obs = this.http.get(`https://www.googleapis.com/youtube/v3/search/?key=AIzaSyANj9wF3ST1WPdhrXeQi64o8ApBZa5Ecek&q=${val}&part=snippet&type=video`);
    // obs.subscribe((response) => console.log(response));
  }

  loadAudio() {
    this.configService.searchAudio(this.val).subscribe(data => this.videoID = data.items[0].id.videoId);
    this.URL = "https://www.youtube.com/embed/" + this.videoID;
    console.log(this.URL);
  }

}
