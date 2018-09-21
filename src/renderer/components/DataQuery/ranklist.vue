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
    color: mix(rgb(184, 115, 51), black, 50%);
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
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 13px;
    &.level-1 {
      color: red;
      border: 1px solid red;
      box-shadow: 0px 0px 10px 2px rgba(red, 0.2) inset;
    }
    &.level-2 {
      color: orange;
      border: 1px solid orange;
      box-shadow: 0px 0px 10px 2px rgba(orange, 0.2) inset;
    }
    &.level-3 {
      color: yellow;
      border: 1px solid yellow;
      box-shadow: 0px 0px 10px 2px rgba(yellow, 0.2) inset;
    }
    &.level-4 {
      $yellow-2: mix(yellow, black, 60%);
      color: $yellow-2;
      border: 1px solid $yellow-2;
      box-shadow: 0px 0px 10px 2px rgba($yellow-2, 0.2) inset;
    }
    &.level-5 {
      $green-2: mix(lightgreen, black, 70%);
      color: $green-2;
      border: 1px solid $green-2;
      box-shadow: 0px 0px 10px 2px rgba($green-2, 0.2) inset;
    }
    &.level-6 {
      $green-1: mix(green, white, 80%);
      color: $green-1;
      border: 1px solid $green-1;
      box-shadow: 0px 0px 10px 2px rgba($green-1, 0.2) inset;
    }
  }
}
</style>
