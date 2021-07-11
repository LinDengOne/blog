<template>
  <div class="nav">
      <ul class="list">
          <li v-for="(item, index) in list" :key="index">
              <a  @click="toPage(item.url)">{{item.title}}</a>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name:'mainMenu',
    data() {
        return {
            list: [
				{
					title: 'Article',
					url: 'article'
				},
				{
					title: 'Rainy',
					url: 'rain'
				},
				{
					title: 'Envelope',
					url: 'envelope'
				},
				{
					title: 'Subscribe',
                    url: 'subscribe',
				},
				{
					title: 'Message',
                    url: 'message',
				},
				{
					title: "About",
					url: 'introducing'
				}
			],
        }
    },
    methods: {
        toPage(url){
			this.$router.push(`/${url}`)
		},
    },
}
</script>

<style lang="scss" scoped>
.nav{
    position: fixed;
    left: 0;
    top: -100%;
    //background-color: black;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color: #fff, $alpha: .96);
    transition: top .3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    .list{
        width: 80%;
        display: block;
        text-align: center;
        margin-top: -120px;
        li{
            margin: 0 20px 20px ;
            list-style: none;
            display: inline-block;
            a{
                font-size: 24px;
                cursor: pointer;
                color: #666;
                letter-spacing: 1px;
                &:hover{
                    color: #080808;
                }

            }
        }
    }
}
</style>