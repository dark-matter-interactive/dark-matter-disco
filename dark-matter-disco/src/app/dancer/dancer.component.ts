import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChange } from '@angular/core';
import 'svg.js';
import { DrawService } from '../draw.service';
// import { Observable } from 'rxjs';
// import { poseChain } from '@tensorflow-models/posenet';
// import { eye } from '@tensorflow/tfjs-core';

import { Panda, StickMan, Robot } from '../../assets/skins/skins.js';

interface Position {
  x: number,
  y: number, 
}

interface posePoint {
  score: number,
  position: Position,
}

interface Pose {
  nose: posePoint,
  leftEye: posePoint,
  rightEye: posePoint,
  leftEar: posePoint,
  rightEar: posePoint,
  leftShoulder: posePoint,
  rightShoulder: posePoint,
  leftElbow: posePoint,
  rightElbow: posePoint,
  leftWrist: posePoint,
  rightWrist: posePoint,
  leftHip: posePoint,
  rightHip: posePoint,
  leftKnee: posePoint,
  rightKnee: posePoint,
  leftAnkle: posePoint,
  rightAnkle: posePoint,
}

@Component({
  selector: 'app-dancer',
  templateUrl: './dancer.component.html',
  styleUrls: ['./dancer.component.css']
})

export class DancerComponent implements AfterViewInit, OnInit, OnChanges {

  constructor(private drawService: DrawService) { }

  // Inputs
  @Input() poseStream: any;
  @Input() customize: any;
  @Input() draw: any
  @Input() skinName: string = 'stick man';
  @Input() username: string;
  
  pose: any;
  panda: any = new Panda();
  stickMan: any = new StickMan();
  redStickMan: any = new StickMan('red');
  robot: any = new Robot('gray', './assets/skins/robot-head.png');
  skin: any = this.stickMan;


  // Canvas for animation
  @ViewChild('canvas', {static: false}) canvasRef: any;
  
  ngOnInit() {
  }

  ngOnChanges(changes) {
    if (changes.skinName.previousValue && changes.skinName.previousValue !== changes.skinName.currentValue) {
      console.log("SKIN CHANGE")
      this.skin.hide(200);
      if (changes.skinName.currentValue === 'panda') {
        this.skin = this.panda;
      } else if (changes.skinName.currentValue === 'stick man') {
        this.skin = this.stickMan;
      } else if (changes.skinName.currentValue === 'robot') {
        this.skin = this.robot;
      } else if (changes.skinName.currentValue === 'red man') {
        this.skin.changeColor('red');
      } else if (changes.skinName.currentValue === 'green man') {
        this.skin.changeColor('green');
      }
      if (!this.skin.isInitialized) {
        console.log('initializing new skin...');
        this.skin.init(this.draw)
      } 

      this.skin.show();
    }
  }

  
  ngAfterViewInit() {

    console.log(this.skin)
    // SVG drawing tool
    this.draw = this.drawService.init(700);
    
    //initialize skins
    this.skin.hide();
    if (this.skinName === 'panda') {
      this.skin = this.panda;
    } else if (this.skinName === 'robot') {
      this.skin = this.robot;
    } else if (this.skinName === 'stick man') {
      this.skin = this.stickMan;
    } 
    if (!this.skin.isInitialized) this.skin.init(this.draw)
    this.skin.show();
     
  
    // let prevEyeWidth = 20;


    //  Initialize Pose
    this.pose = [
      { position: { x: -300, y: -300 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, { position: { x: 0, y: 0 }, score: 1 },
      { position: { x: 0, y: 0 }, score: 1 }, 
    ];


    // animate step function
    const step = (time) => {
      // panda.render(this.pose);
      this.skin.render(this.pose);
      window.requestAnimationFrame(step);  
    }


    // Subscribe to pose data stream and animate
    let prevPose: any;

    if (this.poseStream) {
      this.poseStream.subscribe((poses) => {
        //assign pose data to respective points
        if (poses[0]) {
          this.pose = poses[0].keypoints;
          if (!prevPose) {
            prevPose = this.pose;
          }

          // movement smoothing, average with previous points
          for(let i = 0; i < this.pose.length; i++) {
            this.pose[i].position.x = ( this.pose[i].position.x + prevPose[i].position.x ) / 2;
            this.pose[i].position.y = ( this.pose[i].position.y + prevPose[i].position.y ) / 2;
          }
          
          prevPose = this.pose;
        }
      });

      // Kick off animation
      window.requestAnimationFrame(step);
    }



  }

}
