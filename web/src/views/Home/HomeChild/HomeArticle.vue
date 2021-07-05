<template>
  <div class="outer">
      <div class="content">
          <div class="post"
                v-for="(item, index) in requestDatas"
                :key="index"
          >
              <div class="img-box" >
                  <img  
                        src="../../../assets/img/other/default.jpg"
                         alt=""
                         >
              </div>
              <div class="info">
                  <div class="time">{{ item.time.date }}</div>
                  <div class="title">
                      <a href="">{{ item.title }}</a>
                  </div>
                  <div class="describe">{{ item.describe }}</div>
                  <div class="stuff">
                      <div v-for="(v, i) in infoIcon" :key="i">
                          <i class="iconfont" :class="v.icon"></i><span>{{ item[v.name] }}</span>
                          <span class="hint" :style="{ backgroundColor: v.color }">{{ v.text }}<i :style="{ borderTopColor: v.color }"></i></span>
                      </div>
                  </div>
              </div>
          </div>
          <div class="more" @click="getArticleList">
              <load-more :status="status" />
          </div>
      </div>
  </div>
</template>

<script>
import LoadMore from '../../../components/LoadMore.vue'
export default {
  components: { LoadMore },
    name: 'homearticle',
    data() {
        return {
            page: 1,
            status: 'more',
            infoIcon: [{
				icon: 'icon-text',
				name: 'words',
				text: '自由',
				color: '#EF6D57'
			}, {
				icon: 'icon-eye',
				name: 'read',
				text: '平等',
				color: '#50bcb6'
			}, {
				icon: 'icon-like',
				name: 'like',
				text: '公正',
				color: '#ffa800'
			}],
            requestDatas: []
        }
    },
    computed:{

    },
    created() {
        this.getArticleList ()
    },
    methods: {
    
        async getArticleList () {
            //this.$store.commit('setStatus', 'loading')
            this.status = 'loading'
            const page = this.page
            const result = await this.$http.get('/article', {
              params: { page }
                })
            const total = result.data.body.totalPage
            const data = result.data.body.data
            //console.log(result);
            if(this.page > total){
           // this.$store.commit('setStatus', 'nomore')
           this.status = 'nomore'
            } else {
            this.requestDatas.push(...data)
            this.status = 'more'
           // this.$store.commit('setStatus', 'more')
            this.page++
            }
        },
        loadMoreData(){

        }
    },
}
</script>

<style lang="scss" scoped>
.outer{
    .content{
        width: 1200px;
        margin: auto;
        position: relative;
        padding-bottom: 80px;
        text-align: center;
        &::after{
            content: '';
            width: 1px;
            height: calc(100% + 100px);
            position: absolute;
            top: -100px;
            left: 50%;
            background: var(--color-border-1);
            z-index: -1;
        }
        .more{
            margin-top: 90px;
            display: inline-block;
        }
        ::v-deep .bottom-loading{

        }
        .post{
            position: relative;
            margin-top: 100px;
            z-index: 1;
            .img-box{
                width: 680px;
                height: 440px;
                font-size: 0;
                display: inline-block;
                position: relative;
                z-index: 3;
                overflow: hidden;
                cursor: pointer;
                border-radius: 6px;
                border: 1px solid var(--color-border-2);
                img{
                    width: 100%;
                    height: 100%;
                }
                &:hover img{
                    opacity: 0.9;
                }
            }
            .info{
                width: 500px;
                height: 400px;
                position: absolute;
                top: 20px;
                padding: 80px 100px 0 80px;
                border: 1px solid var(--color-border-1);
                border-radius: 6px;
                .time{
                    color: #999;
					font-size: 12px;
                }
                .title{
                    margin-top: 8px;
                    word-break: break-all;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
					transition: none;
                    a{
                        font-size: 24px;
                        line-height: 30px;
                        display: inline-block;
                        cursor: pointer;
                        text-decoration: none;
                        color: var(--color-text-1);
                        transition: backgroundPosition 0s, color .3s;
                        &:hover{
                            transform:translateY(-3px);
                            background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
							radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
							background-size: 20px 20px;
							background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
							animation: waveFlow 1s infinite linear;
                        }
                        @keyframes waveFlow {
                            from { background-position-x: -10px, 0; }
                            to { background-position-x: -30px, -20px; }
                            
                        }

                    }

                }
                .describe{
                    color: var(--color-text-2);
                    font-size: 14px;
                    line-height: 22px;
                    margin-top: 10px;
                    word-break: break-all;
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden; 

                }
                .stuff{
                    font-size: 12px;
                    color: #999;
                    position: absolute;
                    bottom: 80px;
                    left: 80px;
                    display: flex;
                    div{
                        padding: 6px;
                        font-size: 6px;
                        display: flex;
                        align-items: center;
                        position: relative;
                        text-align: none;
                        &:nth-of-type(1):hover{
                            color:#ef6d57;
                        }
                        &:nth-of-type(2):hover{
                            color:#50bcb6;
                        }
                        &:nth-of-type(3):hover{
                            color:#ffa800;
                        }
                        .iconfont{
                            margin-right: 4px;
                            margin-top: -4px;
                            display: inline-block;
                            transition: none;
                            &.icon-like{
                                font-size: 14px;
                                margin-top: -1px;
                            }
                            &.icon-text{
                                font-size: 17px;
                                margin-top: -2px;
                            }
                        }
                         .hint{
                        position: absolute;
                        bottom: 100%;
                        left: 50%;
                        transform: translate(-50%,-5px);
                        color: #fff;
                        font-size: 12px;
                        border-radius: 10px;
                        padding: 5px 14px;
                        white-space: nowrap;
                        opacity: 0;
                        visibility: hidden;
                        i{
                            border: 5px solid transparent;
                            position: absolute;
                            left: 50%;
                            //color: black;
                            bottom: -10px;
                            transform: translateX(-50%);
                        }
                    }
                    &:hover .hint{
                        opacity: 1;
                        visibility: visible;
                    }
                 }
              }
            }
            &:nth-child(odd){
                text-align: left;
                .info{
                    left: 660px;
                }
            }
            &:nth-child(even){
                text-align: right;
                .info{
                    text-align: left;
                    right: 660px;
                }
            }
        }
    }
    @media screen and (max-width: 1200px){
        .content{
            width: 900px;
            .post{
                .img-box{
                    width:480px;
                    height: 310px;
                }
                .info{
                    top: 10px;
                    width: 420px;
                    height: 290px;
                    padding: 50px 60px 0 60px;
                    .stuff{
                        bottom: 50px;
                        left: 60px;
                    }
                    .title{
                        margin-top: 10px;
                        line-height: 25px;
                    }
                }
                &:nth-child(odd) .info{
					left: 450px;
				}
				&:nth-child(even) .info{
					right: 450px;
				}
            }
        }
    }
}

</style>
