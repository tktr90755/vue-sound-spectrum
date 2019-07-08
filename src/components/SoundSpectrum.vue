<template>
  <div>
    <canvas :ref=this.id></canvas>
  </div>
</template>

<script>
import SoundSpectrum from '@/assets/js/libs/tk90755/sound/SoundSpectrum.js'
export default {
  data() {
    return {
      soundSpectrum: undefined,
      id:new Date().getTime().toString(16)  + Math.floor(1000000 * Math.random()).toString(16)
    }
  },
  props: {
    width: String,
    height: String,
    color: String,
    backgroundColor: String,
    alpha: String
  },
  mounted() {
    let canvas = this.$refs[this.id];
    canvas.width = this.width;
    canvas.height = this.height;
    this.soundSpectrum = new SoundSpectrum(canvas, canvas.width, canvas.height, this.color, this.backgroundColor, this.alpha);
  },
  methods: {
    onChange(audio){
      this.soundSpectrum.init(audio)
      this.soundSpectrum.start()
    }
  }
}
</script>