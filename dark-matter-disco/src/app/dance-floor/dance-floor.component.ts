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
  friendPoseStream: any = new Subject();
  friendUsername: string = null;
   // backup dancer
   backup1: any = {
    shiftX: 400,
    shiftY: -80,
    height: 0.8,
    color: "blue"
  };

  //webcame html element ref
  @ViewChild('webcamVideo', {static: false}) webcamVideo: any;
  
  ngAfterViewInit() {

    /** 
     * PoseNet
     * poseNetModel: inputResolution - Can be one of 161, 193, 257, 289, 321, 353, 385, 417, 449, 481, 
     * higher resolution has better accuracy at the cost of speed
     * */
    const poseNetModel: any = {
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 289,
      multiplier: 0.75
    };
    
    const poseNetOptions: any = {
      flipHorizontal: true,
      decodingMethod: 'multi-person',
    };
    
    // delay in milliseconds between calls to estimate pose from webcam
    const delay = 80;
    
    // webcam
    const webcamVideo = this.webcamVideo;
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
    const socket = io();
    console.log(socket);
    const usernames = ['Rayman', 'Jesse', 'Smiley', 'Erica'];
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    //make socket event listener for usernames
    socket.emit('user', username);
    socket.on('test', (id) => {
      console.log(id);
    })
    this.userPoseStream.subscribe((poses) => {
      socket.emit('pose', poses, this.friendUsername);
      socket.emit('test', socket.id, 'message for test');
    })
    socket.on('pose', (pose) => {
      this.friendPoseStream.next(pose);
      // console.log(pose);
    })
  }

}
