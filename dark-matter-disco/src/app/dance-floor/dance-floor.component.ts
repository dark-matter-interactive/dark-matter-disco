import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { load } from '@tensorflow-models/posenet';
import { from, Observable } from 'rxjs';
/**
 * This component is responsible for managing dancer states (i.e pose data)
 * coming either directly from PoseNet data or for other user via web sockets
 */


@Component({
  selector: 'app-dance-floor',
  templateUrl: './dance-floor.component.html',
  styleUrls: ['./dance-floor.component.css']
})
export class DanceFloorComponent implements AfterViewInit {

  constructor() {}

  userPose: any;
  
  @ViewChild('webcamVideo', {static: false}) webcamVideo: any;
  
  ngAfterViewInit() {
    const webcamVideo = this.webcamVideo;

   /** 
    * Set up webcam stream and PoseNet
    * */
    const poseNetModel: any = {
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 321,
      multiplier: 0.75
    };

    const poseNetOptions: any = {
      flipHorizontal: true,
      decodingMethod: 'single-person',
    };
    
    let poseStream: any;

    if (navigator.mediaDevices.getUserMedia) {
      const webcamStream = from(navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }));
      webcamStream.subscribe((stream) => { 
          webcamVideo.nativeElement.srcObject = stream;
          from(load(poseNetModel)).subscribe((net) => {
              poseStream = Observable.create((observer) => {
                // Yield a single value and complete
                setInterval(() => {
                  from(net.estimatePoses(webcamVideo.nativeElement, poseNetOptions))
                  .subscribe((poses) => {
                      observer.next(poses);
                    });
                }, 100);
              });  

              poseStream.subscribe((poses)=>{ 
                this.userPose = poses[0];
              })
             
          });
      });  
    }


  
  
  }

}
