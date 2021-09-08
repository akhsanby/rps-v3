<template>
  <v-app>
    <vue-page-transition v-bind:name="this.random()" class="mx-auto my-auto">
      <router-view/>
    </vue-page-transition>
  </v-app>
</template>

<script>
  let root = document.querySelector(':root')
  root.style.setProperty('--overlay-bg', '#93d5ec')
  root.style.setProperty('--transition-duration', '.60s')

  export default {
    data() {
      return {
        overlay: [
          "overlay-down-full", 
          "overlay-left-full",  
          "overlay-right-full", 
          "overlay-up-full", 
        ]
      }
    },
    methods: {
      random() {
        return this.overlay[Math.floor(Math.random() * this.overlay.length)]
      },
    }
  }
</script>

<style>
  #app {
    background: url("./assets/bg.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>