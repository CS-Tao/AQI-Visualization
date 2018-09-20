<template>
  <div>
    <div class="label">Aqi 峰值</div>
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
  },
  mounted () {
    if (this.average !== 0) { document.getElementById('average').innerText = this.average }
  }
}
</script>

<style lang="scss" scoped>
@font-face{
 font-family:'digital-clock-font';
 src: url('../../style/font/digital.ttf');
}
.label{
  margin-top: 8vh;
  font-size: 16px;
  color: #00a1e1;
  width: 5vw;
  height: 10vh;
  float:left;
}
.average {
  width: 12vw;
  height: 10vh;
  font-family:'digital-clock-font';
  font-size: 80px;
  color: #00a1e1;
  text-align: center;
  line-height: 15vh;
  position: relative;
  float:left;
}
</style>
