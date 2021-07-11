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
    @media screen and (max-width: 900px){
		.max{
			.misk{
				clip-path: polygon(0 0, 220px 0, 700px 100%, 0% 100%);
			}
			.post{
				width: 40%;
				.title a{
					font-size: 22px;
				}
			}
		}
		.content{
			width: 100%;
			.post{
				margin-top: 60px;
				background: var(--color-bg-primary);
				border-bottom: 1px solid var(--color-border-1);
				.img-box{
					width: 100%;
					height: auto;
					display: block;
					text-align: center;
					border: none;
					img{
						width: 680px;
						max-width: 100%;
					}
				}
				.info{
					position: static;
					width: 96%;
					padding: 40px 20px 40px;
					margin: auto;
					border: none;
					background: var(--color-bg-primary);
					height: auto;
					.stuff{
						position: static;
						margin: 20px 0 0 -6px;
					}
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
			.post{
				bottom: 8%;
				left: 5%;
				top: auto;
				width: 70%;
				transform: none;
			}
			
		}
		.content{
			width: 100%;
			.post{
				.img-box{
					width: 100%;
					height: auto;
					border-radius: 0;
				}
			}
		}
	}
	@media screen and (max-width: 480px){
		.max{
			.header{
				padding: 0 24px 0 20px;
				.logo-img{
					width: 80px;
					img{
						top: 6px
					}
				}
			}
			.post {
				.time{
					display: none;
				}
				.title{
					margin-bottom: 10px;
				}
				.describe{
					font-size: 13px;
					line-height: 20px;
				}
			}
		}
	}
</style>