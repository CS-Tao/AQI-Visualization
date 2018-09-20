<template>
  <!--<div class="choosedate">
  <el-date-picker class="date" v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
  </div>-->
  <div class="chart">
  <barchart :date="value"></barchart>
  </div>
</template>

<script>
import barchart from '@/components/DataQuery/barchart'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      value: '2014-01-01'
    }
  },
  computed: {
    ...mapGetters([
      'selectedDateStr'
    ])
  },
  components: {
    barchart
  },
  watch: {
    selectedDateStr () {
      this.changeDate(this.selectedDateStr)
    }
  },
  methods: {
    changeDate (m) {
      if (m) {
        this.value = m
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  top: 70vh;
  left: 0vw;
  width: 60vw;
  height: 25vh;
  position: fixed;
}
</style>
