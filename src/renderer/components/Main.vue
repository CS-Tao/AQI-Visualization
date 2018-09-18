<template>
  <el-container v-loading.fullscreen="maskMainView" class="container flex-col">
    <div class="header">
      <img src="@/assets/header.png" class="header-background">
      <div class="nav-btn-group">
        <div class="nav-btn-left-group">
          <button class="nav-btn nav-btn-left-1" :class="{'nav-btn-active': this.$route.name === 'data-query'}" @click="btnClicked('data-query')">污染查询</button>
          <button class="nav-btn" :class="{'nav-btn-active': this.$route.name === 'provincial-static'}" @click="btnClicked('provincial-static')">省份统计</button>
        </div>
        <div class="nav-btn-right-group">
          <!-- <button class="nav-btn" :class="{'nav-btn-active': this.$route.name === 'map-view-3d'}" @click="btnClicked('map-view-3d')">立体展示</button> -->
          <button class="nav-btn" :class="{'nav-btn-active': this.$route.name === 'data-dist'}" @click="btnClicked('data-dist')">污染分布</button>
          <el-switch
           class="switch-3d"
            v-if="this.$route.name === 'data-dist'"
            active-color="green"
            inactive-color="red"
            v-model="showIn3d"
            active-text="3D 展示">
          </el-switch>
        </div>
      </div>
    </div>
    <arcgis-scene v-if="showIn3d" class="map-container flex-item-fill"/>
    <arcgis-map v-else class="map-container flex-item-fill"/>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="footer-container">
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
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Map from '@/components/Main/Map'
import Scene from '@/components/Main/Scene'
const startDate = '2014-01-01'

export default {
  data () {
    return {
      showIn3d: false,
      date: new Date(startDate),
      dateStr: startDate,
      sliderValue: 0,
      pause: false,
      autoPlayTimerHandler: null
    }
  },
  components: {
    'arcgis-map': Map,
    'arcgis-scene': Scene
  },
  computed: {
    ...mapGetters([
      'maskMainView'
    ])
  },
  watch: {
    date () {
      this.dateChanged()
    }
  },
  methods: {
    btnClicked (routeName) {
      if (this.$route.name !== routeName) {
        this.$router.push({
          name: routeName
        })
      } else {
        this.$router.push({
          name: 'main'
        })
        this.showIn3d = false
      }
    },
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
          this.sliderValue += 1
          this.date = new Date(new Date(startDate).getTime() + this.sliderValue * 24 * 60 * 60 * 1000)
        }, 2000)
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
$nav-top: 2.7vw;

.container {
  height: 100vh;
  width: 100vw;
  background-color: $header-background-color;
  .header {
    box-shadow: 0 1px $box-shadow-size #000;
    z-index: 1;
    .header-background {
      width: 100%;
    }
    .nav-btn-group {
      position: fixed;
      top: $nav-top;
      .nav-btn-left-group {
        position: fixed;
        right: 62vw + $btn-width;
      }
      .nav-btn-right-group {
        position: fixed;
        left: 62vw;
      }
    }
  }
  .map-container {
    position: relative;
    width: 100vw;
    height: 10vh;
    bottom: 0;
    // background-color: $header-background-color;
    background-color: #000;
  }
  .main {
    background-color: $header-background-color;
  }
  .footer-container {
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
}
.nav-btn {
  position: fixed;
  background-image: url("~@/assets/menu-item-default.png");
  height: $btn-height;
  width: $btn-width;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  border: none;
  // padding: 7px 28px;
  color: $primary-text-color;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  font-size: $btn-font-size;
  &:hover {
    background-image: url("~@/assets/menu-item-active.png");
    // color: $primary-text-color-light;
  }
  &.nav-btn-left-1 {
    right: 62vw + $btn-width + 1.5vw;
  }
  &.nav-btn-right-2 {
    position: relative;
    left: $btn-width + 1.5vw;
  }
  &.nav-btn-active {
    background-image: url("~@/assets/menu-item-active.png");
    color: $primary-text-color-light;
  }
}
.switch-3d {
  position: fixed;
  left: $btn-width + 1.5vw + 62vw;
  top: $nav-top + 1.1vw;
}
</style>
