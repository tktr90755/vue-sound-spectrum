<template>
  <div id="app">
    <SoundSpectrum ref="ss" width='500' height='100' color='#FF0000' backgroundColor='#000000' alpha='1'/>
    <input type="file" ref="thefile" accept="audio/*" />
    <audio ref="audio" controls></audio>
  </div>
</template>

<script>
import SoundSpectrum from './components/SoundSpectrum.vue'

export default {
  name: 'app',
  components: {
    SoundSpectrum
  },
  mounted() {
    let file = this.$refs["thefile"];
    let files = [];
    let audio = this.$refs["audio"];
    audio.loop = true;
    
    file.onchange =(e)=> {
      files = e.currentTarget.files;
      audio.src = URL.createObjectURL(files[0]);
      audio.load();
      audio.play();
      this.$refs['ss'].onChange(audio)
    }
  }
}
</script>