import { distance } from 'mathjs';


class Skin {
  constructor() {
    this.body = {};
  }


  hide(){
    for(let part in this.body) {
      this.body[part].hide();
    }
  }

  show(){
    for(let part in this.body) {
      this.body[part].show();
    }
  }

  /**
   * The default for a skin is stick man
   * init defines the body parts
   * @param {any} draw: any 
   * @param {string} dancerColor color name or hex 
   * @param {string} headImg: url of head image
   */
  init(draw, dancerColor = 'blue', headImg) {
    // let dancerColor = 'white'
  this.body.torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 4, linecap: 'round' }).fill(dancerColor);
  this.body.leftLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 14, linecap: 'round' }).fill('none')
  this.body.leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 10, linecap: 'round' }).fill('none');
  this.body.rightLegBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 14, linecap: 'round' }).fill('none')
  this.body.rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 10, linecap: 'round' }).fill('none')
  if (headImg) {
    this.body.head = draw.image('../../assets/pandahead.png', 300, 300).addClass('panda-head').style(`background-color: ${dancerColor}`);
  } else {
    this.body.head = draw.circle(200).stroke({ color: 'black', width: 4}).fill(dancerColor);
  }
  this.body.leftArmBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 14, linecap: 'round' }).fill('none')
  this.body.leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: dancerColor, width: 10, linecap: 'round' }).fill('none')
  this.body.rightArmBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 14, linecap: 'round' }).fill('none')
  this.body.rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: dancerColor, width: 10, linecap: 'round' }).fill('none')
  }

  render(pose){
    let { leftLeg, leftLegBorder, rightLeg, rightLegBorder, torso, head, leftArmBorder, rightArmBorder, leftArm, rightArm } = this.body;
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
  // let hipWidth = rightHip.position.x - leftHip.position.x;
  // hipWidth = hipWidth < 30 ? 30 : hipWidth;
  // let leftLegLength = distance([leftHip.position.x, leftHip.position.y],[leftAnkle.position.x, leftAnkle.position.y]);
  // let rightLegLength = distance([rightHip.position.x, rightHip.position.y],[rightAnkle.position.x, rightAnkle.position.y]);
  // let headTilt = Math.atan2(rightEye.position.y - leftEye.position.y, rightEye.position.x - leftEye.position.x) * 180 / Math.PI

  // let chestCX = rightShoulder.position.x - shoulderWidth / 2;
  // let torsoCY = rightHip.position.y - torsoHeight / 2 ;
  // let hipCX = rightHip.position.x - hipWidth / 2;

  leftLeg.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 });
  leftLegBorder.plot(`M ${leftHip.position.x}, ${leftHip.position.y} C ${leftKnee.position.x}, ${leftKnee.position.y} ${leftKnee.position.x}, ${leftKnee.position.y} ${leftAnkle.position.x}, ${leftAnkle.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 + 6});
  rightLeg.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 });
  rightLegBorder.plot(`M ${rightHip.position.x}, ${rightHip.position.y} C ${rightKnee.position.x}, ${rightKnee.position.y} ${rightKnee.position.x}, ${rightKnee.position.y} ${rightAnkle.position.x}, ${rightAnkle.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 + 6});
  // torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} 
  // C ${leftShoulder.position.x - hipWidth}, ${torsoCY} ${leftHip.position.x - hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${leftHip.position.x}, ${leftHip.position.y}
  // C ${hipCX}, ${leftHip.position.y + 10} ${hipCX}, ${rightHip.position.y + 10}, ${rightHip.position.x}, ${rightHip.position.y}
  // C ${rightHip.position.x + hipWidth}, ${torsoCY + torsoHeight * 0.35 } ${rightShoulder.position.x + hipWidth}, ${torsoCY} ${rightShoulder.position.x}, ${rightShoulder.position.y}
  // C ${chestCX}, ${rightShoulder.position.y - 20} ${chestCX}, ${leftShoulder.position.y - 20} ${leftShoulder.position.x}, ${leftShoulder.position.y}
  // `);
  torso.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} ${leftHip.position.x}, ${leftHip.position.y} ${rightHip.position.x}, ${rightHip.position.y} ${rightShoulder.position.x}, ${rightShoulder.position.y}z`);
  head.cx(nose.position.x).cy(nose.position.y).size(eyeWidth * 6, eyeWidth * 6)//.rotate(headTilt);
  leftArm.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 });
  leftArmBorder.plot(`M ${leftShoulder.position.x}, ${leftShoulder.position.y} C ${leftElbow.position.x}, ${leftElbow.position.y} ${leftElbow.position.x}, ${leftElbow.position.y} ${leftWrist.position.x}, ${leftWrist.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 + 6});
  rightArm.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 });
  rightArmBorder.plot(`M ${rightShoulder.position.x}, ${rightShoulder.position.y} C ${rightElbow.position.x}, ${rightElbow.position.y} ${rightElbow.position.x}, ${rightElbow.position.y} ${rightWrist.position.x}, ${rightWrist.position.y}`)
  .stroke({ width: (torsoHeight + shoulderWidth) / 9 + 6});
  }

}

export default Skin;
