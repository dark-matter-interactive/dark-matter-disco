import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';

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

export class DancerComponent implements AfterViewInit {

  constructor() { }

  nose: posePoint = { position: { x: -200, y: -200 }, score: 1 };
  leftEye: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightEye: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftEar: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightEar: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftShoulder: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightShoulder: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftElbow: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightElbow: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftWrist: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightWrist: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftHip: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightHip: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftKnee: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightKnee: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  leftAnkle: posePoint = { position: { x: 0, y: 0 }, score: 1 };
  rightAnkle: posePoint = { position: { x: 0, y: 0 }, score: 1 };

  // Inputs
  @Input() poseStream: any;
  @Input() distortion: any;

  // Canvas for animation
  @ViewChild('canvas', {static: false}) canvasRef: any;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    let dancerColor = "white";
   

    // Subscribe to pose data stream
    const tolerance = 0.01;
    this.poseStream.subscribe((poses) => {
      //assign pose data to respective points
      if (poses[0]) {
        let pose = poses[0].keypoints;

        // add distortion
        if (this.distortion) {
          // pose = JSON.parse(JSON.stringify(pose));
          for (let i = 0; i < pose.length; i++) {
            pose[i].position.x += this.distortion.shiftX;
            pose[i].position.y += this.distortion.shiftY;
          }
          dancerColor = this.distortion.color;
        } 

        // TO DO add confidence test before resassign

        [this.nose, 
          this.leftEye, this.rightEye, 
          this.leftEar, this.rightEar, 
          this.leftShoulder, this.rightShoulder, 
          this.leftElbow, this.rightElbow, 
          this.leftWrist, this.rightWrist,
          this.leftHip, this.rightHip,
          this.leftKnee, this.rightKnee,
          this.leftAnkle, this.rightAnkle,
        ] = pose;
        // if (pose[0].score > tolerance) this.nose = pose[0];
        // if (pose[1].score > tolerance) this.leftEye = pose[1];
        // if (pose[2].score > tolerance) this.rightEye = pose[2];
        // if (pose[3].score > tolerance) this.leftEar = pose[3];
        // if (pose[4].score > tolerance) this.rightEar = pose[4];
        // if (pose[5].score > tolerance) this.leftShoulder = pose[5];
        // if (pose[6].score > tolerance) this.rightShoulder = pose[6];
        // if (pose[7].score > tolerance) this.leftElbow = pose[7];
        // if (pose[8].score > tolerance) this.rightElbow = pose[8];
        // if (pose[9].score > tolerance) this.leftWrist = pose[9];
        // if (pose[10].score > tolerance) this.rightWrist = pose[10];
        // if (pose[11].score > tolerance) this.leftHip = pose[11];
        // if (pose[12].score > tolerance) this.rightHip = pose[12];
        // if (pose[13].score > tolerance) this.leftKnee = pose[13];
        // if (pose[14].score > tolerance) this.rightKnee = pose[14];
        // if (pose[15].score > tolerance) this.leftAnkle = pose[15];
        // if (pose[16].score > tolerance) this.rightAnkle = pose[16];


        // console.log(this.rightWrist.score)
      }
    });


    // render character
    const step = (time) => {

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = dancerColor;
      ctx.fillStyle = dancerColor;
     
      // Head
      ctx.beginPath()
      let eyeWidth: number = this.rightEye.position.x - this.leftEye.position.x; 
      eyeWidth = eyeWidth < 15 ? 15 : eyeWidth;
     
      // ctx.drawImage(panda, pose1[0].position.x - (eyeWidth*5), pose1[0].position.y - (eyeWidth*4), eyeWidth * 10, eyeWidth * 8)
      ctx.ellipse(this.nose.position.x, this.nose.position.y, eyeWidth * 2, eyeWidth * 2, Math.PI / 4, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
  
      //arms
      ctx.beginPath();
      ctx.moveTo(this.leftWrist.position.x, this.leftWrist.position.y);
      ctx.lineTo(this.leftElbow.position.x, this.leftElbow.position.y);
      ctx.lineTo(this.leftShoulder.position.x, this.leftShoulder.position.y);
      ctx.lineTo(this.rightShoulder.position.x, this.rightShoulder.position.y);
      ctx.lineTo(this.rightElbow.position.x, this.rightElbow.position.y);
      ctx.lineTo(this.rightWrist.position.x, this.rightWrist.position.y);
      ctx.lineWidth = 12;
      ctx.stroke();

      //legs
      ctx.beginPath();
      ctx.moveTo(this.leftAnkle.position.x, this.leftAnkle.position.y);
      ctx.lineTo(this.leftKnee.position.x, this.leftKnee.position.y);
      ctx.lineTo(this.leftHip.position.x, this.leftHip.position.y);
      ctx.lineTo(this.rightHip.position.x, this.rightHip.position.y);
      ctx.lineTo(this.rightKnee.position.x, this.rightKnee.position.y);
      ctx.lineTo(this.rightAnkle.position.x, this.rightAnkle.position.y);
      ctx.lineWidth = 20;
      ctx.stroke();

      //torso
      ctx.beginPath();
      ctx.moveTo(this.leftShoulder.position.x, this.leftShoulder.position.y);
      ctx.lineTo(this.rightShoulder.position.x, this.rightShoulder.position.y);
      ctx.lineTo(this.rightHip.position.x, this.rightHip.position.y);
      ctx.lineTo(this.leftHip.position.x, this.leftHip.position.y);
      ctx.closePath();
      ctx.lineWidth = 7;
      ctx.stroke();

      ctx.restore(); 

      window.requestAnimationFrame(step);  
    }
    window.requestAnimationFrame(step);


  }

}
