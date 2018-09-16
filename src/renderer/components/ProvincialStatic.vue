<template>
  <!-- <json-map class="container" :json-data="jsonData"/> -->
  <div class="panel">
   <el-select v-model="selectValue" clearable filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.cityname"
      :value="item.cityname">
    </el-option>
  </el-select>
  <span>SelectValue: {{ selectValue }}</span>
  </div>
</template>

<script>
import demoApi from '@/api/demo.api'
import provinceNameApi from '@/api/provinceName.api'
import Map from '@/components/ProvincialStatic/JSONMap'

export default {
  data () {
    return {
      jsonData: null,
      selectValue: '',
      options: []
    }
  },
  components: {
    'json-map': Map
  },
  mounted () {
    this.getjsonData()
  },
  methods: {
    getjsonData () {
      demoApi.getRequest().then((response) => {
        this.jsonData = response.data
      }).catch(() => {})
    },
    getProvinceName () {
      provinceNameApi.getProvinceName().then((response) => {
        this.options = response.data
      }).catch(() => {})
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
  bottom: 80vh;
  left: 1vw;
  width: 18vw;
  height: 4vh;
  background-color: $panel-background-color;
  border: 1px solid $panel-border-color;
  color: #ccc;
}
</style>
