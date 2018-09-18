<template>
  <!-- <json-map class="container" :json-data="jsonData"/> -->
  <div >
    <div class="panel">
      <el-select v-model="selectId" clearable filterable @change="getProvinceData()" placeholder="请选择">
      <el-option
        v-for="item in provinceNames"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    </div>
    <div class="container" v-if="show">
        <table border="0">
          <tr>
            <td id = "charttainer">
              <dashbord v-bind:num="message"></dashbord>
            </td>
            <td id = "lincontainer">
              <lines v-on:sendavery="getavery" :xaxis="ProvinceData.xaxis" :sseries="ProvinceData.datalist"> </lines>
            </td>
          </tr>
        </table>
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
      message: 0,
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
.container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50vh;
  background-color: RGB(17,26, 250, 0.3);// $panel-background-color;
  border: 0px solid $panel-border-color;
  color: #ccc;
  border: 0;
}
.panel{
  position: fixed;
  bottom: 83vh;
  left: 5vw;
  width: 18vw;
  height: 4vh;
  background-color: RGB(17,26, 250, 0.3);// $panel-background-color;
  border: 0px solid $panel-border-color;
  color: #ccc;
}
#charttainer{
height: 40vh;
width: 30vw
}
#lincontainer{
height: 40vh;
width: 50vw
}
</style>
