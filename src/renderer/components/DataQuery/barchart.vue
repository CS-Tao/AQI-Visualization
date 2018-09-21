<template>
  <div>
    <div :class="isClick?'barchart':'ll'" id="barchart"></div>
    <div v-if="isClick" class="ave">
      <avgnumber :date="date" :city="city" :average="average"></avgnumber>
    </div>
    <div v-if="!isClick" class="calen">
      <calenchart :date="date" :cityname="cityname" :city="city"></calenchart>
    </div>
    <div v-if="!isClick" class="mo">
      <motochart :date="date" :city="city"></motochart>
    </div>
    <div class="ranklistquery">
      <ranklist @row-clicked="rankclick"></ranklist>
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
import ranklist from '@/components/DataQuery/ranklist'
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
    motochart,
    ranklist
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
              text: datestr + ' 全国污染最严重的 ' + response.data['city'].length + ' 个城市',
              x: 'center',
              textStyle: {
                color: titleColor
              }
            },
            tooltip: {
              trigger: 'axis',
              backgroundColor: 'rgba(7, 39, 77, 0.3)',
              borderWidth: 1,
              borderColor: '#5287c4',
              padding: 10,
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
              y: '13%',
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
                },
                grid: response.data['city'].length
              },
              axisLabel: {
                textStyle: {
                  color: titleColor
                },
                interval: 0
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
          this.$triggerResize()
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
    },
    rankclick (data) {
      this.$store.dispatch('setMapCenterLat', data.lat)
      this.$store.dispatch('setMapCenterLng', data.lng)
      this.cityname = data.cityName
      this.city = data.cityId
      this.isClick = false
      this.$triggerResize()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';

.barchart{
  height: 25vh;
  width:82vw;
}
.ll{
  height: 25vh;
  width:30vw;
}
.ave{
  bottom: $layout-footer-height + 4.85vw;
  right:calc(15px + 2.7vw);
  position: fixed;
  cursor: default !important;
}
.calen{
  top:70vh;
  left:30vw;
  width: 52vw;
  height: 25vh;
  position: fixed;
}
.mo{
  top:69vh;
  left:80.6vw;
  width: 20vw;
  height: 20vh;
  position: fixed;
}
.ranklistquery{
  position: fixed;
  top: calc(100/1920*111vw + 20px);
  right: 15px;
  overflow: hidden;
}
</style>
