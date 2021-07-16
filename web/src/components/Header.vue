<template>
  <div class="out" :class="[changeClass]">
    <div class="header">
      <div class="left">
          <img @click="toIndex" src="../assets/img/logo.png" alt="">
          <div class="play">
              <i class="iconfont" @click="changeMusic"
            :class="isPlay ? 'icon-pause' : 'icon-play'"></i>
          </div>
          
      </div>
      <div class="mid" :class="musicIcon==='show' ? 'show' : 'hid'">{{midText}}</div>
      <div class="right">
        <div class="like-hit" v-if="showLike">
          <div class="iconfont icon-like " v-if="showLike" :class="{like: dataIsLike}" @click="onLike"></div>
        </div>
           <router-link :to="{name: 'Introducing'}">
                <img src="../assets/img/favicon.jpg" alt />
            </router-link>
      </div>
      <div class="like-hint-box" :class="{likeHint}" v-if="Ilike">
                <div class="like-hint">点了还想取消？</div>
                <span></span>
                <span></span>
            </div>
    </div>
    
      <div class="progressBar" :style="{width: progressBarWidth + '%'}"></div>
      <div
        class="music-btn"
        @click="changeMusic"
        :class="[musicIcon]"
      >
         <svg class="progress-circle" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
            <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" 
            :stroke-dasharray="dashArray" :stroke-dashoffset="dashOffset"/>
        
        </svg>
        <span class="iconfont" :class="isPlay ? 'icon-pause' : 'icon-play'"></span>
      </div>
      <audio loop id="music" :src="music"> </audio>
  </div>
</template>

<script>
import scrollMixin from '../mixin/scroll.js'
export default {
    mixins: [scrollMixin],
    props: {
        music: {
            type: String,
            default:'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/xingzhisuozai.mp3'
        },
        isLike: {
            type: Boolean,
            default:false
        },
        Ilike: {
            type: String,
        },
        midText: {
            type: String,
            default:'文章列表'
        },
        sticky: {               // 吸顶动画
            type: Boolean,
            default: false
        },
        showLike: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isPlay: false,
            startListen: false,
            dashArray: Math.PI * 100,
            progressBarWidth: 0,
            musicIcon: "",
            audioDom: '', 
            mid: '',
            timer: '',
            changeClass:'show',
            likeHint: false,
            dataIsLike: false
        }
    },
    computed: {
        dashOffset() {
            return (1 - this.progressBarWidth / 100) * this.dashArray;
        },
    },
    mounted () {
        this.initMusic() // 加载音乐
        this.dataIsLike = this.isLike
        this.$watch('scroll_current', this.scrollStatus, { immediate: true })
            
    },
    created () {
        this.listenScroll() // 是为了防止有些界面是不缓存的情况
        this.mid = this.midText
    },
    methods: {
        scrollStatus(oldVal, val) {
            //console.log(val)
            if (val >= 100) {
                if (this.scroll_direction === 'top') {
                    this.changeClass = 'show'
                } else if (this.changeClass == 'show') {
                    this.changeClass = 'exit'
                }
            } else {
                this.changeClass = 'show'
            }
        },
        //b播放
        changeMusic() {
            this.listenPlay()
            this.startListen = true
            !this.isPlay ? this.audioDom.play() :this.audioDom.pause()
            this.isPlay = !this.isPlay
        },
        //初始化音乐
        initMusic () {
            this.audioDom = document.getElementById('music')
            this.audioDom.load()
        },
        //第一次播放监听
        listenPlay () {
            if(this.startListen) return
            this.audioDom.ontimeupdate = () => {
                const currentTime = ( this.audioDom.currentTime / 
                this.audioDom.duration * 100 ).toFixed(0)
                this.progressBarWidth  = currentTime
            }
        },
        onLike(){
            if (this.dataIsLike) {
                clearTimeout(this.likeTime)
                this.likeHint = true
                this.likeTime = setTimeout(() => this.likeHint = false, 2000)
            } else {
                //console.log(this.like);
                this.$http.put(`article_like/${this.Ilike}`).then(res => {
                    this.dataIsLike = true
                    this.$emit('liked', true)
                    localStorage.setItem(`like-${this.Ilike}`, true)
                })
            }
        },
        toIndex () {
            this.$router.push({path: '/'})
        },
          // 监听页面滚动
        listenScroll () {
        if (this.timer) return
        this.timer = setTimeout(() => {
            document.body.onscroll = this.$throttle(this.scrollHandle, 200)
        }, 200);
        },
        scrollHandle () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset 
        scrollTop >= 60 ? this.musicIcon = 'show' : this.musicIcon = 'exit'
        }
  

    },
}
</script>

<style lang="scss" scoped>
.out{
    width: 100%;
    position: fixed;
    height: 50px;
    z-index: 999;
    background-color: #fff;
    
.header{
    height: 50px;
    width: 100%;
    color: #666;
    background-color: #fff .9;
    border-bottom: 1px solid #f6f7f8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    z-index:9999;
    transition:all .3s;
    .left{
        display: flex;
        img{
            //margin-top: 1px;
            width: 30px;
            height: auto;
            //opacity: .8;
            color: red;
            cursor: pointer;
            transition: all .3s;
            &:hover {
                transform: scale(1.5);
            }

        }
        .play{
            margin-left: 20px;
            cursor: pointer;
            margin-top: 4px;
            position: relative;
            &:hover{
                i{
                   color: #303033; 
                }
            }
            .i{ 
                color: #888;
                transition: all .3s;
            }
        
        }
    }
    .mid{
        font-weight: 600;
        transition: all .4s ease-in;
    }
    .mid.hid{
        opacity: 0;
    }
    .right{
        display: flex;
        .like-hit{
            height: 100%;
        
            .iconfont{
                
                display: inline-block;
                font-size: 26px;
                margin: 0 16px;
                cursor: pointer;
                transition: all .3s;
                &.like{
                    color: #ef6d57;
                }
                &.icon-like:hover{
                    color:#ef6d57;
                }
            }
        }
        
        img{

            width: 30px;
            height: 30px;
            border-radius: 50%;
        }
    }
    .like-hint-box{
        position: absolute;
        top: 60px;
        right: 75px;
        transition: all .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        transform-origin: right top;
        transform: scale(0);
        opacity: 0;
        visibility: hidden;
        .like-hint{
            position: absolute;
            top: 30px;
            right: 40px;
            background: #ef6c57;
            color: var(--color-bg-primary);
            font-size: 13px;
            width: 210px;
            height: 110px;
            line-height: 114px;
            text-align: center;
            border-radius: 220px / 120px;
        }
        span{
            position: absolute;
            top: 13px;
            right: 13px;
            height: 28px;
            width: 28px;
            border-radius: 50%;
            background: #ef6b57;  
            &:last-child{
                width: 14px;
                height: 14px;
                right: 0;
                top: 0;
            }
        }
        &.likeHint{
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }
    }
    
}

    .progressBar{
        position: fixed;
        top: 0;
        left: 0;
        width: 550px;
        height: 50px;
        background-color: rgb(170, 170, 170);
    }
    .music-btn{
        position: fixed;
        right: 30px;
        bottom: 30px;
        width: 36px;
        height: 36px;
        padding: 3px;
        color: #fff;
        opacity: 0.8;
        cursor: pointer;
        z-index: 999999;
        border-radius: 50%;
        background-color: rgba($color: #000000, $alpha: .6);
        display: none;
        .progress-circle{
            height: 30px;
            width: 30px;
            circle{
                stroke-width: 10px;
                transform-origin: center;
                &.progress-background {
                    transform: scale(0.9);
                    stroke: #fff;
                }
                &.progress-bar{
                    transform: scale(0.9) rotate(-90deg);
                    stroke: #50bcb6;
                }
            }
        }
        .iconfont{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: inline-block;
            padding: 1px 0 0 3px;
            font-size: 14px;
            &.icon-pause{
                padding-left: 1px;
            }
        }
    }
}
@media screen and (max-width: 600px) {

  .out {
    position: absolute;
    &.show{
        position: fixed;
        animation: headShow 0.6s both;
        box-shadow: 0 1px 8px var(--color-shadw-1);
        background: #fff;
    }
    &.exit{
        position: fixed;
        animation: headExit 0.6s both;
        box-shadow: 0 1px 8px var(--color-shadw-1);
        background: var(--color-bg-opacity);
    }
  }
  .header {
    position: absolute;
  }
  .mid {
    font-size: 14px;
  }
  .music-btn {
    opacity: 0;
    // display: none;
    &.show {
      display: block;
      visibility: visible;
      animation: fadeInTop 0.6s both;
    }
    &.exit {
      display: block;
      opacity: 0;
      animation: fadeInDown 0.6s both;
    }
  }
}
@keyframes headShow {
    from {
        opacity: 0;
        top: -50px;
    }
    to {
       top: 0;
       opacity: 1; 
    }
}
@keyframes headExit {
    from {
       top: 0;
       opacity: 1; 
    }
    to {
        opacity: 0;
        top: -50px;
    }
}
@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 1;
    transform: translate(0, 0px);
  }
  to {
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 30px);
  }
}
</style>