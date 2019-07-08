# vue-sound-spectrum
サウンドスペクトラムとその使用例を実装した。

[DEMO](https://tktr90755.github.io/vue-sound-spectrum/) 

## Usage
```js
import SoundSpectrum from '@/assets/js/libs/tk90755/sound/SoundSpectrum.js'
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
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
