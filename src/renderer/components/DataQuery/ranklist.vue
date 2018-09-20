<template>
  <div class="primary-panel table-container">
    <el-table
      :data="dailyData"
      :height="tableHeight"
      @row-click="rowClicked">
      <el-table-column label="排名">
        <template slot-scope="scope">
          <span>{{scope.$index + 1}}</span>
          <svg-icon
            v-if="scope.$index < 3"
            icon-class="rank"
            class="rank-top"
            :class="{
              'rank-1': scope.$index == 0,
              'rank-2': scope.$index == 1,
              'rank-3': scope.$index == 2
            }">
            {{scope.$index + 1}}
          </svg-icon>
          <svg-icon
            v-else-if="scope.$index < 8 && (scope.row.level!=='良' || scope.row.level!=='优')"
            icon-class="reword"
            class="rank-top">
            {{scope.$index + 1}}
          </svg-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="地名"/>
      <el-table-column label="Aqi">
        <template slot-scope="scope">
          <span>{{scope.row.value[0]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="污染等级">
        <template slot-scope="scope">
          <span
            class="level"
            :class="{
              'level-1': scope.row.level==='严重污染',
              'level-2': scope.row.level==='重度污染',
              'level-3': scope.row.level==='中度污染',
              'level-4': scope.row.level==='轻度污染',
              'level-5': scope.row.level==='良',
              'level-6': scope.row.level==='优',
            }">
            {{scope.row.level}}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    tableHeight: {
      type: String,
      default: '55vh'
    }
  },
  computed: {
    ...mapGetters([
      'dailyData'
    ])
  },
  methods: {
    rowClicked (row, event, column) {
      this.$emit('row-clicked', {
        cityId: row.id,
        cityName: row.name,
        lng: row.position[0],
        lat: row.position[1]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.table-container {
  // position: fixed;
  // top: calc(100/1920*111vw + 20px);
  // right: 15px;
  padding: 0;
  width: 370px;
  height: 55vh;
  .rank-top {
    width: 20px;
    height: 20px;
    text-align: center;
    padding-left: 5px;
    &.rank-1 {
      color: gold;
    }
    &.rank-2 {
      color: silver;
    }
    &.rank-3 {
      color: rgb(184, 115, 51);
    }
  }
  .level {
    border: 1px solid $panel-border-color;
    box-shadow: 0px 0px 10px 2px rgba(#ffffff, 0.1) inset;
    padding: 3px 5px;
    border-radius: 3px;
    &.level-1 {
      color: red;
    }
    &.level-2 {
      color: orange;
    }
    &.level-3 {
      color: yellow;
    }
    &.level-4 {
      color: lightyellow;
    }
    &.level-5 {
      color: lightgreen;
    }
    &.level-6 {
      color: green;
    }
  }
}
</style>
