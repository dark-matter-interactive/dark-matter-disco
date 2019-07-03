import { distance } from 'mathjs';
import Skin from './skin';


// const panda = new Skin();

class Panda extends Skin {
  constructor(color, headImg) {
    super(color, headImg)
  }

  init(draw) {
    let dancerColor = 'white'
    this.body.leftLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
    this.body.leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none');
    this.body.rightLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
    this.body.rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')
    this.body.torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 10, linecap: 'round' }).fill(dancerColor);
    this.body.head = draw.image('../../assets/pandahead.png', 300, 300).addClass('panda-head').style(`background-color: ${dancerColor}`);
    this.body.leftArmBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
    this.body.leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')
    this.body.rightArmBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
    this.body.rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')
  
    this.isInitialized = true;
    return this;
  }


  render(pose){
    let { leftLegBorder, rightLegBorder, leftLeg, rightLeg, torso, head, leftArmBorder, rightArmBorder, leftArm, rightArm } = this.body;
    let [
      nose,
      leftEye,
      rightEye,
      leftEar,
      rightEar,
      leftShoulder,
      rightShoulder,
      leftElbow,
      rightElbow,
      leftWrist,
      rightWrist,
      leftHip,
      rightHip,
      leftKnee,
      rightKnee,
      leftAnkle,
      rightAnkle,
    ] = pose;
    let eyeWidth = rightEye.position.x - leftEye.position.x; 
    eyeWidth = eyeWidth < 20 ? 20 : eyeWidth;
    // eyeWidth = (prevEyeWidth + eyeWidth) / 2;
    // let prevEyeWidth = eyeWidth;
  
    let torsoHeight = rightHip.position.y - rightShoulder.position.y;
    let shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
    shoulderWidth = shoulderWidth < 20 ? 20 : shoulderWidth;
    let hipWidth = rightHip.position.x - leftHip.position.x;
    hipWidth = hipWidth < 30 ? 30 : hipWidth;
    let leftLegLength = distance([leftHip.position.x, leftHip.position.y],[leftAnkle.position.x, leftAnkle.position.y]);
    let rightLegLength = distance([rightHip.position.x, rightHip.position.y],[rightAnkle.position.x, rightAnkle.position.y]);
    // let headTilt = Math.atan2(rightEye.position.y - leftEye.position.y, rightEye.position.x - leftEye.position.x) * 180 / Math.PI
  
    let chestCX = rightShoulder.position.x - shoulderWidth / 2;
    let torsoCY = rightHip.position.y - torsoHeight / 2 ;
    let hipCX = rightHip.position.x - hipWidth / 2;
  
    leftLeg.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
    .size(null, leftLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });
    leftLegBorder.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
    .size(null, leftLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 + 8});
    rightLeg.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
    .size(null, rightLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });
    rightLegBorder.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
    .size(null, rightLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 + 8});
    torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} 
    C ${leftShoulder.position.x - hipWidth}, ${torsoCY} ${leftHip.position.x - hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${leftHip.position.x}, ${leftHip.position.y}
    C ${hipCX}, ${leftHip.position.y + 10} ${hipCX}, ${rightHip.position.y + 10}, ${rightHip.position.x}, ${rightHip.position.y}
    C ${rightHip.position.x + hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${rightShoulder.position.x + hipWidth}, ${torsoCY} ${rightShoulder.position.x}, ${rightShoulder.position.y}
    C ${chestCX}, ${rightShoulder.position.y - 20} ${chestCX}, ${leftShoulder.position.y - 20} ${leftShoulder.position.x}, ${leftShoulder.position.y}
    `);
    head.cx(nose.position.x).cy(nose.position.y).size(eyeWidth * 10, eyeWidth * 10)//.rotate(headTilt);
    leftArm.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
    .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
    leftArmBorder.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
    .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 8});
    rightArm.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
    .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
    rightArmBorder.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
    .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 8});
  
  }

}


export default Panda;



// panda.init = function(draw) {
//   let dancerColor = 'white'
//   this.body.leftLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
//   this.body.leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none');
//   this.body.rightLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
//   this.body.rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')
//   this.body.torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 10, linecap: 'round' }).fill(dancerColor);
//   this.body.head = draw.image('../../assets/pandahead.png', 300, 300).addClass('panda-head').style(`background-color: ${dancerColor}`);
//   this.body.leftArmBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
//   this.body.leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')
//   this.body.rightArmBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: '#EEEEEE', width: 70, linecap: 'round' }).fill('none')
//   this.body.rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 60, linecap: 'round' }).fill('none')

//   this.isInitialized = true;
//   return this;
// }

// panda.render = function(pose){
//   let { leftLegBorder, rightLegBorder, leftLeg, rightLeg, torso, head, leftArmBorder, rightArmBorder, leftArm, rightArm } = this.body;
//   let [
//     nose,
//     leftEye,
//     rightEye,
//     leftEar,
//     rightEar,
//     leftShoulder,
//     rightShoulder,
//     leftElbow,
//     rightElbow,
//     leftWrist,
//     rightWrist,
//     leftHip,
//     rightHip,
//     leftKnee,
//     rightKnee,
//     leftAnkle,
//     rightAnkle,
//   ] = pose;
//   let eyeWidth = rightEye.position.x - leftEye.position.x; 
//   eyeWidth = eyeWidth < 20 ? 20 : eyeWidth;
//   // eyeWidth = (prevEyeWidth + eyeWidth) / 2;
//   // let prevEyeWidth = eyeWidth;

//   let torsoHeight = rightHip.position.y - rightShoulder.position.y;
//   let shoulderWidth = rightShoulder.position.x - leftShoulder.position.x;
//   shoulderWidth = shoulderWidth < 20 ? 20 : shoulderWidth;
//   let hipWidth = rightHip.position.x - leftHip.position.x;
//   hipWidth = hipWidth < 30 ? 30 : hipWidth;
//   let leftLegLength = distance([leftHip.position.x, leftHip.position.y],[leftAnkle.position.x, leftAnkle.position.y]);
//   let rightLegLength = distance([rightHip.position.x, rightHip.position.y],[rightAnkle.position.x, rightAnkle.position.y]);
//   // let headTilt = Math.atan2(rightEye.position.y - leftEye.position.y, rightEye.position.x - leftEye.position.x) * 180 / Math.PI

//   let chestCX = rightShoulder.position.x - shoulderWidth / 2;
//   let torsoCY = rightHip.position.y - torsoHeight / 2 ;
//   let hipCX = rightHip.position.x - hipWidth / 2;

//   leftLeg.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
//   .size(null, leftLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });
//   leftLegBorder.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
//   .size(null, leftLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 + 8});
//   rightLeg.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
//   .size(null, rightLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 });
//   rightLegBorder.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
//   .size(null, rightLegLength / 2).stroke({ width: (torsoHeight + shoulderWidth) / 4 + 8});
//   torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} 
//   C ${leftShoulder.position.x - hipWidth}, ${torsoCY} ${leftHip.position.x - hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${leftHip.position.x}, ${leftHip.position.y}
//   C ${hipCX}, ${leftHip.position.y + 10} ${hipCX}, ${rightHip.position.y + 10}, ${rightHip.position.x}, ${rightHip.position.y}
//   C ${rightHip.position.x + hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${rightShoulder.position.x + hipWidth}, ${torsoCY} ${rightShoulder.position.x}, ${rightShoulder.position.y}
//   C ${chestCX}, ${rightShoulder.position.y - 20} ${chestCX}, ${leftShoulder.position.y - 20} ${leftShoulder.position.x}, ${leftShoulder.position.y}
//   `);
//   head.cx(nose.position.x).cy(nose.position.y).size(eyeWidth * 10, eyeWidth * 10)//.rotate(headTilt);
//   leftArm.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
//   .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
//   leftArmBorder.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
//   .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 8});
//   rightArm.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
//   .stroke({ width: (torsoHeight + shoulderWidth) / 6 });
//   rightArmBorder.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
//   .stroke({ width: (torsoHeight + shoulderWidth) / 6 + 8});

// }

