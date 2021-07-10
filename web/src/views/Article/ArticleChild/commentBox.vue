<template>
  <div class="comment">
      <h2>
          <span>评论列表</span>
          <span>{{commentTotal}}</span>
      </h2>
      <div class="comment-list">
          <div
            class="comment-item"
            v-for="item in commentData"
            :key="item._id"
          >
          <div class="comment-item-box">
              <div class="head">
                  <div class="img">
                      <img :src="'/static/comment/'+item.image+'.jpg'">
                  </div>
                  <div class="name">
                    <a :class="{'admin-mark':item.admin}">{{ item.name }}<span class="mark-tit" v-if="item.admin">这里有我，并且不止有我</span></a>
                    <div class="r">
                        <div class="reply" @click="reply(item,1)">reply</div>
                        <span class="time">{{item.time.date}}</span>
                    </div>  
                  </div>
              </div>
              <div class="comment-content">{{item.content}}</div>
          </div>

          <!-- 子评论 -->
          <div class="comment-child-list" v-if='item.child.length > 0'>
              <div
                class="comment-child-item"
                v-for="citem in item.child"
                :key="citem.id"             
              >
                <div class="head">
                    <div class="img">
                      <img :src="'/static/comment/'+citem.image+'.jpg'">
                  </div>
                  <div class="name">
                    <a :class="{'admin-mark':citem.admin}">{{ citem.name }}<span class="mark-tit" v-if="item.admin">这里有我，并且不止有我</span></a>
                    <div class="r">
                        <div class="reply" @click="reply(item,2,citem)">reply</div>
                        <span class="time">{{citem.time.date}}</span>
                    </div>  
                  </div>
                </div>
                <div class="comment-child-content">
                    <span v-if="citem.type === 3" class="reply-name">@{{citem.reply_name}}</span>
                    <p>{{citem.content}}</p>
                </div>
              </div>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import  store from '../../../store/index.js'
export default {
    props: ['commentTotal','commentData'],
    mixins:{},
    data() {
        return {
            data: {},
            // commentTotal: 0,

            isReply: false,
            replyObj: {},
        }
    },
    created() {
        // this.getComment(this.id)
    },
    methods: {
        async getComment(id) {
            const res = await this.$http.get('/comment/'+id)
            //console.log(res);
            this.data = res.data.body.data
            this.commentTotal = res.data.body.total
            console.log(this.data);
        },
        //回复
        reply(item, type, citem) {
            this.isReply = true
            this.replyObj = {
                parent_id: item._id,
                type: type == 1 ? 2 : 3,
                reply_name: type == 1 ? item.name : citem.name,
                reply_email: type == 1 ? item.email : citem.email,
            }
            
            store.commit('setisReply', true)
            store.commit('setreplyObj', this.replyObj)
            /* const comment = document.getElementById('comment')
            const top = comment.offsetTop */
            this.$nextTick(() => {
            document.getElementById('comment').scrollIntoView({ behavior: 'smooth' })  //滚动到指定位置
            })
        },
        // 取消回复
        cancel(){ 
            this.replyObj = {}
            this.isReply = false
        },
    },
}
</script>

<style lang="scss" scoped>
.comment{
    padding: 0 0 80px;
    overflow: hidden;
    margin-bottom: 1000px;
    span{
        margin-left: 20px;
        font-size: 16px;
    }
    .comment-item{
        border-bottom: 1px solid var(--color-border-2);
        transition: margin 1s, opacity 2s;
        .comment-item-box{
            padding: 25px 0;
            &:hover .head .name .r .reply{
                opacity: 1;
            }
            
            .comment-content{
                color: var(--color-text-1);
                line-height: 22px;
                padding: 0 0 0 58px;
                white-space: pre-wrap;
            }
        }
        .head{
                display: flex;
                position: relative;
                .img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    margin-right: 12px;
                    overflow: hidden;
                    border: 1px solid var(--color-border-2);
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .name{
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    a{
                        font-weight: 400;
                        color: #ef6d57;
                        font-size: 16px;
                        height: 20px;
                        transition: all .3s;
                        text-decoration: none;
                        position: relative;
                        &:hover{
                            color: #ef2f11;
                            text-decoration: underline;
                        }
                        &.admin-mark{
                            &:hover .mark-tit{
                                opacity: 1;
                                visibility: visible;
                                transform: scale(1);
                            }
                            .mark-tit{
                                position: absolute;
                                white-space: nowrap;
                                font-size: 12px;
                                background: #ef6d57;
                                color: #fff;
                                bottom: 100%;
                                left: 100%;
                                border-radius: 20px;
                                padding: 0 10px;
                                height: 24px;
                                line-height: 26px;
                                margin-bottom: 6px;
                                transition: all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28);
                                transform-origin: left bottom;
                                transform: scale(0);
                                opacity: 0;
                                visibility: hidden;
                                z-index: 999;
                                &::before{
                                    content: "";
                                    border: 10px solid transparent;
                                    border-right-width: 10px;
                                    border-right-color: #ef6d57;
                                    border-bottom-width: 0px;
                                    position: absolute;
                                    left: 10px;
                                    top: 22px;
                                    transform: rotate(188deg);
                                }
                            }
                            &::before{
                                content: "";
                                height: 6px;
                                width: 6px;
                                background: #f16339;
                                border-radius: 50%;
                                position: absolute;
                                left: 100%;
                                top: 50%;
                                transform: translateY(-50%);
                                box-shadow: 0 0 0 4px rgba(241, 99, 57, 0.1);
                                margin: 2px 8px;
                                animation: flash 8s infinite;
                            }
                        }
                        @keyframes flash {
                            0%, 50%, 100% {
                                opacity: 1;
                            }
                            25%,75% {
                                opacity: 0;
                            }
                        }
                    }
                    .r{
                        display: flex;
                        .time{
                            color: var(--color-text-4);
                            font-size: 13px;
                            letter-spacing: 0;
                        }
                        .reply{
                            opacity: 0;
                            font-size: 12px;
                            color: #ef6d57;
                            margin-right: 12px;
                            cursor: pointer;
                            transition: all .3s;
                            text-decoration: underline;
                            text-transform: capitalize;
                            &:hover{
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        
    }
    .comment-child-list{
            padding-left: 45px;
            .comment-child-item {
                transition:  all 2s;
                padding:  12px 0 18px;
                &:hover{
                    .head .name .r .reply{
                       opacity: 1; 
                    }
                    
                } 
            }
            .head{
               display: flex;
               align-items:center;
               position: relative;
               .img{
                   width: 40px;
                   height: 40px;
               }
               &:after{
                   content: "";
                   background-color: firebrick;
                   border-top: 1px solid var(--color-border-2);
                   position: absolute;
                   top: -12px;
                   right: 0;
                   left: 52px;
               }
            }
            .comment-child-content{
                    color: var(--color-text-1);
                    padding: 0;
                    line-height: 22px;
                    margin: 0 0 0 50px;
                    white-space: pre-wrap;
                    span{
                        color: var(--color-bg-primary);
                        background: #a9cff3;
                        display: inline-block;
                        height: 18px;
                        padding: 0 4px;
                        line-height: 20px;
                        border-radius: 10px;
                        margin-right: 4px;
                        font-size: 13px;
                    }
                    p{
                        display: inline;
                    }
            }
        }
}
</style>