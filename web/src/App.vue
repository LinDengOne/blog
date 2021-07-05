<template>
  <div id="app">
    <page-loading v-if="loading"></page-loading>
    <router-view/>
  </div>
</template>
<script>
import pageLoading from './components/PageLoading.vue'
export default {
  components: {
    pageLoading
  },
  computed: {
    loading() {
      return  this.$store.state.loading
    }
  }
}
</script>
<style>
#app {
  font-family: eafont,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
  -webkit-tap-highlight-color: transparent;
}
.fade-leave-active {
  transition: all .6s ease-out;
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-active {
  transition: all .5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
</style>
