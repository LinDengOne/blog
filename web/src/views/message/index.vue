<template>
  <div class="flex flex-column align-center">
    <Header/>
    <div class="content">
        <messageiput></messageiput>
    </div>
  </div>
</template>

<script>
import Header from '../../components/Header.vue'
import messageiput from './MessageChild/messageIput.vue'
export default {
    components: {
        messageiput,
        Header
    }
}
</script>

<style>

</style>