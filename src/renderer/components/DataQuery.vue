<template>
  <div class="querycontainer">
    <div class="choosedate">
    <el-date-picker class="date" v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
    </div>
    <barchart :date="value"></barchart>
  </div>
</template>

<script>
import barchart from '@/components/DataQuery/barchart'
export default {
  data () {
    return {
      value: ''
    }
  },
  components: {
    barchart
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.querycontainer {
  position: absolute;
  top: 15vh;
  bottom: 0vh;
  left: 7vw;
  width: 30vw;
  overflow: hidden;
  background-color: #00103b;
  .choosedate {
    width: 30vw;
    height: 32px;
    position: relative;
    .date {
      width: 30vw;
      float: left;
    }
  }
}
</style>
