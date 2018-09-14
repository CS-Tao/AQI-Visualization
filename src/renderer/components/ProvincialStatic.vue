<template>
  <div class="panel" @click="refeshDate()">{{date}}</div>
</template>

<script>
import demoApi from '@/api/demo.api'

export default {
  data () {
    return {
      date: null
    }
  },
  mounted () {
    this.refeshDate()
  },
  methods: {
    refeshDate () {
      demoApi.getRequest().then((response) => {
        console.log(response)
        this.date = response.data.time
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.panel {
  position: fixed;
  top: 25vh;
  left: 0;
  width: 100vw;
  height: 75vh;
  background-color: $panel-background-color;
  border: 1px solid $panel-border-color;
  color: #ccc;
}
</style>
