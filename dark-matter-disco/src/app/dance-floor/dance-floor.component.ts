import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { load } from '@tensorflow-models/posenet';
import { from, Observable, Subject } from 'rxjs';
import io  from 'socket.io-client';

/**
 * This component is responsible for managing dancer states (i.e pose data)
 * coming either directly from PoseNet data or for other user via web sockets
 */


@Component({
  selector: 'app-dance-floor',
  templateUrl: './dance-floor.component.html',
  styleUrls: ['./dance-floor.component.css']
})
export class DanceFloorComponent implements AfterViewInit, OnInit {

  constructor() {}

  // this is the users pose data as an observable
  userPoseStream: any = new Subject();
  
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
      decodingMethod: 'multi-person',
    };
    
    // delay in milliseconds between calls to estimate pose from webcam
    const delay = 80;

    // webcam
    if (navigator.mediaDevices.getUserMedia) {
      const webcamStream = from(navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } }));
      webcamStream.subscribe((stream) => { 
        webcamVideo.nativeElement.srcObject = stream;
        // load posnet
        from(load(poseNetModel)).subscribe((net) => {
          //Repeat calls to estimate pose and emit from poseStream
          setInterval(() => {
            from(net.estimatePoses(webcamVideo.nativeElement, poseNetOptions))
            .subscribe((poses) => {
                this.userPoseStream.next(poses);
              });
          }, delay);
        });
      });  
    }

    
  }
  
  /**
   * Web Socket 
   * for friend pose data
   */
  ngOnInit() {
    const socket = io('ws://localhost:3000');
    this.userPoseStream.subscribe((poses) => {
      socket.emit('pose', poses);
    })
    socket.on('pose', (pose) => {
      console.log(pose);
    })
  }

}
