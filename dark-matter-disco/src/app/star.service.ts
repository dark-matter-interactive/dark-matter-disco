import { Injectable } from '@angular/core';
import { DrawService } from './draw.service';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private drawService: DrawService) { }

  danceBuddies: any;
  userStream: any;
  username: string;
  draw: any;

  init(danceBuddies) {
    this.danceBuddies = danceBuddies;
  }
  
  addUserStream(username, userStream) {
    this.username = username;
    this.userStream = userStream;
  }
  
  giveStar(username){
    this.draw = this.drawService.getDraw();
    console.log("SERVICE:star for....", username)
    if (username = this.username) {
      this.userStream.subscribe((poses) => {
        let noseX = poses[0].keypoints[0].position.x
        let noseY = poses[0].keypoints[0].position.y
        // console.log(nose);
        this.draw.circle(20).cx(noseX).cy(noseY).fill('red');
  
      });
    } else {
      this.danceBuddies[username].poseStream.subscribe((poses) => {
        let nose = poses[0].keypoints[0].position.x
        console.log(nose);
      })
    }
  }


}
