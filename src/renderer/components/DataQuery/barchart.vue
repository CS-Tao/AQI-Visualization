<template>
  <div class="chartpanel">
    <div class="barchart" id="barchart"></div>
    <calenchart :date="date" :city="city"></calenchart>
    <motochart :date="date" :city="city"></motochart>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTop10 } from '@/api/dataQuery.api'
import calenchart from '@/components/DataQuery/calenchart'
import motochart from '@/components/DataQuery/motochart'
import resize from '@/components/Utils/ChartResize'
export default {
  mixins: [resize],
  data () {
    return {
      city: 0
    }
  },
  props: {
    date: {
      type: String,
      required: true
    }
  },
  components: {
    calenchart,
    motochart
  },
  watch: {
    date () {
      this.getBar(this.date)
    }
  },
  methods: {
    getBar (datestr) {
      var latlng = []
      var cityid = []
      var myChart = echarts.init(document.getElementById('barchart'))
      getTop10('json', datestr).then(response => {
        // alert(JSON.stringify(response.data.data))
        latlng = response.data['latlng']
        cityid = response.data['cityId']
        var option = {
          title: {
            text: datestr + '污染情况',
            x: 'center',
            textStyle: {
              color: '#3989E3'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: '#3989E3'
            }
          },
          legend: {
            data: ['AQI', 'PM2.5', 'SO2'],
            y: '15%',
            textStyle: {
              color: '#3989E3'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: response.data['city'],
            axisLine: {
              lineStyle: {
                color: '#3989E3'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#3989E3'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#3989E3'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#3989E3'
              }
            }
          },
          series: [
            {
              name: 'AQI',
              type: 'bar',
              data: response.data['aqi'],
              color: '#5092D6'
            },
            {
              name: 'PM2.5',
              type: 'bar',
              stack: '广告',
              data: response.data['pm2.5'],
              color: '#002156'
            },
            {
              name: 'SO2',
              type: 'bar',
              data: response.data['so2'],
              color: '#B3BAC6'
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        document.getElementById('average').innerText = JSON.stringify(
          response.data['average']
        )
      })
      myChart.on('click', (params) => {
        // 获得了城市名称
        this.$store.dispatch('setMapCenterLat', latlng[params.dataIndex][0])
        this.$store.dispatch('setMapCenterLng', latlng[params.dataIndex][1])
        this.city = parseInt(cityid[params.dataIndex])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chartpanel{
  width:30vw;
  .barchart {
    width: 30vw;
    height: 30vh;
    position: relative;
  }
}
</style>
