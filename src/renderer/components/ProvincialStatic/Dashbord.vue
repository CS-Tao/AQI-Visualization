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
      default: 'chart'
    },
    id: {
      type: String,
      default: 'Dashbord'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    num: {
      type: Array,
      default: () => {
        return [30, '2014']
      }
    },
    province: {
      type: String,
      default: ''
    },
    ttitle: {
      type: String,
      default: '年平均指数'
    }
  },

  data () {
    return {
      chart: null,
      chartdata: [],
      msize: window.innerWidth
    }
  },

  mounted () {
    this.initChart()
    window.onresize = () => {
      if (window.innerWidth !== this.msize) {
        this.msize = window.innerWidth
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
    initChart () {
      var ssize = window.innerWidth
      var m1 = this.num[0].toFixed(2)
      var m2 = this.num[1] + this.province + this.ttitle
      this.chartdata = [{value: m1, name: this.ttitle}]
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          formatter: this.province + this.num[1] + '{b} AQI: {c}'
        },
        series: [
          {
            name: '',
            type: 'gauge',
            min: 0,
            max: 250,
            splitNumber: 5,
            radius: '95%',
            textStyle: {
              fontSize: ssize / 100
            },
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.2, 'lime'], [0.4, '#1e90ff'], [0.8, '#aa0'], [1, '#ff4500']],
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 8
              }
            },
            axisLabel: { // 坐标轴小标记
              textStyle: { // 属性lineStyle控制线条样式
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 8,
                fontSize: ssize / 150
              }
            },
            axisTick: { // 坐标轴小标记
              length: ssize / 150, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 8
              }
            },
            splitLine: { // 分隔线
              length: ssize / 100, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
                color: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
              }
            },
            pointer: { // 分隔线
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5
            },
            title: {
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                fontSize: ssize / 120,
                fontStyle: 'italic',
                color: '#eee',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10,
                text: m2
              }
            },
            detail: {
              backgroundColor: 'rgba(100,166,100,0.2)',
              borderWidth: 0,
              borderColor: '#fff',
              shadowColor: '#fff', // 默认透明
              shadowBlur: 5,
              offsetCenter: [0, '50%'], // x, y，单位px
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontWeight: 'bolder',
                color: '#fff',
                fontSize: ssize / 120
              }
            },
            // detail: {formatter: '{value}%'},
            data: this.chartdata
          }
        ]
      })
      // this.$triggerResize()
    }
  },

  watch: {
    num (newData, oldData) {
      this.initChart()
    },
    msize () {
      this.initChart()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
