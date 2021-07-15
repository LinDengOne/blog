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
    <div class="header">
        <img src="" alt="">
    </div>
    <div class="misk"></div>
    <div class="info">
        <div class="time">{{date.month}}  {{date.day}}, {{date.year}}</div>
		<div class="title">欢迎光临！！
        <transition name="el-fade-in-linear">
          <span v-show="!hiddenText" class="tipsText">请向下滚动</span>
        </transition>
		</div>
		<div class="content">眼里有光，心中有爱，一路春暖花开，看淡得失，珍惜拥有，不负时光，不负自己，所有美好，都将如期而至</div>
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
		if (wWidth <= 600) { this.imgWidth = 1920 / 1.3; this.imgHeight = 960}
    	this.getdate()
    },
    mounted() {
        const scene = document.getElementById('scene');
		const parallaxInstance = new Parallax(scene, {
			relativeInput: true,
			clipRelativeInput: true,
    })
    },
	methods: {
		getdate() {
			const date = new Date()
			const year = date.getFullYear()
			const month = date.getMonth() + 1
			const day = date.getDate()
			const result = `${year}-${month}-${day} ${123}`
			this.date = this.dateHandle(result)
		},
		dateHandle(result) {
			const arr = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			let [y, m, other] = result.split("-")
			// console.log(y,m,other);
			const d = other.split(" ")[0]
			m = arr[parseInt(m)]
			const resultDate = [y, m, d]
			console.log(resultDate);
			const keys = ['year', 'month', 'day']
			const res = {}
			resultDate.forEach((item, index) => res[keys[index]] = resultDate[index])
			return res
		}
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
		.info {
			position: absolute;
			top: 54%;
			left: 10%;
			color: #fff;
			width: 30%;
			transform: translateY(-50%);
			color: #ffffff;
			font-size: .5rem;
			.time {
			font-size: 14px;
			}
			.title {
			font-size: 1rem;
			margin: 15px 0 30px;
			}
			.content {
			font-size: 15px;
			}
		}
        
    }
    @media screen and (max-width: 900px){
		.max{
			.misk{
				clip-path: polygon(0 0, 220px 0, 700px 100%, 0% 100%);
			}
			.info{
				width: 40%;
				.title a{
					font-size: 22px;
				}
			}
		}
	}
	@media screen and (max-width: 780px){
		.max{
			.header{
				top: 40px;
			}
			.misk{
				clip-path: none;
			}
			.info{
				bottom: 8%;
				left: 5%;
				top: auto;
				width: 70%;
				transform: none;
			}
			
		}
	}

</style>