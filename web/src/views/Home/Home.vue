<template>
<div :class="{'navActive': isActive}">
    <Screen></Screen>
    <Menu />
    <div class="menu"  @click="menu">
		<span class="iconfont" :class="isActive ? 'icon-close' : 'icon-menu'"></span>
	</div>
    <back-top/>
    <div class="content-wrap">
        <home-article></home-article>
    </div>
</div>
  
</template>

<script>
import BackTop from '../../components/BackTop.vue'
import Menu from '../../components/Menu.vue'
import HomeArticle from './HomeChild/HomeArticle.vue'
import Screen from './HomeChild/Screen'
export default {
    components:{Screen,HomeArticle, BackTop, Menu},
    data() {
        return {
            isNav: false,
            isActive: false
        }
    },
    beforeRouteLeave(to, from, next){
		window.onresize = null
		setTimeout(() => {
			this.isNav = false
			document.body.style.overflowY = ''
		}, 800)
        next()
    },
    methods: {
        menu() {
            this.isActive = !this.isActive
            console.log(this.isNaV);
            document.documentElement.style.overflowY = this.isActive ? 'hidden' : ''
        }
    },
}
</script>

<style lang="scss" scoped>
.menu{
    position: fixed;
    right: 30px;
    top: 50px;
    width: 30px;
    height: 30px;
    line-height: 32px;
    cursor: pointer;
    color:red;
    text-align: center;
    background: rgba(#fff, 0.9);
    z-index: 1999;
}

.navActive{
  ::v-deep .nav{
      top: 0;
    }
}
</style>