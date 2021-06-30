<template>
  <div class="container">
      <section class="list">
          <div class="year-list"

          >

          </div>
      </section>
  </div>
</template>

<script>
export default {
    name: 'articleList',
    data() {
        return {
            status: 'more',
            page: 1,
            requestDatas: []
        }
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
    },
}
</script>

<style>

</style>