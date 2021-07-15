<template>
    <div class="rain">
        <div class="logo-img" @click="toIndex">
            <img src="../assets/img/logo.png" alt="">
        </div>

        <img class="rain-bg" src="../assets/img/rain/rain-bg.gif" draggable="false">
        <img class="words" src="../assets/img/rain/words.png" draggable="false">
        <ul class="option">
            <li v-for="(item, index) in rainIcon" :key="index">
                <span @click="music(index, item.active)">
                    <img :src="item.on" draggable="false" v-if="item.active" />
                    <img :src="item.off" draggable="false" v-else />
                </span>
                <audio class="music" loop="loop" preload="auto">
                    <source type="audio/mpeg" :src="item.music">
                </audio>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            audioDom: [],
            show: true,
            rainIcon: [
                {
                    on: require('../assets/img/rain/rain_on.png'),
                    off: require('../assets/img/rain/rain_off.png'),
                    music: require('../assets/img/rain/thunder.mp3'),
                    active: false
                },
                {
                    on: require('../assets/img/rain/rain2_on.png'),
                    off: require('../assets/img/rain/rain2_off.png'),
                    music: require('../assets/img/rain/loudThunder.mp3'),
                    active: false
                },
                {
                    on: require('../assets/img/rain/rain3_on.png'),
                    off: require('../assets/img/rain/rain3_off.png'),
                    music: require('../assets/img/rain/rain.mp3'),
                    active: false
                },
                {
                    on: require('../assets/img/rain//rain4_on.png'),
                    off: require('../assets/img/rain/rain4_off.png'),
                    music: require('../assets/img/rain/bgm.mp3'),
                    active: false
                },
            ],
            
        }
    },
    mounted(){
      this.audioDom = document.getElementsByClassName("music");
      this.userToast()
      document.documentElement.addEventListener('click', this.oncePlay)
    },
    destroyed() {
        document.documentElement.removeEventListener('click', this.oncePlay)
        this.rainIcon.forEach(item => this.$set(item, 'active', false))
    },
    methods: {
        toIndex(){
            this.$router.push('/')
        },
         music(type, active){
            this.$set(this.rainIcon[type], 'active', !active)
            !active ? this.audioDom[type].play() : this.audioDom[type].pause()
        },
        // 让用户自动触发播放，不然浏览器会报错
        oncePlay () {
          this.music(0, false)
          document.documentElement.removeEventListener('click', this.oncePlay)
        },
        userToast () {
          const h = this.$createElement;
          this.$notify({
            title: '提示',
            message: h('span', { style: 'color: #008c8c'}, '请点击一次页面开始聆听雨声哦！也可以在右下角关闭或者打开其他声音。右上角logo可以回到首页')
          });
        }
    },
}
</script>

<style lang="scss" scoped>
.rain{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .logo-img{
        color: #fff;
        position: fixed;
        top: 20px;
        left: 30px;
        width: 80px;
        cursor: pointer;
        img{
            width: 100%;
        }
    }
    .rain-bg{
        width: 100vw;
        height: 100vh;
    }
    .words{
        position: fixed;
        top: 80px;
        right: 80px;
    }
    .option{
        width: auto;
        height: 70px;
        position: fixed;
        bottom: 0;
        right: 0;
        text-align: center;
        li{
            display: inline-block;
            list-style-type: none;
            cursor: pointer;
            span{
                display: inline-block;
                vertical-align: middle;
            }
            &:last-child {
                width: 108px;
                height: 73px;
                line-height: 73px;
                img { 
                    height: 30px;
                    vertical-align: middle;
                }
            }
        }
    }
}
@media screen and (max-width: 480px){
    .rain {
        .logo-img{
            color: #fff;
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 9999;
            cursor: pointer;
            width: 88px;
            height: 55px;
            img{
                width: 100%;
            }
        }
    }
    .rain{
        .words{
            top: 30%;
            left: 50%;
            right: auto;
            transform: translate(-50%, -50% );
        }
        .rain-bg {
            position: absolute;
            left: 60%;
            top: 50%;
            transform: translate(-50%,-50%);
            height: 100%;
            width: auto;
        }
        .option{
            width: auto;
            right: 20px;
            li{
                width: 60px !important;
                overflow: hidden;
                span{
                    display: flex;
                    justify-content: center;
                } 
                &:last-child span{
                        display: inline-block !important;
                    }
            }
        }
        .logo{
            left: 20px;
        }
    }
}
</style>