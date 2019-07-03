import Skin from './skin';
// import path from 'path';


// const robot = new Skin('gray', './assets/skins/robot-head.png');

class Robot extends Skin {
  constructor(color, headImg) {
    super(color, headImg)
  }

  init(draw) {
    this.body.torso = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 4, linecap: 'square' }).fill(this.color)
    // .click(() => {  console.log('click'); this.fill({ color: 'white' }) });
    this.body.leftLegBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 14, linecap: 'square' }).fill('none')
    this.body.leftLeg  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: this.color, width: 10, linecap: 'square' }).fill('none');
    this.body.rightLegBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 14, linecap: 'square' }).fill('none')
    this.body.rightLeg = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: this.color, width: 10, linecap: 'square' }).fill('none')
    if (this.headImg) {
      this.body.head = draw.image(this.headImg, 300, 300)
    } else {
      this.body.head = draw.circle(200).stroke({ color: 'black', width: 4}).fill(this.color);
    }
    this.body.leftArmBorder  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: 'black', width: 14, linecap: 'square' }).fill('none')
    this.body.leftArm  = draw.path('M 10, 10 C 20, 20 40, 20 50, 10').stroke({ color: this.color, width: 10, linecap: 'square' }).fill('none')
    this.body.rightArmBorder = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: 'black', width: 14, linecap: 'square' }).fill('none')
    this.body.rightArm = draw.path('M 200, 200 C 300, 100 300, 50 400, 250').stroke({ color: this.color, width: 10, linecap: 'square' }).fill('none')
  
    this.isInitialized = true;
    return this;
  }

}

export default Robot;

