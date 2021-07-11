<template>
  <div class="article">
      <div class="scrollbar"  :style="{ width: postProgress }"></div>
        <Header/>
        <div class="wraper"  ref="content" v-if="data.time">
            <h1 class="title">{{data.title}}</h1>
            <div class="stuff">
                <span>{{ data.time.month.cn }}月 {{ data.time.day.on }}, {{ data.time.year }}</span>
                <span>阅读 {{ data.read }}</span>
                <span>字数 {{ data.words }}</span>
                <!-- <span>评论 {{ commentTotal }}</span> -->
                <span>喜欢 {{ data.like }}</span>
                <span></span>
            </div>    
            <div class="content html javascript" v-html="data.contentHtml"></div>
      </div>
        <comment-input :id="data._id" :title="data.title" @SourceClick="passParam"/>
        <comment-box :commentTotal="commentTotal" :commentData="commentData"></comment-box>
  </div>
</template>

<script>
//import "highlight.js/styles/monokai-sublime.css";
import commentInput from './ArticleChild/commentInput.vue'
import scrollMixin from '../../mixin/scroll'
import CommentBox from './ArticleChild/commentBox.vue'
import Header from '../../components/Header.vue'
export default {
    mixins: [scrollMixin],
    components:{commentInput, CommentBox,Header},
    data() {
        return {
           data: {},
           commentData:{},
           commentTotal: 0,
           contentHeight: 0,
           clientHeight: 0, 
        }
    },
    computed: {
        postProgress() {
            if (this.contentHeight < this.clientHeight) {
                return '100%'
            }
            if (!this.scroll_current) {
                return
            }
            const h = this.contentHeight - this.clientHeight + 100
            const n = (100 * (this.scroll_current / h)).toFixed(2)
            //console.log(n);
            return n < 100 ? n + '%' : '100%'
        }
    },
    async created() {
        await this.getComment(this.$route.params.id)
        //console.log(this.$route.params.id);
        await this.getArticle(this.$route.params.id)
    },
    mounted() {
        setTimeout(() => {
            this.clientHeight = this.getWin('clientHeight')
            this.contentHeight = this.getHeight()
        },1000)
            //this.isLike = !!localStorage.getItem(`like-${this.data._id}`)
            //console.log(this.clientHeight);
    },
    methods: {
        async getArticle(id) {
           const res = await this.$http.get('/article/'+id)
           this.data = res.data.body
           //console.log(this.data);
        },
        async getComment(id) {
            const res = await this.$http.get('/comment/'+id)
            //console.log(res);
            this.commentData = res.data.body.data
            this.commentTotal = res.data.body.total
            //console.log(this.data);
            },
        passParam() {
            this.getComment(this.$route.params.id)
        },
        getHeight() {
            /* const domList = ['.content', '.stuff', '.title']
            console.log(domList); */
            /* const height = domList.reduce((t, i) => {
                t += document.querySelector(i).offsetHeight
                //console.log(t);
                return t
            }, 0) */
            
            const height = this.$refs.content.offsetHeight
            return height
        },
    },
}
</script>

<style lang="scss" scoped>
.article{
    position: absolute;
    //overflow-x: scroll;
    width: 100%;
    .wraper{
        width: 800px;
        margin: auto;
        // background-color: aqua;
        transition: none;
        h1.title{
        font-size: 30px;
        padding: 130px 0 22px;
        color: var(--color-text-1);
    }
    .stuff{
        color: var(--color-text-2);
        position: relative;
        line-height: 22px;
        span{
            font-size: 13px;
            margin-right: 10px;
            display: inline-block;
        }
        &::after{
            content: '';
            width: 100px;
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            border-bottom: 1px solid var(--color-border-1);
        }
    }
    .content{
        padding: 100px 0;
        font-size: 14px;
        word-break:break-all;
        width:100%;
        color: var(--color-text-1);
        //height: 1000px;
        ::v-deep{
            p{
            // background-color: antiquewhite;
                line-height: 36px;
                margin: 0 0 22px;
                font-size: 16px;
                width: 100%;
                mark{
                    padding: 4px 4px 0;
                    line-height: 22px;
                    display: inline-block;
                    font-size: 16px;
                }
                strong{
                    font-weight: bold;
                    font-size: 16px;
                }
                ins{
                    font-size: 16px;
                }
            }
            pre{
                width: 100%;
                overflow-x: scroll;
                z-index: -1;

            }
            code{
                border: 0;
                padding: 0;
                margin: 0 0 22px;
                line-height: 28px;
                font-size: revert;
                z-index: -1;
            }
            h1, h2, h3, h4, h5{
                border: 0;
                padding: 0;
                margin: 0 0 22px;
                line-height: 28px;
                font-size: revert;
            }
            img{
                max-width: 100%;
                border-radius: 4px;
                &:hover{
                    box-shadow: 0 0 10px #999;
                }
            }
            blockquote{
                border-radius: 10px;
                padding-left: 22px;
                margin-bottom: 20px;
                padding: 0 1em;
                color: var(--color-text-6);
                border-left: .25em solid #dfe2e5;      
                overflow: hidden;          
                p{
                    margin: 10px 0;
                }
            }
            ul, ol{
                margin: 0 0 20px;
                li{
                    margin: 10px 0;
                    line-height: 28px;
                }
            }
            li{
                list-style: none;
                position: relative;
                // background: #50bcb6;
                &:after{
                    content: '☼';
                    font-size: 8px;
                    position: absolute;
                    top: 0px;
                    left: -16px;
                }
            }
            iframe{
                width: 100%;
                height: 450px;
                margin-bottom: 20px;
            }
        }
        
    }
    }
    .scrollbar{
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--color-bar);
        transition: width 1s ease;
        z-index: 999999;
    }
    
    .back-top{
        position: fixed;
        bottom: 20px;
        right: 20px;
        height: 20px;
        line-height: 20px;
        background: #50bcb6;
        font-size: 13px;
        z-index: 9999;
        padding: 0 5px;
        color: var(--color-bg-primary);
    }
    footer{
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background: var(--color-bg-opacity);
        box-shadow: 0 -2px 12px var(--color-shadw-1);
        transition: all 0.6s;
        transform: translateY(100%);
        &.show{
            transform: translateY(0);
        }
        .foot-box{
            width: 800px;
            height: 70px;
            margin: auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        h2{
            font-size: 16px;
            color: var(--color-text-2);
        }
        .options{
            display: flex;
            li{
                position: relative;
                list-style: none;
                margin-left: 6px;
                min-width: 32px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                &:not(:first-child){
                    cursor: pointer;
                    &:hover{
                        span, span.icon-top{
                            font-weight: 600;
                        }
                    }
                    &.active span{
                        color: var(--color-pink)
                    }
                }
                span:last-child{
                    font-size: 12px;
                    color: var(--color-text-1);
                    transform: translate(-4px, -14px);
                    display: inline-block;
                    &.skin{
                        display: none;
                    }
                }
                .iconfont{
                    color: var(--color-text-1);
                    font-size: 20px;
                    &.icon-top{
                        font-size: 28px;
                        color: var(--color-text-2);
                    }
                    &.icon-taiyang{
                        font-size: 22px;
                    }
                }
                & *, & *::before{
                    transition: none;
                }
                .like-hint-box{
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    transition: all .4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                    transform-origin: right bottom;
                    transform: scale(0);
                    opacity: 0;
                    visibility: hidden;
                    & *{
                        transition: all .3s;
                    }
                    .like-hint{
                        position: absolute;
                        top: -180px;
                        right: 54px;
                        background: #ef6c57;
                        color: #fff;
                        font-size: 13px;
                        width: 210px;
                        height: 110px;
                        line-height: 114px;
                        text-align: center;
                        border-radius: 220px / 120px;
                    }
                    span{
                        position: absolute;
                        top: -78px;
                        right: 28px;
                        height: 28px;
                        width: 28px;
                        border-radius: 50%;
                        background: #ef6b57;  
                        &:last-child{
                            width: 14px;
                            height: 14px;
                            right: 12px;
                            top: -34px;
                        }
                    }
                    &.likeHint{
                        opacity: 1;
                        visibility: visible;
                        transform: scale(1);
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 820px) {
    .article{
        .wraper{
            width: 86%;
        }
        h1.title{
            font-size: 20px;
            padding: 90px 0 15px;
        }
        .content{
            padding: 60px 0;
            ::v-deep {
                p{
                    line-height: 28px;
                }
                iframe{
                    height: 390px;
                }
            }
        }
        footer{
            width: 86%;
            left: 7%;
            &.show{
                bottom: 20px;
            }
            .foot-box{
                width: 100%;
                padding: 0 60px 5px;
                h2{
                    display: none;
                }
                .options{
                    width: 100%;
                    justify-content: space-between;
                    li{
                        display: flex;
                        flex-direction: column;
                        line-height: normal;
                        span:last-child{
                            transform: none;
                            margin-top: 2px;
                            &.skin{
                                display: block;
                            }
                        }
                        .icon-top{
                            margin-top: 4px;
                        }
                        .like-hint-box{
                            top: 8px;
                            right: 10px;
                        }
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 600px) {
    .articleld{
        ::v-deep header{
            .icon-like, .like{
                display: none !important;
            }
        }
        .content{
            ::v-deep {
                iframe{
                    height: 310px;
                }
                blockquote{
                    padding-left: 16px;
                }
                p{
                    font-size: 14px;
                    strong, mark{
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 500px) {
    .article{
        .content{
            ::v-deep {
                iframe{
                    height: 260px;
                }
            }
        }
        footer .foot-box{
            padding: 0 8% 5px;
            .options li .like-hint-box{
                right: 14px;
                transform-origin: center bottom;
                span, .like-hint{
                    right: 50% !important;
                    transform: translateX(50%) !important;
                }
                span:nth-of-type(1){
                    top: -65px;
                }
            }
        }
    }
}
@media screen and (max-width: 414px) {
    .content{
        ::v-deep {
            iframe{
                height: 220px;
            }
        }
    }
}
</style>