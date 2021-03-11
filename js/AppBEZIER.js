const { ipcRenderer } = require("electron");

const config = {
  waveSpeed: 1,
  wavesToBlend: 2,
  curvesNum: 3,
  framesToMove: 120,
  angle: -300,
  color: "rgb(255,255,255)",
};

class waveNoise {
  constructor() {
    this.waveSet = [];
  }

  addWaves(requiredWaves) {
    for (let i = 0; i < requiredWaves; ++i) {
      let randomAngle = Math.random() * config.angle;
      this.waveSet.push(randomAngle);
    }
  }

  getWave() {
    let blendedWave = 0;
    for (let e of this.waveSet) {
      blendedWave += Math.sin((e / 180) * Math.PI);
    }
    return (blendedWave / this.waveSet.length + 1) / 1.5;
  }

  update() {
    this.waveSet.forEach((e, i) => {
      let r = Math.random() * (i + 1) * config.waveSpeed;
      this.waveSet[i] = (e + r) % 360;
    });
  }
}

class Animation {
  constructor() {
    this.cnv = null;
    this.ctx = null;
    this.size = { w: 0, h: 0, cx: 0, cy: 0 };
    this.controls = [];
    this.controlsNum = 3;
    this.curvesNum = 3;
    this.framesCounter = 0;
    this.type4Start = 0.7;
    this.type4End = 0.7;
    this.initListener();
  }
 
  initListener() {
    ipcRenderer.on("messageDiscord", this.onMessage.bind(this));
  }

  init() {
    this.createCanvas();
    this.createControls();
    this.updateAnimation();
  }

  createCanvas() {
    this.cnv = document.createElement("canvas");
    this.ctx = this.cnv.getContext("2d");
    this.setCanvasSize();
    document.body.appendChild(this.cnv);
    window.addEventListener("resize", () => this.setCanvasSize());
  }

  setCanvasSize() {
    this.size.w = this.cnv.width = window.innerWidth;
    this.size.h = this.cnv.height = window.innerHeight;
    this.size.cx = this.size.w / 2;
    this.size.cy = this.size.h / 2;
  }

  createControls() {
    for (let i = 0; i < this.controlsNum + config.curvesNum; ++i) {
      let control = new waveNoise();
      control.addWaves(config.wavesToBlend);
      this.controls.push(control);
    }
  }

  updateCurves() {
    let c = this.controls;
    let _controlX1 = c[0].getWave() * this.size.w*2;
    let _controlY1 = c[1].getWave() * this.size.h*2;
    let _controlX2 = c[2].getWave() * this.size.w/2;

    for (let i = 0; i < config.curvesNum; ++i) {
      const control = c[3 + i];
      if(!control) break;

      let _controlY2 = control.getWave();
      let curveParam = {
        startX: 0,
        startY: this.getYPlacementType(this.type4Start, i),
        controlX1: _controlX1,
        controlY1: _controlY1,
        controlX2: _controlX2,
        controlY2: _controlY2 * this.size.h,
        endX: this.size.w,
        endY: this.getYPlacementType(this.type4End, i),
      };
      this.drawCurve(curveParam);
    }
  }

  drawCurve({
    startX,
    startY,
    controlX1,
    controlY1,
    controlX2,
    controlY2,
    endX,
    endY,
  }) {
    this.ctx.strokeStyle = config.color;
    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.bezierCurveTo(
      controlX1,
      controlY1,
      controlX2,
      controlY2,
      endX,
      endY
    );
    this.ctx.stroke();
  }

  updateCanvas() {
    this.ctx.fillStyle = "rgb(22,22,25)";
    //this.ctx.fillRect(0, 0, this.size.w, this.size.h);
  }

  updateCanvasZERO(){
    this.ctx.fillRect(0, 0, this.size.w, this.size.h);
  }

  updateControls() {
    this.controls.forEach((e) => e.update());
  }

  getYPlacementType(type, i) {
    if (type > 0.6) {
      return (this.size.h / config.curvesNum) * i;
    } else {
      return 0;
    }
  }

  updateFrameCounter() {
    this.framesCounter = (this.framesCounter + 1) % config.framesToMove;
    if (this.framesCounter === 0) {
      this.type4Start = 0.9;
      this.type4End = 0.9;
    }
  }

  updateAnimation() {
    this.updateFrameCounter();
    this.updateControls();
    this.updateCanvas();
    this.updateCurves();
    window.requestAnimationFrame(() => this.updateAnimation());
  }
  
  onMessage(event, message) {
    console.log(message);
    if(message.includes("Plus")){
    config.curvesNum = config.curvesNum+1;
    console.log(config.curvesNum);
    } else if(message.includes("Clean")){
      window.requestAnimationFrame(() => this.updateCanvasZERO());
    }  else if(message.includes("Rouge")){
      config.color = "rgb(255,0,0)" ;
    } else if(message.includes("Jaune")){
      config.color = "rgb(255,239,0)" ;
    }else if(message.includes("Bleu")){
      config.color = "rgb(74,135,239)" ;
    }else if(message.includes("Vert")){
      config.color = "rgb(74,239,96)" ;
    }else if(message.includes("Minuswave")){
      config.wavesToBlend = 1;
      console.log(config.wavesToBlend);
    } else if(message.includes("Wave")){
      console.log(config.wavesToBlend);
      config.wavesToBlend = 10;
    }else if(message.includes("Moins")){
      config.curvesNum = config.curvesNum-1;
    }else if(message.includes("Violet")){
      config.color = "rgb(190,31,239)" ;
    }else if(message.includes("Noir")){
      config.color = "rgb(0,0,0)" ;
    }
    else if(message.includes("Orange")){
      config.color = "rgb(255,139,4)" ;
    }else if(message.includes("Blanc")){
      config.color = "rgb(255,255,255)" ;
    }
  }
}

window.onload = () => {
  new Animation().init();
};

