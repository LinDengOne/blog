<template>
  <div class="max">
    <div id="scene" class="img-outer">
        <div data-depth="0.4" class="layer">
            <img src="../../../assets/img/ac.png"
            class="moveImg" id="image"
            :width="imgWidth" :height="imgHeight"
            >
        </div>
    </div>
    <div class="header flex align-center space-between">
        <img src="" alt="">
    </div>
    <div class="misk"></div>
    <div class="info">
        <div class="time"></div>
    </div>

  </div>
</template>

<script>
import Parallax from 'parallax-js'
export default {
    name: 'screen',
    data() {
        return {
            imgWidth: null,
            imgHeight: null,
            hiddenText: false,
            date: {}
        }
    },
    created() {
        let wWidth = document.documentElement.clientWidth
        let wHeight = document.documentElement.clientHeight
        this.imgWidth = wWidth + 150
        this.imgHeight = wHeight + 150
    },
    mounted() {
        const scene = document.getElementById('scene');
		const parallaxInstance = new Parallax(scene, {
			relativeInput: true,
			clipRelativeInput: true,
    })
    },
}
</script>

<style lang="scss" scoped>
    #scene{
        position: relative;
        overflow: hidden;
        #image{
            position: absolute;
            margin-bottom: 20px;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);
            max-width: none;
            display: block;
        }
    }
    .max{
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
        z-index: 999;
        .img-outer{
            width: 100%;
            height: 100%;
        }
        .misk{
            //z-index: 1000;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
			width: 100%;
            background-color: rgba(176, 14, 37, 0.7);
            clip-path: polygon(0 0,25% 0,60% 100%,0 100%);
        }
        
    }
</style>