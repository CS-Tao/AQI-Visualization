<template>
  <div>
    <div :class="isClick?'barchart':'ll'" id="barchart"></div>
    <div v-if="isClick" class="ave">
      <avgnumber :date="date" :city="city" :average="average"></avgnumber>
    </div>
    <div v-if="!isClick" class="calen">
      <calenchart :date="date" :cityname="cityname" :city="city"></calenchart>
    </div>
    <div class="mo">
      <motochart :date="date" :city="city" v-if="!isClick"></motochart>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTop10 } from '@/api/dataQuery.api'
import avgnumber from '@/components/DataQuery/avgnumber'
import calenchart from '@/components/DataQuery/calenchart'
import motochart from '@/components/DataQuery/motochart'
import resize from '@/components/Utils/ChartResize'
const titleColor = '#f3f4f5'
export default {
  mixins: [resize],
  data () {
    return {
      city: 0,
      cityname: null,
      average: 0,
      isClick: true,
      chart: null
    }
  },
  props: {
    date: {
      type: String,
      required: true
    }
  },
  components: {
    avgnumber,
    calenchart,
    motochart
  },
  watch: {
    date () {
      this.getBar(this.date)
    }
  },
  mounted () {
    this.getBar(this.date)
  },
  methods: {
    getBar (datestr) {
      var latlng = []
      var cityid = []
      var citynamearr = []
      this.chart = echarts.init(document.getElementById('barchart'), 'light')
      getTop10('json', datestr).then(response => {
        // alert(JSON.stringify(response.data.data))
        if (response.status === 200) {
          latlng = response.data['latlng']
          cityid = response.data['cityId']
          citynamearr = response.data['city']
          var option = {
            title: {
              text: datestr + '污染情况',
              x: 'center',
              textStyle: {
                color: titleColor
              }
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              },
              textStyle: {
                color: titleColor
              }
            },
            legend: {
              data: ['AQI', 'PM2.5', 'SO2'],
              y: '15%',
              textStyle: {
                color: titleColor
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
                  color: titleColor
                }
              },
              axisLabel: {
                textStyle: {
                  color: titleColor
                }
              }
            },
            yAxis: {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: titleColor
                }
              },
              axisLabel: {
                textStyle: {
                  color: titleColor
                }
              }
            },
            series: [
              {
                name: 'AQI',
                type: 'bar',
                data: response.data['aqi']
              },
              {
                name: 'PM2.5',
                type: 'bar',
                stack: '广告',
                data: response.data['pm2.5']
              },
              {
                name: 'SO2',
                type: 'bar',
                data: response.data['so2']
              }
            ]
          }
          // 使用刚指定的配置项和数据显示图表。
          this.chart.setOption(option)
          this.average = response.data['average']
          this.isClick = true
          this.chart.on('click', (params) => {
          // 获得了城市名称
            this.$store.dispatch('setMapCenterLat', latlng[params.dataIndex][0])
            this.$store.dispatch('setMapCenterLng', latlng[params.dataIndex][1])
            this.cityname = citynamearr[params.dataIndex]
            this.city = parseInt(cityid[params.dataIndex])
            this.isClick = false
            this.$triggerResize()
          })
        } else {
          throw new Error('数据加载错误')
        }
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.barchart{
  height: 25vh;
  width:60vw;
}
.ll{
  height: 25vh;
  width:30vw;
}
.ave{
  top:80vh;
  left:62vw;
  width: 10vw;
  height: 15vh;
  position: fixed;
}
.calen{
  top:70vh;
  left:30vw;
  width: 52vw;
  height: 25vh;
  position: fixed;
}
.mo{
  top:50vh;
  left:67.5vw;
  width: 30vw;
  height: 30vh;
  position: fixed;
}
</style>
