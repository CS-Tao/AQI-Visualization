<template>
  <div class="querycontainer">
    <div class="choosedate">
        <el-date-picker class="date" v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        <button class="choose-btn" @click="queryTop10">选择</button>
    </div>
    <div class="barchart" id="barchart">
        
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getTop10} from '@/api/dataQuery.api'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    queryTop10 () {
      if (this.value === '') { return }
      getTop10({
        date: this.value
      })
        .then(response => {
          /* var option = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            toolbox: {
              show: true,
              orient: 'vertical',
              left: 'right',
              top: 'center',
              feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
              }
            },
            calculable: true,
            xAxis: [
              {
                type: 'category',
                axisTick: {show: false},
                data: ['2012', '2013', '2014', '2015', '2016']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'Forest',
                type: 'bar',
                barGap: 0,
                label: 'labelOption',
                data: [320, 332, 301, 334, 390]
              },
              {
                name: 'Steppe',
                type: 'bar',
                label: 'labelOption',
                data: [220, 182, 191, 234, 290]
              },
              {
                name: 'Desert',
                type: 'bar',
                label: 'labelOption',
                data: [150, 232, 201, 154, 190]
              },
              {
                name: 'Wetland',
                type: 'bar',
                label: 'labelOption',
                data: [98, 77, 101, 99, 40]
              }
            ]
          }

          // 使用刚指定的配置项和数据显示图表。
          var myChart = echarts.init(document.getElementById('barchart'))
          myChart.setOption(option)
          */

          // alert(JSON.stringify(response.data.data))
          var myChart = echarts.init(document.getElementById('barchart'))

          var option = {
            title: {
              text: this.value + '污染情况',
              x: 'center'
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data: ['AQI', 'SO2', '粉尘'],
              y: '15%'
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: response.data.data['省份']
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: 'AQI',
                type: 'bar',
                data: response.data.data['aqi']
              },
              {
                name: 'SO2',
                type: 'bar',
                stack: '广告',
                data: response.data.data['so2']
              },
              {
                name: '粉尘',
                type: 'bar',
                data: response.data.data['粉尘']
              }
            ]
          }
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .querycontainer {
    position: absolute;
    top: 15vh;
    left: 7vw;
    height: 60vh;
    width: 30vw;

    .choosedate{
        width: 100%;
        height: 32px;
        position: relative;
        .date{
            width: 90%;
            float: left;
            }
        .choose-btn{
            width: 10%;
            height: 32px;
            float: left;
            }
        }
        .barchart{
        width: 100%;
        height: 30vh;
        position: relative;
        background-color: #b1a1eb;
        }
    
  }
</style>
