<template>
  <button 
  class="btn"
  @click="click"
  :style="styles"
  >
    {{text}}
  </button>
</template>

<script>
export default {
props: {
    text: {
        type: String,
        default: '发表'
    },
    styles: {
        type: Object,
        default: () => {}
    }
},
methods: {
    click () {
        this.$emit('onclick')
    }
},
}
</script>

<style lang="scss" scoped>
.btn{
    position: relative;
    text-decoration: none;
    background-color: beige;
    border: transparent;
    outline: transparent;
    cursor: pointer;

}
</style>