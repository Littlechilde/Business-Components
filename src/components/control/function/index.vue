<template>
  <div v-html="config.callback && config.callback(data)"></div>
</template>

<script>
export default {
  name: "ComFunction",
  props: {
    prop: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default: () => ({})
    },
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    return {

    }
  }
}
</script>

<style>

</style>