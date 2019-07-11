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
    const rando = Math.floor(Math.random() * 6);
    const randoSize = Math.floor(Math.random() * 100 + 40)
    const randoShiftX = Math.floor((Math.random() - 0.5) * 140);
    const randoShiftY = Math.floor((Math.random() - 0.5) * 140);
    const star = this.draw.image(`../assets/star${rando}.png`)
    star.cx(-300).cy(-300).opacity(0).size(randoSize, randoSize);
   
    if (username === this.username) {
      const subscription = this.userStream.subscribe((poses) => {
        let noseX = poses[0].keypoints[0].position.x + randoShiftX;
        let noseY = poses[0].keypoints[0].position.y + randoShiftY;

        star.cx(noseX).cy(noseY); 
        star.animate(300).opacity(1).after(() => {
          star.animate(2000).opacity(0);
        })
        subscription.unsubscribe();
      }, () => {});
    } else {
      const subscription = this.danceBuddies[username].poseStream.subscribe((poses) => {
        let noseX = poses[0].keypoints[0].position.x + randoShiftX;
        let noseY = poses[0].keypoints[0].position.y + randoShiftY;

        star.cx(noseX).cy(noseY); 
        star.animate(300).opacity(1).after(() => {
          star.animate(2000).opacity(0);
        })
        subscription.unsubscribe();
      })
    }
  }




}
