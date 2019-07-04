<template>
  <div class="hello">
    <input type="file" id="thefile" accept="audio/*" />
    <canvas id="canvas"></canvas>
    <audio id="audio" controls></audio>
  </div>
</template>

<script>
import SoundSpectrum from '@/assets/js/libs/tk90755/sound/SoundSpectrum.js'
import Ticker from '@/assets/js/libs/tk90755/display/Ticker.js'
export default {
  name: 'SoundSpectrum',
  mounted() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
		
		var _number= 200;

    var file = document.getElementById("thefile");
    var audio = document.getElementById("audio");
    var files;
    var context;
    var src;
    var analyser;
    var bufferLength;
    var dataArray;
    var barWidth;
    var barHeight;
    var x = 0;
    file.onchange = function() {
      files = this.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      context = new AudioContext();
      src = context.createMediaElementSource(audio);
      analyser = context.createAnalyser();

      src.connect(analyser);
      analyser.connect(context.destination);
      analyser.fftSize = 256;
      bufferLength = analyser.frequencyBinCount;

      dataArray = new Uint8Array(bufferLength);
      barWidth = (WIDTH / bufferLength) * 2.5;
      x = 0;
    }

		let onStart =()=>
		{
      
      if(analyser === undefined)return;

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      var count = 256 / _number;

      analyser.getByteTimeDomainData(dataArray);
      let max = getMax(dataArray)
      x = 0;
      
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        let normalizedHeight = barHeight / max;
        let value = 1 - normalizedHeight;
        let value2 = -((100*value)+1);
        var r = 255;
        var g = 255;
        var b = 255;
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, 100, 1, value2);
        x++;
      }
    }
    let getMax=(l)=>{
      let m = 0;
      for(let i in l){
        if(m <= l[i])m = l[i];
      }
      return m;
    }
    Ticker.add(onStart, 'play_', false)
  }
}
</script>

<style scoped>
#thefile {
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 100;
}

#canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

audio {
  position: fixed;
  left: 10px;
  bottom: 10px;
  width: calc(100% - 20px);
}
</style>
