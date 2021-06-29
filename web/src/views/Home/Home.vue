<template>
<div class="outer">
    <Screen></Screen>
    <div class="content-wrap">
        <home-article></home-article>
    </div>
</div>
  
</template>

<script>
import HomeArticle from './HomeChild/HomeArticle.vue'
import Screen from './HomeChild/Screen'
export default {
    components:{Screen,HomeArticle}
}
</script>

<style>

</style>