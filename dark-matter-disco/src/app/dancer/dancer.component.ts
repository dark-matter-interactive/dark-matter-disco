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

  nose: posePoint = { position: { x: 0, y: 0 }, score: 1 };
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
   

    // Subscribe to pose data stream
    this.poseStream.subscribe((poses) => {
      //assign pose data to respective points
      if (poses[0]) {
        let pose = poses[0].keypoints;

        // add distortion
        // if (this.distortion) {
        //   pose = JSON.parse(JSON.stringify(pose));
        //   for (let i = 0; i < pose.length; i++) {
        //     pose[i].position.x += this.distortion.shiftX;
        //     pose[i].position.y += this.distortion.shiftY;
        //   }
        // } 


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

        

      }
    });

    // console.log(poses[0].score)

    // render
    const step = (time) => {
      console.log("nose:", this.nose.position.x);


      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     
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
