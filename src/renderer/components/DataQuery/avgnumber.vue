<template>
  <div class="average" id="average"></div>
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
.average {
  width: 15vw;
  height: 10vh;
  font-family:'digital-clock-font';
  font-size: 100px;
  color: #00a1e1;
  text-align: center;
  line-height: 15vh;
  position: relative;
}
</style>
