<template>
  <!-- <json-map class="container" :json-data="jsonData"/> -->
  <div class="panel">
    <el-select v-model="selectId" clearable filterable @change="getProvinceData()" placeholder="请选择">
      <el-option
        v-for="item in provinceNames"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <transition name="bounce">
      <div class="container">
        <table border="0">
          <tr>
            <td id = "charttainer">
              <dashbord v-bind:num="message"></dashbord>
            </td>
            <td id = "lincontainer">
              <lines v-on:sendavery="getavery" :xaxis="ProvinceData.xaxis" :sseries="ProvinceData.sseries"> </lines>
            </td>
          </tr>
        </table>
      </div>
    </transition>
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
      message: 0,
      selectId: '',
      provinceNames: [],
      ProvinceData: [],
      message: 0
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
      provinceApi.getProvinceData(this.selectId).then((response) => {
        if (response.status === 200) {
          this.ProvinceData = response.data
        }
      }).catch(() => {})
    },
    getavery: function (msg) {
      this.message = msg
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
.map-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: $panel-background-color;
  border: 1px solid $panel-border-color;
  color: #ccc;
}
.panel{
  position: fixed;
  bottom: 83vh;
  left: 5vw;
  width: 18vw;
  height: 4vh;
  background-color: $panel-background-color;
  border: 1px solid $panel-border-color;
  color: #ccc;
}
</style>
