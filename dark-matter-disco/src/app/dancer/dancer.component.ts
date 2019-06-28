import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'svg.js';
// import { distance } from 'mathjs';
import { DrawService } from '../draw.service';
import { poseChain } from '@tensorflow-models/posenet';
import { eye } from '@tensorflow/tfjs-core';
import panda from '../../assets/skins/panda.js';
import Skin from '../../assets/skins/skin.js';

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

export class DancerComponent implements AfterViewInit, OnInit {

  constructor(private drawService: DrawService) { }

  // Inputs
  @Input() poseStream: any;
  @Input() customize: any;
  @Input() draw: any
  
  pose: any;
  skin: any = new Skin();
  skinName: string = 'stick man';

  // Canvas for animation
  @ViewChild('canvas', {static: false}) canvasRef: any;
  
  ngOnInit() {
  }

  
  ngAfterViewInit() {
 
    //  Initialize Pose
    this.pose = [
       { position: { x: -200, y: -200 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
       { position: { x: 0, y: 0 }, score: 1 },
    ];

    
    // SVG drawing tool
    const draw = this.drawService.init(700);
    
    //initialize skin
    if (this.skinName === 'stick man') {
      this.skin.init(draw, 'green');
    } else if (this.skinName === 'panda') {
      this.skin = panda;
      this.skin.init(draw);
    }

    // panda.init(draw);

    
    // let prevEyeWidth = 20;

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
  
          // // add distortion
          // if (this.customize) {
          //   dancerColor = this.customize.color;
          // } 
          
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
