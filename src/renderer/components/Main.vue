<template>
  <div class="container flex-col">
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
  </div>
</template>

<script>
import Map from '@/components/Main/Map'
import Scene from '@/components/Main/Scene'

export default {
  data () {
    return {
      showIn3d: false
    }
  },
  components: {
    'arcgis-map': Map,
    'arcgis-scene': Scene
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
  background-color: $panel-background-color;
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
    background-color: $panel-background-color;
  }
  .main {
    background-color: $panel-background-color;
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
