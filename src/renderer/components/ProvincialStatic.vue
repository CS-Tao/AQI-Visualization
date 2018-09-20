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
    <div v-if="treeData.length!==0" class="primary-panel tree">
      <el-tree
      ref="tree"
      :data="treeData" 
      show-checkbox
      node-key="id"
      :default-expanded-keys="[0]"
      @check-change="treeNodeCheck"
      :props="{
          children: 'children',
          label: 'label'
        }">
      </el-tree>
    </div>
    <div v-if="showData.length!==0">
      <div class="dashbord">
        <dashbord v-bind:num="message"></dashbord>
      </div>
      <div class="lines">
        <lines style="left:0;bottom:0;" v-on:sendavery="getavery" :xaxis="ProvinceData.xaxis" :sseries="showData"> </lines>
      </div>
    </div>
  </div>
</template>

<script>
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
      showData: [],
      message: [0, '2017']
    }
  },
  components: {
    'json-map': Map,
    dashbord,
    lines
  },
  computed: {
    selectName () {
      return this.provinceNames.filter((item) => {
        return item.id === this.selectId
      })[0].name
    },
    treeData () {
      if (this.ProvinceData.datalist) {
        var childrenNodes = []
        for (let i = 0; i < this.ProvinceData.datalist.length; i++) {
          childrenNodes.push({
            id: i + 1,
            label: this.ProvinceData.datalist[i].name
          })
        }
        return [{
          id: 0,
          label: this.selectName,
          children: childrenNodes
        }]
      } else {
        return []
      }
    }
  },
  mounted () {
    this.getProvinceName()
  },
  methods: {
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
          }
        }).catch(() => {})
      }
    },
    getavery: function (msg) {
      this.message = msg
    },
    treeNodeCheck () {
      var checkedNodes = this.$refs.tree.getCheckedNodes()
      this.showData = this.ProvinceData.datalist.filter((item) => {
        for (let i = 0; i < checkedNodes.length; i++) {
          if (item.name === checkedNodes[i].label) {
            return true
          }
        }
        return false
      })
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
  bottom: $layout-footer-height+1vw;
  height: 14vw;
  width: 80vw
}
.select {
  position: fixed;
  top: calc(100/1920*111vw + 20px);
  right: 15px;
  width: 240px;
  height: 32px;
}
.tree {
  position: fixed;
  overflow-y: scroll;
  top: calc(100/1920*111vw + 62px);
  right: 15px;
  width: 240px;
  height: 40vh; 
  padding: 0;
}
</style>
