 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}">
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'
const lineColor = '#f3f4f5'
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'lines'
    },

    id: {
      type: String,
      default: 'lines'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    xaxis: {
      type: Array,
      default: function () {
        return ['2015']
      }
    },
    sseries: {
      type: Array,
      default: function () {
        return [
          {
            name: '',
            data: [0]
          }
        ]
      }
    }
  },

  data () {
    return {
      chart: null,
      temp: []
    }
  },

  mounted () {
    this.initChart()
  },

  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    datafix () {
      this.temp.splice(0, this.temp.length)
      for (let i = 0; i < this.sseries.length; i++) {
        if (this.sseries[i].data.length === this.xaxis.length) {
          var m = {name: this.sseries[i].name, type: 'line', data: this.sseries[i].data}
          this.temp.push(m)
        }
      }
    },
    initChart () {
      // console.log('temp.data', this.temp.data)
      this.datafix()
      this.chart = echarts.init(document.getElementById(this.id))
      var option = {
        title: {
          text: ' ',
          left: 'center',
          textStyle: {
            color: lineColor
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.sseries.name,
          textStyle: {
            color: lineColor
          }
        },
        grid: {
          bordercolor: 'rgba(0,0,0,0)',
          borderwide: 1
        },
        xAxis: {
          ype: 'category',
          boundaryGap: true,
          data: this.xaxis,
          axisLabel: {
            show: true,
            textStyle: {
              color: lineColor
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: lineColor
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: this.height / 20
        },
        series: this.temp
      }
      this.chart.clear()
      this.chart.setOption(option)
      this.chart.on('mouseover', (params) => {
        // 控制台打印数据的名称
        let avery = 0
        for (let i = 0; i < this.temp.length; i++) {
          avery += this.temp[i].data[params.dataIndex]
        }
        avery = avery / this.temp.length
        this.$emit('sendavery', avery)
        // console.log(avery)
        return avery
      })
    }
  },
  watch: {
    xaxis () {
      // console.log('aa')
      this.initChart()
    },
    sseries () {
      this.initChart()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
