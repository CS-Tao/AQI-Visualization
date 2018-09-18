<template>
  <div class="container">
    <!-- <el-date-picker v-model="dateStr" value-format="yyyy-MM-dd" @change="setSelectedDateForMap()" class="date-picker"/> -->
    <div @click="preBtnClicked()">
      <svg-icon :icon-class="'pre'" class="pre-btn"/>
    </div>
    <div @click="pauseBtnClicked()">
      <svg-icon :icon-class="pause?'pause':'continue'" class="pause-btn"/>
    </div>
    <div @click="nextBtnClicked()">
      <svg-icon :icon-class="'pre'" class="next-btn"/>
    </div>
    <el-slider
      v-model="sliderValue"
      :max="365*4"
      class="slider"
      @change="sliderValueChanged()">
    </el-slider>
    <!-- <led-date-display :date="date" class="led-date"/> -->
    <div class="primary-panel right-in new-led-date">{{dateStr}}</div>
  </div>
</template>

<script>
// import LedDateDisplay from './DataDist/LedDateDisplay'
const startDate = '2014-01-01'

export default {
  // components: {
  //   LedDateDisplay
  // },
  data () {
    return {
      date: new Date(startDate),
      dateStr: startDate,
      sliderValue: 0,
      pause: false,
      autoPlayTimerHandler: null
    }
  },
  watch: {
    date () {
      this.dateChanged()
    }
  },
  methods: {
    setSelectedDateForMap () {
      this.date = new Date(this.dateStr)
      this.$store.dispatch('setSelectedDate', this.dateStr)
    },
    pauseBtnClicked () {
      if (this.pause) {
        if (this.autoPlayTimerHandler !== null) {
          window.clearInterval(this.autoPlayTimerHandler)
          this.autoPlayTimerHandler = null
        }
      } else {
        this.autoPlayTimerHandler = window.setInterval(() => {
          this.sliderValue += 10
          this.date = new Date(new Date(startDate).getTime() + this.sliderValue * 24 * 60 * 60 * 1000)
        }, 4000)
      }
      this.pause = !this.pause
    },
    preBtnClicked () {
      this.date = new Date(this.date.getTime() - 24 * 60 * 60 * 1000)
    },
    nextBtnClicked () {
      this.date = new Date(this.date.getTime() + 24 * 60 * 60 * 1000)
    },
    sliderValueChanged () {
      this.date = new Date(new Date(startDate).getTime() + this.sliderValue * 24 * 60 * 60 * 1000)
    },
    dateChanged () {
      var yearStr = this.date.getFullYear()
      var monthStr = this.date.getMonth() + 1
      var dayStr = this.date.getDate()
      var dateStr = yearStr
      if (monthStr < 10) dateStr += '-0' + monthStr
      else dateStr += '-' + monthStr
      if (dayStr < 10) dateStr += '-0' + dayStr
      else dateStr += '-' + dayStr
      this.dateStr = dateStr
      this.sliderValue = (this.date.getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000)
      this.$store.dispatch('setSelectedDate', this.dateStr)
      // this.setSelectedDateForMap()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 94vw;
  height: 2.5vw;
  padding: 0vw 3vw;
  background: $header-background-color;
  box-shadow: 0 -1px $box-shadow-size #000;
  // .date-picker {
  //   position: fixed;
  //   margin-top: 0.25rem;
  // }
  .slider {
    margin-left: 7.6vw;
    margin-top: .1vw;
  }
  .pre-btn {
    position: fixed;
    color: #fff;
    cursor: pointer;
    width: 1.2vw;
    height: 1.2vw;
    // margin-left: 1vw;
    margin-top: 0.5vw;
  }
  .pause-btn {
    position: fixed;
    color: #fff;
    cursor: pointer;
    width: 1.2vw;
    height: 1.2vw;
    margin-left: 2.2vw;
    margin-top: 0.5vw;
  }
  .next-btn {
    position: fixed;
    color: #fff;
    cursor: pointer;
    width: 1.2vw;
    height: 1.2vw;
    margin-left: 4.4vw;
    margin-top: 0.5vw;
    transform: scale(-1,1);
  }
  .led-date {
    position: fixed;
    z-index: 999;
    bottom: 6vh;
    left: auto;
    right: 0.5vw;
    margin: 0px!important;
    // width: (220 / 3.3)px;
    transform: scale(0.3);
    transform-origin: 100% 100%;
    // border-width: 2px 0;
    padding: 0;
    // border-radius: 50px;
    background: transparent;
    box-shadow: none;
  }
  .new-led-date {
    position: fixed;
    font-family: 'digital-clock-font';
    font-size: 3vw;
    bottom: 7vh;
    right: 0.5vw;
    width: auto;
    height: 3vw;
    padding: 0.4vw 1vw;
  }
}
</style>
