import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { load } from '@tensorflow-models/posenet';
import { from, Observable, Subject } from 'rxjs';
import { LiveSocketService } from "../live-socket.service";
import { StarService } from '../star.service';

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

  constructor(private liveSocketService: LiveSocketService, private starService: StarService) {}

  // username and friend username
  @Input() username: string;
  @Input() hasJoined: boolean;
  @Input() danceBuddies: any;
  @Input() skinName: string;

  
  // this is the users pose data as an observable
  userPoseStream: any = new Subject();
  friendPoseStream: any = new Subject();

  //webcam html element ref
  @ViewChild('webcamVideo', {static: false}) webcamVideo: any;
  
  ngAfterViewInit() {
    //give star service access to user pose data
    this.starService.addUserStream(this.username, this.userPoseStream)
    
    /** 
     * PoseNet
     * poseNetModel: inputResolution - Can be one of 161, 193, 257, 289, 321, 353, 385, 417, 449, 481, 
     * higher resolution has better accuracy at the cost of speed
     * */
    const poseNetModel: any = {
      architecture: 'MobileNetV1',
      outputStride: 16,
      inputResolution: 417,
      multiplier: 0.5
    };
    
    const poseNetOptions: any = {
      flipHorizontal: true,
      decodingMethod: 'multi-person',
    };
    
    // delay in milliseconds between calls to estimate pose from webcam
    const delay = 50;
    
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
    const socketService = this.liveSocketService;

    // send user pose data to friends
    this.userPoseStream.subscribe((poses) => {
      if (this.hasJoined) {
        socketService.emit('pose', this.username, poses, this.skinName);
      }
    })
    
    // listen for pose data from friends
    socketService.on('pose', (username, poses, skinName = 'yellow') => {
      if (this.danceBuddies[username]) {
        this.danceBuddies[username].skinName = skinName;
        this.danceBuddies[username].poseStream.next(poses) //= pose;
      }
    })
  }
}
