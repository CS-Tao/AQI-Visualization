<template>
  <div class="container">
    <el-date-picker class="choosedate" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
    <div class="barchart">
        
    </div>
  </div>
</template>

<script>
// import echarts from 'echarts'
export default {
  data () {
    return {
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      value1: '',
      value2: ''
    }
  }
}
/*
var option = {
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
*/
// 使用刚指定的配置项和数据显示图表。
// var myChart = echarts.init(document.getElementById('barchart'))
// myChart.setOption(option)
</script>

<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 15vh;
    left: 7vw;
    height: 60vh;
    width: 30vw;
    z-index: 1;
    .choosedate{
      width: 100%;
      position: relative;
    }
  }
</style>
