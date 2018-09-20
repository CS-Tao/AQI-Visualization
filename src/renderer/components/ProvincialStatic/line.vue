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
    },
    province: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      chart: null,
      temp: [],
      mposition: -1,
      msize: window.innerWidth
    }
  },

  mounted () {
    this.initChart()
    window.onresize = () => {
      if (window.innerWidth !== this.msize) {
        this.msize = window.innerWidth
        this.initChart()
      }
    }
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
      // var ssize = window.innerWidth
      // this.msize = window.innerWidth
      this.datafix()
      this.chart = echarts.init(document.getElementById(this.id), 'light')
      var option = {
        title: {
          text: this.xaxis[0] + '-' + this.xaxis[this.xaxis.length - 1] + this.province + '各地方AQI年变化折线图',
          left: 'center',
          textStyle: {
            color: lineColor
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(7, 39, 77, 0.3)',
          borderWidth: 1,
          borderColor: '#5287c4',
          padding: 10,
          textStyle: {
            color: lineColor
          },
          position: (pos, params, el, elRect, size) => {
            // console.log('params:', params)
            if (this.mposition !== params[0].dataIndex) {
              this.mposition = params[0].dataIndex
              let avery = 0
              for (let i = 0; i < this.temp.length; i++) {
                avery += this.temp[i].data[params[0].dataIndex]
              }
              avery = avery / this.temp.length
              var m = [avery, this.xaxis[params[0].dataIndex]]
              this.$emit('sendavery', m)
            }
          },
          extraCssText: 'width: 170px'
        },
        legend: {
          orient: 'vertical',
          align: 'right',
          type: 'scroll',
          right: '0%',
          top: '35',
          data: this.sseries.name,
          textStyle: {
            color: lineColor
          }
        },
        grid: {
          bordercolor: 'rgba(0,0,0,0)',
          borderwide: 1,
          top: '40',
          bottom: '22',
          left: '48',
          right: '80'
        },
        xAxis: {
          ype: 'category',
          boundaryGap: false,
          data: this.xaxis,
          axisLabel: {
            clickable: true,
            show: true,
            textStyle: {
              color: lineColor
            }
          },
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          },
          splitLine: {
            show: false,
            lineStyle: {
              // 使用深浅的间隔色
              color: ['#aaa', '#ddd']
            }
          }
        },
        yAxis: {
          type: 'value',
          min: 'dataMin',
          max: 'dataMax',
          axisLabel: {
            show: true,
            textStyle: {
              color: lineColor
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#999'
            }
          },
          splitNumber: this.msize / 300,
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          }
        },
        series: this.temp
      }
      this.chart.clear()
      this.chart.setOption(option)
      this.$triggerResize()
    }
  },
  watch: {
    xaxis () {
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
