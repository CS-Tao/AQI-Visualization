 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" :num="num">
  </div>
</template>

<script>
import echarts from 'echarts'
import resize from '@/components/Utils/ChartResize'
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
      default: ['2015', '2016', '2017', '2018']
    },
    sseries: {
      type: Array,
      default: [
        {
          name: '武汉',
          data: [60, 90, 100, 180]
        },
        {
          name: '宜昌',
          data: [55, 88, 96, 150]
        },
        {
          name: '荆州',
          data: [50, 85, 100, 160]
        },
        {
          name: '仙桃',
          data: [51, 70, 103, 170]
        },
        {
          name: '十堰',
          data: [52, 60, 102, 166]
        }
      ]
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
      for (let i = 0; i < this.sseries.length; i++) {
        if (this.sseries[i].data.length > 0) {
          var m = {name: this.sseries[i].name, type: 'line', data: this.sseries[i].data}
          this.temp.push(m)
        }
      }
    },
    initChart () {
      this.datafix()
      this.chart = echarts.init(document.getElementById(this.id))
      var option = {
        title: {
          text: '主要城市污染',
          textStyle: {
            color: '#bbf'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.sseries.name,
          textStyle: {
            color: '#bbf'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          ype: 'category',
          boundaryGap: true,
          data: this.xaxis,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#bbf'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              color: '#bbf'
            }
          }
        },
        series: this.temp
      }
      this.chart.setOption(option)
      this.chart.on('mouseover', (params) => {
        // 控制台打印数据的名称
        let avery = 0
        for (let i = 0; i < this.sseries.length; i++) {
          avery += this.sseries[i].data[params.dataIndex]
        }
        avery = avery / this.sseries.length
        this.$emit('sendavery', avery)
        return avery
      })
    }
  },

  watch: {
    num (newData, oldData) {
      this.initChart()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>