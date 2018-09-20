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
@import '@/style/variables.scss';

@font-face{
 font-family:'digital-clock-font';
 src: url('../../style/font/digital.ttf');
}

.label{
  position: fixed;
  bottom: $layout-footer-height + 1.5vw;
  right:calc(15px + 10.5vw);
  font-size: 1vw;
  color: #00a1e1;
  height: 10vh;
  float:left;
}
.average {
  font-family:'digital-clock-font';
  font-size: 5vw;
  color: #00a1e1;
  text-align: center;
  position: relative;
  float:left;
}
</style>
