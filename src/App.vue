<template>
  <div id="app">
    <SoundSpectrum />
  </div>
</template>

<script>
import SoundSpectrum from './components/SoundSpectrum.vue'

export default {
  name: 'app',
  components: {
    SoundSpectrum
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
