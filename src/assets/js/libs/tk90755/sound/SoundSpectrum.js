 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.media.SvgPlayer.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
let svgPlayer = new SvgPlayer();
svgPlayer.speed = 1;
svgPlayer.dispatcher.addEventListener(Event.INIT, ()=>{
  console.log("Event.INIT")
  svgPlayer.play()
});
svgPlayer.dispatcher.addEventListener(Event.START, ()=>{
  console.log("Event.START")
});
svgPlayer.dispatcher.addEventListener(Event.RENDER, ()=>{
  console.log("Event.RENDER")
  this.$el.style.left = svgPlayer.point.x + "px";
  this.$el.style.top = svgPlayer.point.y + "px";
  this.$el.style.transform = 'rotate(' + svgPlayer.rotation + 'deg)';
});
svgPlayer.dispatcher.addEventListener(Event.COMPLETE, ()=>{
  console.log("Event.COMPLETE")
});
svgPlayer.load('test.svg', false)//第二引数をtrueにすると自動的にplay()する
*/
import EventDispatcher from '@/assets/js/libs/tk90755/events/EventDispatcher.js'
import Ticker from '@/assets/js/libs/tk90755/display/Ticker.js'
import MathUtil from '@/assets/js/libs/tk90755/utils/MathUtil.js'
export default class SoundSpectrum extends EventDispatcher {

  constructor(canvas, width, height, color, backgroundColor, alpha) {
    super();
    this._id = new Date().getTime().toString(16)  + Math.floor(1000000 * Math.random()).toString(16);

    this._canvas = (canvas !== undefined)?canvas:undefined;
    this._width = (width !== undefined)?width:100;
    this._height = (height !== undefined)?height:50;
    this._color = (color !== undefined)?color:'#000000';
    this._backgroundColor = (backgroundColor !== undefined)?backgroundColor:'#FFFFFF';
    this._alpha = (alpha !== undefined)?alpha:1;
    

    this._audio = undefined;
    this._context = undefined;
    this._src = undefined;
    this._analyser = undefined;
    this._bufferLength = undefined;
    this._dataArray = undefined;
    this._barWidth = 0;
    this._barHeight = 0;
    this._count = 0;
    this._ctx = undefined;
    
    let c = MathUtil.hexToRgb(this._color)
    let bgc = MathUtil.hexToRgb(this._backgroundColor)
    this.rgb = {
      r:c.r,
      g:c.g,
      b:c.b,
      bgr:bgc.r,
      bgg:bgc.g,
      bgb:bgc.b
    }
  }

  //__________________________________________________________________________________
  // methods
  init=(audio)=>{
    this._audio = audio;
    this._context = new AudioContext();
    this._src = this._context.createMediaElementSource(this._audio);
    this._analyser = this._context.createAnalyser();
    this._src.connect(this._analyser);
    this._analyser.connect(this._context.destination);
    this._bufferLength = this._analyser.frequencyBinCount;
    this._dataArray = new Uint8Array(this._bufferLength);
    this._barWidth = (this._width / this._bufferLength) * 2.5;
    this._ctx = this._canvas.getContext("2d");
  }

  getMax(l){
    let m = 0;
    for(let i in l){
      if(m <= l[i])m = l[i];
    }
    return m;
  }

  _render=()=>{
    if(this._analyser === undefined)return;
    // if(this._canvas === undefined)return;

    this._ctx.fillStyle = "rgb(" + this.rgb.bgr + "," + this.rgb.bgg + "," + this.rgb.bgb + "," + this.alpha + ")";
    this._ctx.fillRect(0, 0, this._width, this._height);

    this._analyser.getByteTimeDomainData(this._dataArray);
    let max = this.getMax(this._dataArray)
    this._count = 0;

    for (let i = 0; i < this._bufferLength; i++) {
      this._barHeight = this._dataArray[i];
      let normalizedHeight = this._barHeight / max;
      
      let value = 1 - normalizedHeight;
      let value2 = -((100 * value) + 1);
      this._ctx.fillStyle = "rgb(" + this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + "," + this.alpha + ")";
      this._ctx.fillRect(this._count, 100, 1, value2);
      this._count++;
    }
  }

  start(){
    Ticker.add(this._render, 'play_' + this._id, false)
  }

  stop(){
    Ticker.kill('play_' + this._id, false)
  }

  //__________________________________________________________________________________
  // getter
  get canvas(){
    return this._canvas;
  }

  set canvas(v){
    this._canvas = v;
  }
}
