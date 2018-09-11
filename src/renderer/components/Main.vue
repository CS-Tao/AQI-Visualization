<template>
  <div class="container flex-col">
    <div class="header">
      <img src="@/assets/header.png" class="header-background">
      <div class="nav-btn-group">
        <div class="nav-btn-left-group">
          <button class="nav-btn nav-btn-left-1 nav-btn-active" @click="btnClicked('data-query')">污染查询</button>
          <button class="nav-btn" @click="btnClicked('data-dist')">污染分布</button>
        </div>
        <div class="nav-btn-right-group">
          <button class="nav-btn" @click="btnClicked('map-view-3d')">立体展示</button>
          <button class="nav-btn nav-btn-right-2" @click="btnClicked('provincial-static')">省份统计</button>
        </div>
      </div>
    </div>
    <arcgis-map class="map-container flex-item-fill"/>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Main/Map'

export default {
  components: {
    'arcgis-map': Map
  },
  methods: {
    btnClicked (routeName) {
      this.$router.push({
        name: routeName
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.container {
  height: 100vh;
  width: 100vw;
  background-color: $panel-background-color;
  .header {
    .header-background {
      width: 100%;
    }
    .nav-btn-group {
      position: fixed;
      top: 38px;
      .nav-btn-left-group {
        position: fixed;
        right: calc(62vw + 110px);
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
  background-repeat: no-repeat;
  background-size: cover;
  background-color: transparent;
  border: none;
  padding: 7px 28px;
  color: $primary-text-color;
  text-decoration: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-image: url("~@/assets/menu-item-active.png");
    color: white;
  }
  &.nav-btn-left-1 {
    right: calc(62vw + 110px + 1.5vw);
  }
  &.nav-btn-right-2 {
    position: relative;
    left: calc(110px + 1.5vw);
  }
  &.nav-btn-active {
    background-image: url("~@/assets/menu-item-active.png");
    color: white;
  }
}
</style>
