import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'svg.js';
import { distance } from 'mathjs';
import { DrawService } from '../draw.service';
import { poseChain } from '@tensorflow-models/posenet';

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
    let dancerColor = `#${Math.floor(Math.random()*16777215).toString(16)}`

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
   
    //Subscribe to pose data stream
    if (this.poseStream) {
      this.poseStream.subscribe((poses) => {
        //assign pose data to respective points
        if (poses[0]) {
          let pose = poses[0].keypoints;
  
          // add distortion
          if (this.customize) {
            dancerColor = this.customize.color;
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
    }

    // render skin
    const leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 10, linecap: 'round' }).fill(dancerColor);
    const leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const head = draw.image('../../assets/pandahead.png', 300, 300);

    let eyeWidth: number;
    let chestCX: number;
    let shoulderWidth: number;
    let hipCX: number;
    let hipWidth: number;
    let torsoCY: number;
    let torsoHeight: number;
    let leftLegLength:  number;
    let rightLegLength: number;

    // animate
    const step = (time) => {
      eyeWidth = rightEye.position.x - leftEye.position.x; 
      eyeWidth = eyeWidth < 15 ? 15 : eyeWidth;
      torsoHeight = rightHip.position.y - rightShoulder.position.y;
      shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
      hipWidth = rightHip.position.x - leftHip.position.x;
      leftLegLength = distance([leftHip.position.x, leftHip.position.y],[leftAnkle.position.x, leftAnkle.position.y]);
      rightLegLength = distance([rightHip.position.x, rightHip.position.y],[rightAnkle.position.x, rightAnkle.position.y]);

      chestCX = rightShoulder.position.x - shoulderWidth / 2;
      torsoCY = rightHip.position.y - torsoHeight / 2 ;
      hipCX = rightHip.position.x - hipWidth / 2;

      leftLeg.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
      .size(null, leftLegLength / 2);
      rightLeg.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
      .size(null, rightLegLength / 2);
      torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} 
        C ${leftShoulder.position.x - hipWidth}, ${torsoCY} ${leftHip.position.x - hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${leftHip.position.x}, ${leftHip.position.y}
        C ${hipCX}, ${leftHip.position.y + 10} ${hipCX}, ${rightHip.position.y + 10}, ${rightHip.position.x}, ${rightHip.position.y}
        C ${rightHip.position.x + hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${rightShoulder.position.x + hipWidth}, ${torsoCY} ${rightShoulder.position.x}, ${rightShoulder.position.y}
        C ${chestCX}, ${rightShoulder.position.y - 20} ${chestCX}, ${leftShoulder.position.y - 20} ${leftShoulder.position.x}, ${leftShoulder.position.y}
      `);
      head.cx(nose.position.x).cy(nose.position.y).size(eyeWidth * 10, eyeWidth * 10);
      leftArm.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
      rightArm.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
     // const headTilt = Math.atan2(rightEye.position.y - leftEye.position.y, rightEye.position.x - leftEye.position.x) //* 180 / Math.PI
    
      window.requestAnimationFrame(step);  
    }
    window.requestAnimationFrame(step);


  }

}
