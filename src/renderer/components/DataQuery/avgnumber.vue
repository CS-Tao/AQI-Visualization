<template>
  <div class="chartpanel">
    <div class="average" id="average"></div>
  </div>
</template>

<script>
import resize from '@/components/Utils/ChartResize'
export default {
  mixins: [resize],
  props: {
    average: {
      type: Number,
      required: false
    }
  },
  components: {
  },
  watch: {
    average () {
      document.getElementById('average').innerText = this.average
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face{
 font-family:'digital-clock-font';
 src: url('../../style/font/digital.ttf');
}
.chartpanel{
  width:30vw;
  .average {
    margin-top: 2vh;
    width: 30vw;
    height: 20vh;
    font-family:'digital-clock-font';
    font-size: 100px;
    color: #b3bac6;
    text-align: center;
    line-height: 30vh;
    position: relative;
  }
}
</style>
