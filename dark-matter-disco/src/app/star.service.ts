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

    const star = this.draw.image('../assets/star2.png').cx(-300).cy(-300).opacity(0).size(50, 50);
   
    if (username === this.username) {
      const subscription = this.userStream.subscribe((poses) => {
        let noseX = poses[0].keypoints[0].position.x
        let noseY = poses[0].keypoints[0].position.y

        star.cx(noseX).cy(noseY); 
        star.animate(300).opacity(1).after(() => {
          star.animate(2000).opacity(0);
        })
        subscription.unsubscribe();
      }, () => {});
    } else {
      const subscription = this.danceBuddies[username].poseStream.subscribe((poses) => {
        let noseX = poses[0].keypoints[0].position.x
        let noseY = poses[0].keypoints[0].position.y

        star.cx(noseX).cy(noseY); 
        star.animate(300).opacity(1).after(() => {
          star.animate(2000).opacity(0);
        })
        subscription.unsubscribe();
      })
    }
  }




}
