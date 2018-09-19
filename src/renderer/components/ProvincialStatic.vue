<template>
  <!-- <json-map class="container" :json-data="jsonData"/> -->
  <div >
    <el-select class="select" v-model="selectId" filterable @change="getProvinceData()" placeholder="请选择">
    <el-option
      v-for="item in provinceNames"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    <div v-if="show">
      <div class="dashbord">
        <dashbord v-bind:num="message"></dashbord>
      </div>
      <div class="lines">
        <lines style="left:0;bottom:0;" v-on:sendavery="getavery" :xaxis="ProvinceData.xaxis" :sseries="ProvinceData.datalist"> </lines>
      </div>
    </div>
  </div>
</template>

<script>
import demoApi from '@/api/demo.api'
import provinceApi from '@/api/province.api'
import Map from '@/components/ProvincialStatic/JSONMap'
import dashbord from '@/components/ProvincialStatic/Dashbord'
import lines from '@/components/ProvincialStatic/Line'

export default {
  data () {
    return {
      jsonData: null,
      selectId: '',
      provinceNames: [],
      ProvinceData: {},
      message: [0, '2017'],
      show: false
    }
  },
  components: {
    'json-map': Map,
    dashbord,
    lines
  },
  mounted () {
    this.getProvinceName()
  },
  methods: {
    getjsonData () {
      demoApi.getRequest().then((response) => {
        this.jsonData = response.data
      }).catch(() => {})
    },
    getProvinceName () {
      provinceApi.getProvinceName().then((response) => {
        if (response.status === 200) {
          this.provinceNames = response.data
        }
      }).catch(() => {})
    },
    getProvinceData () {
      if (this.selectId) {
        provinceApi.getProvinceData(this.selectId).then((response) => {
          if (response.status === 200) {
            this.ProvinceData = response.data
            // console.log('response.data', JSON.stringify(response.data))
          }
          this.show = true
          this.$triggerResize()
        }).catch(() => {})
      } else {
        this.show = false
      }
    },
    getavery: function (msg) {
      this.message = msg
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.dashbord {
  position: fixed;
  right: calc(15px + 1.5vw);
  bottom: $layout-footer-height+4vw;
  height: 13vw;
  width: 13vw;
}
.lines {
  position: fixed;
  left: 0vw;
  bottom: $layout-footer-height;
  height: 18vw;
  width: 80vw
}
.select {
  position: fixed;
  top: 20vh;
  right: 15px;
}
</style>
