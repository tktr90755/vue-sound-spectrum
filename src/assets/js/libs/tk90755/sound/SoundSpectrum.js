 /**
 * Copyright 2014, "tktr90755" All rights reserved.
 * Proprietary and Confidential
 * Do not redistribute
 * 
 * @title tktr90755.sound.SoundSpectrum.js
 * @author 
 * @version 0.1.0 
 * @update 
 * 
 */
//__________________________________________________________________________________
// How to use
/*
let canvas = document.getElementById("canvas");
canvas.width = this.width;
canvas.height = this.height;

let file = document.getElementById("thefile");
let files = [];
let audio = document.getElementById("audio");
audio.loop = true;
let soundSpectrum = new SoundSpectrum(canvas, canvas.width, canvas.height);

file.onchange = function() {
  files = this.files;
  audio.src = URL.createObjectURL(files[0]);
  audio.load();
  audio.play();
  soundSpectrum.init(audio)
  soundSpectrum.start()
}
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
    this.wm = new WeakMap();
    
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

  init(audio){
    this._audio = audio;
    this._context = new AudioContext();
    // this._src = this._context.createMediaElementSource(this._audio);
    if (this.wm.has(this._audio)) { 
      this._src = this.wm.get(this._audio); 
    } else { 
      this._src = this._context.createMediaElementSource(this._audio); 
      this.wm.set(this._audio, this._src); 
    }     
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
    if(this._analyser === undefined || this._canvas === undefined)return;

    this._ctx.fillStyle = "rgb(" + this.rgb.bgr + "," + this.rgb.bgg + "," + this.rgb.bgb + "," + this._alpha + ")";
    this._ctx.fillRect(0, 0, this._width, this._height);

    this._analyser.getByteTimeDomainData(this._dataArray);
    let max = this.getMax(this._dataArray)
    this._count = 0;

    for (let i = 0; i < this._bufferLength; i++) {
      this._barHeight = this._dataArray[i];
      let normalizedHeight = this._barHeight / max;
      
      let value = 1 - normalizedHeight;
      let value2 = -((this._height * value) + 1);
      this._ctx.fillStyle = "rgb(" + this.rgb.r + "," + this.rgb.g + "," + this.rgb.b + "," + this._alpha + ")";
      this._ctx.fillRect(this._count, this._height, 1, value2);
      this._count++;
    }
  }

  start(){
    if(Ticker.hasItem('play_' + this._id) === false){
      Ticker.add(this._render, 'play_' + this._id, false)
    }
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
