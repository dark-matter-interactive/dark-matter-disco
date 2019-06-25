import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'svg.js';
import { distance } from 'mathjs';
import { DrawService } from '../draw.service';
import { poseChain } from '@tensorflow-models/posenet';
import { eye } from '@tensorflow/tfjs-core';

interface Position {
  x: number,
  y: number, 
}

interface posePoint {
  score: number,
  position: Position,
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
  @Input() pose: any;

  // Canvas for animation
  @ViewChild('canvas', {static: false}) canvasRef: any;
  
  ngOnInit() {
  }
  
  
  ngAfterViewInit() {
    let dancerColor = 'white'//`#${Math.floor(Math.random()*16777215).toString(16)}`

    let nose: posePoint = { position: { x: -200, y: -200 }, score: 1 };
    let leftEye: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightEye: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftEar: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightEar: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftShoulder: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightShoulder: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftElbow: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightElbow: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftWrist: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightWrist: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftHip: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightHip: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftKnee: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightKnee: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let leftAnkle: posePoint = { position: { x: 0, y: 0 }, score: 1 };
    let rightAnkle: posePoint = { position: { x: 0, y: 0 }, score: 1 };

    let prevPose: any;
    
    // SVG drawing tool
    const draw = this.drawService.init();


    // render skin
    const leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none');
    const rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 10, linecap: 'round' }).fill(dancerColor);
    const head = draw.image('../../assets/pandahead.png', 300, 300).addClass('panda-head').style(`background-color: ${dancerColor}`);
    const leftArmBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 72, linecap: 'round' }).fill('none')
    const leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const rightArmBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 72, linecap: 'round' }).fill('none')
    const rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')

    let eyeWidth: number;
    let chestCX: number;
    let shoulderWidth: number;
    let hipCX: number;
    let hipWidth: number;
    let torsoCY: number;
    let torsoHeight: number;
    let leftLegLength:  number;
    let rightLegLength: number;
    let headTilt: number;
    let prevEyeWidth = 20;

    // animate
    const step = (time) => {
      eyeWidth = rightEye.position.x - leftEye.position.x; 
      eyeWidth = eyeWidth < 20 ? 20 : eyeWidth;
      eyeWidth = (prevEyeWidth + eyeWidth) / 2;
      prevEyeWidth = eyeWidth;

      torsoHeight = rightHip.position.y - rightShoulder.position.y;
      shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
      shoulderWidth = shoulderWidth < 20 ? 20 : shoulderWidth;
      hipWidth = rightHip.position.x - leftHip.position.x;
      hipWidth = hipWidth < 30 ? 30 : hipWidth;
      leftLegLength = distance([leftHip.position.x, leftHip.position.y],[leftAnkle.position.x, leftAnkle.position.y]);
      rightLegLength = distance([rightHip.position.x, rightHip.position.y],[rightAnkle.position.x, rightAnkle.position.y]);
      headTilt = Math.atan2(rightEye.position.y - leftEye.position.y, rightEye.position.x - leftEye.position.x) * 180 / Math.PI

      chestCX = rightShoulder.position.x - shoulderWidth / 2;
      torsoCY = rightHip.position.y - torsoHeight / 2 ;
      hipCX = rightHip.position.x - hipWidth / 2;

      leftLeg.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
      .size(null, leftLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });
      rightLeg.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
      .size(null, rightLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });;
      torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} 
      C ${leftShoulder.position.x - hipWidth}, ${torsoCY} ${leftHip.position.x - hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${leftHip.position.x}, ${leftHip.position.y}
      C ${hipCX}, ${leftHip.position.y + 10} ${hipCX}, ${rightHip.position.y + 10}, ${rightHip.position.x}, ${rightHip.position.y}
      C ${rightHip.position.x + hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${rightShoulder.position.x + hipWidth}, ${torsoCY} ${rightShoulder.position.x}, ${rightShoulder.position.y}
      C ${chestCX}, ${rightShoulder.position.y - 20} ${chestCX}, ${leftShoulder.position.y - 20} ${leftShoulder.position.x}, ${leftShoulder.position.y}
      `);
      head.cx(nose.position.x).cy(nose.position.y).size(eyeWidth * 10, eyeWidth * 10).rotate(headTilt);
      leftArm.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
      .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
      leftArmBorder.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
      .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 20});
      rightArm.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
      .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
      rightArmBorder.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
      .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 20});
      
      window.requestAnimationFrame(step);  
    }

      //Subscribe to pose data stream
      if (this.poseStream) {
        this.poseStream.subscribe((poses) => {
          //assign pose data to respective points
          if (poses[0]) {
            let pose = poses[0].keypoints;
            if (!prevPose) {
              prevPose = pose;
            }
    
            // add distortion
            if (this.customize) {
              dancerColor = this.customize.color;
            } 
            
            // movement smoothing, average with previous points
            for(let i = 0; i < pose.length; i++) {
              pose[i].position.x = ( pose[i].position.x + prevPose[i].position.x ) / 2;
              pose[i].position.y = ( pose[i].position.y + prevPose[i].position.y ) / 2;
            }
  
            [nose, 
              leftEye, rightEye, 
              leftEar, rightEar, 
              leftShoulder, rightShoulder, 
              leftElbow, rightElbow, 
              leftWrist, rightWrist,
              leftHip, rightHip,
              leftKnee, rightKnee,
              leftAnkle, rightAnkle,
            ] = pose;
            
            prevPose = pose;
          }
        });
        window.requestAnimationFrame(step);
      }



  }

}
