<template>
  <div class="back-top"  :class="{show: scroll_current >= 1000}" @click="backTop">
      <span class="iconfont icon-top"></span>
  </div>
</template>

<script>
import scrollMixin from '../mixin/scroll'
export default {
    name:'backtop',
    mixins: [scrollMixin],
    methods: {
        backTop(){
            const div = document.querySelector('#app')
            div.scrollIntoView({ behavior: 'smooth' })
        }
    },


}
</script>

<style lang="scss" socped>
    .back-top{
        position: fixed;
        bottom: 20px;
        right: 30px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
        &.show{
            opacity: 1;
            visibility: visible;
        }
        span{
            font-size: 40px;
            color:#73aada;
            &:hover{
                color: var(--color-active)
            }
        }
    }
</style>