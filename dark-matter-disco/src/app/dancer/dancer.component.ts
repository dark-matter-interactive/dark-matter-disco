import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'svg.js';
import { distance } from 'mathjs';
import { DrawService } from '../draw.service';

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
  @Input() customize: any;
  @Input() draw: any

  // Canvas for animation
  @ViewChild('canvas', {static: false}) canvasRef: any;
  
  ngOnInit() {
  }
  
  //SVG
  // window.SVG: any;
  
  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    let dancerColor = "white";
    
    // if (!this.draw) {
    //    this.draw = window.SVG('dancer').size(900,900); 
    // }

    const draw = this.drawService.init();

    console.log(draw);
    // const leftArm = draw.path('m 339,214 c 7.33333,2 13.33333,5.33333 18,10 5.33333,5.33333 12.66667,18.33333 22,39 9.33333,21.33333 22,58.33333 38,111 16,52.66667 28.33333,99.33333 37,140 0,0 13.371,59.25 14,61 0.629,1.75 2.129,2.5 4.879,2 2.75,-0.5 2.121,-5 2.121,-5 l -9,-61 c -6,-40.66667 -15.33333,-85.33333 -28,-134 -12,-48.66667 -19.33333,-81.66667 -22,-99 -2.66667,-17.33333 -2.66667,-29.33333 0,-36 2.66667,-6.66667 8,-12.66667 16,-18 8,-4.66667 17,-5.66667 27,-3 10,2.66667 18.33333,7.33333 25,14 7.33333,7.33333 15,19.66667 23,37 8,17.33333 17,42.66667 27,76 10,33.33333 20,73.33333 30,120 10.66667,47.33333 17,82 19,104 2.66667,22 9.66667,46 21,72 11.33333,26 23,47.66667 35,65 12.66667,18 24.33333,32.33333 35,43 11.33333,10.66667 19.33333,15.66667 24,15 4.66667,-0.66667 9.66667,-4.33333 15,-11 6,-6 18,-29.33333 36,-70 18,-40.66667 32.33333,-67.33333 43,-80 10.66667,-12.66667 21.66667,-23.33333 33,-32 11.33333,-8.66667 22.66667,-15.33333 34,-20 12,-4.66667 23.66667,-7 35,-7 11.33333,0 19.66667,2 25,6 5.33333,4.66667 7.66667,9.33333 7,14 0,4.66667 -4.66667,15.33333 -14,32 -9.33333,16.66667 -22,47 -38,91 -16,44.66667 -25,72 -27,82 -1.33333,10.66667 -1.33333,19.33333 0,26 1.33333,6.66667 1.66667,20.33333 1,41 -0.66667,21.33333 -2.33333,35.66667 -5,43 -2,7.33333 -18,36 -48,86 -29.33333,50.6667 -52,85.3333 -68,104 -16,18.6667 -23.66667,36.6667 -23,54 0.66667,18 6.66667,57.6667 18,119 90.41899,503.5046 212.50054,892.6295 331.256,1293.7698 2.3248,161.2615 -35.5488,294.5172 -169.88581,360.5679 -90.63362,4.8406 -181.26723,9.9295 -271.90085,-151.077 C 507.94913,2277.2838 589.49019,2060.3897 427,1308 c 0.66667,-19.3333 -1,-40 -5,-62 -3.33333,-22 -11.66667,-44 -25,-66 -12.66667,-22 -30,-47.6667 -52,-77 -22,-28.6667 -39.66667,-54.6667 -53,-78 -12.66667,-22.6667 -26.33333,-53 -41,-91 -14,-37.33333 -25,-72 -33,-104 -8,-31.33333 -28.33333,-80.33333 -61,-147 -32.66667,-66 -51.66667,-107 -57,-123 -5.333333,-16 -8,-28 -8,-36 0,-7.33333 3.333333,-14.66667 10,-22 6.66667,-6.66667 12.33333,-10.33333 17,-11 4.66667,-0.66667 9.33333,0 14,2 5.33333,2 30,39.66667 74,113 0,0 62.871,105.75 66,110 3.129,4.25 28.621,16.75 21,-22 -5.08067,-25.83333 -5.08067,-25.83333 0,0 0,-11.33333 -21.33333,-69.33333 -64,-174 0,0 -55.242,-126 -59.242,-143.5 C 166.758,359 168,351 168,351 c 1.33333,-8 4.33333,-14.33333 9,-19 4.66667,-4 11,-7.33333 19,-10 8.66667,-2 15.33333,-2.33333 20,-1 5.33333,2 10,5 14,9 4,4.66667 8.66667,14 14,28 6,14.66667 23.66667,51 53,109 29.33333,58 47.66667,98 55,120 0,0 9.121,28.5 12,33 2.879,4.5 15.871,15.5 13,-8 -1.914,-15.66667 -1.914,-15.66667 0,0 0,-7.33333 -6,-35.33333 -18,-84 -11.33333,-48.66667 -26.33333,-105.66667 -45,-171 0,0 -19.242,-64.5 -23.242,-83 -4,-18.5 -2,-31.5 -2,-31.5 8,-18 9.984,-21 26.242,-25.5 16.258,-4.5 24,-3 24,-3 z')
    // .stroke({ color: '#f06', width: 2, linecap: 'round', linejoin: 'round' })
    // .size(200)

   

    // const rect = draw.rect(100, 100).attr({ fill: '#f06' })
    
    // Subscribe to pose data stream
    const tolerance = 0.01;
    this.poseStream.subscribe((poses) => {
      //assign pose data to respective points
      if (poses[0]) {
        let pose = poses[0].keypoints;

        // add distortion
        if (this.customize) {
          // pose = JSON.parse(JSON.stringify(pose));
          // for (let i = 0; i < pose.length; i++) {
          //   pose[i].position.x += this.distortion.shiftX;
          //   pose[i].position.y += this.distortion.shiftY;
          // }
          dancerColor = this.customize.color;
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

      }
    });

    const leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10')
    .stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')
    const rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250')
    .stroke({ color: dancerColor, width: 60, linecap: 'round' }).fill('none')

    let leftArmTilt = 0; 
    let leftArmLength = 200;
    let leftArmCX = 0;
    let leftArmCY = 0;

    // render character
    const step = (time) => {

      // hand.animate(80).move({ cx: 800, cy: 800 })
      // leftArmCX = Math.abs(this.leftWrist.position.x - this.leftElbow.position.x);
      // leftArmCY = Math.abs(this.leftWrist.position.y - this.leftElbow.position.y);
      // // leftArm.cx(leftArmCX).cy(leftArmCY);
      // leftArmLength = distance([this.leftWrist.position.x, this.leftWrist.position.y], [this.leftElbow.position.x, this.leftElbow.position.y]);
      // // leftArmTilt = Math.atan2(this.leftWrist.position.y - this.leftElbow.position.y, this.leftWrist.position.x - this.leftElbow.position.x) * 180 / Math.PI + 90
      // console.log(Math.floor(this.leftElbow.position.y));
      // leftArm.cx(this.leftElbow.position.x ).y(this.leftElbow.position.y - leftArmLength)
      // // leftArm.rotate(leftArmTilt, Math.floor(this.leftElbow.position.x), Math.floor(this.leftElbow.position.y));
      // leftArm.rotate(leftArmTilt, 200, 400)
      // leftArm.size(null, leftArmLength || 20);

      leftArm.plot(`M ${this.leftShoulder.position.x}, ${this.leftShoulder.position.y} C ${this.leftElbow.position.x}, ${this.leftElbow.position.y} ${this.leftElbow.position.x}, ${this.leftElbow.position.y} ${this.leftWrist.position.x}, ${this.leftWrist.position.y}`)
      rightArm.plot(`M ${this.rightShoulder.position.x}, ${this.rightShoulder.position.y} C ${this.rightElbow.position.x}, ${this.rightElbow.position.y} ${this.rightElbow.position.x}, ${this.rightElbow.position.y} ${this.rightWrist.position.x}, ${this.rightWrist.position.y}`)





      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = dancerColor;
      ctx.fillStyle = dancerColor;
    

      // Head
      ctx.beginPath()
      let eyeWidth: number = this.rightEye.position.x - this.leftEye.position.x; 
      eyeWidth = eyeWidth < 15 ? 15 : eyeWidth;
    
      // ctx.ellipse(leftArmCX, leftArmCY, 20, 20, 0, 0, 2 * Math.PI)

      // ctx.drawImage(panda, pose1[0].position.x - (eyeWidth*5), pose1[0].position.y - (eyeWidth*4), eyeWidth * 10, eyeWidth * 8)
      const headTilt = Math.atan2(this.rightEye.position.y - this.leftEye.position.y, this.rightEye.position.x - this.leftEye.position.x) //* 180 / Math.PI
      // console.log(headTilt)
      ctx.ellipse(this.nose.position.x, this.nose.position.y, eyeWidth * 2, eyeWidth * 2.5, headTilt, 0, 2 *Math.PI);
      ctx.fill();
      ctx.stroke();
  
      //arms
      // ctx.beginPath();
      // ctx.moveTo(this.leftWrist.position.x, this.leftWrist.position.y);
      // ctx.lineTo(this.leftElbow.position.x, this.leftElbow.position.y);
      // ctx.lineTo(this.leftShoulder.position.x, this.leftShoulder.position.y);
      // ctx.lineTo(this.rightShoulder.position.x, this.rightShoulder.position.y);
      // ctx.lineTo(this.rightElbow.position.x, this.rightElbow.position.y);
      // ctx.lineTo(this.rightWrist.position.x, this.rightWrist.position.y);
      // ctx.lineWidth = 12;
      // ctx.stroke();

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
