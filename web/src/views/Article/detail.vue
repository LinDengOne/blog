<template>
  <div class="article">
      <div class="scrollbar"  :style="{ width: postProgress }"></div>
        <div class="wraper" v-if="data.time">
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
            <comment-input :id="data._id" :title="data.title"/>
      </div>
  </div>
</template>

<script>
//import "highlight.js/styles/monokai-sublime.css";
import commentInput from './ArticleChild/commentInput.vue'
import scrollMixin from '../../mixin/scroll'
export default {
    mixins: [scrollMixin],
    components:{commentInput},
    data() {
        return {
           data: {},
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
            console.log(n);
            return n < 100 ? n + '%' : '100%'
        }
    },
    async created() {
        //console.log(this.$route.params.id);
        await this.getArticle(this.$route.params.id)
    },
    mounted() {
        setTimeout(() => {
            this.clientHeight = this.getWin('clientHeight')
            this.contentHeight = this.getHeight()
        },100)
            //this.isLike = !!localStorage.getItem(`like-${this.data._id}`)
            //console.log(this.clientHeight);
    },
    methods: {
        async getArticle(id) {
           const res = await this.$http.get('/article/'+id)
           this.data = res.data.body
           //console.log(this.data);
        },
        getHeight() {
            const domList = ['.content', '.stuff', '.title']
            const height = domList.reduce((t, i) => {
                t += document.querySelector(i).offsetHeight
                console.log(t);
                return t
            }, 0)
            return height
        },
    },
}
</script>

<style lang="scss" scoped>
.article{
    position: absolute;
    width: 100%;
    .wraper{
        width: 800px;
        margin: auto;
        // background-color: aqua;
        transition: none;
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
    h1.title{
        font-size: 30px;
        padding: 130px 0 22px;
        color: var(--color-text-1);
    }
    .stuff{
        color: var(--color-text-2);
        position: relative;
        line-height: 22px;
    }
    .content{
        padding: 100px 0;
        font-size: 14px;
        color: var(--color-text-1);
        //height: 1000px;
        ::v-deep{
            p{
            // background-color: antiquewhite;
                line-height: 36px;
                margin: 0 0 22px;
                font-size: 16px;
                mark{
                    padding: 4px 4px 0;
                }
        }
        }
        
    }
}
</style>