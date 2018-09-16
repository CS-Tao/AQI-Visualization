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
      default: 'chart'
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
      type: Number,
      default: 30
    }
  },

  data () {
    return {
      chart: null
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
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      this.chart.setOption({
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        series: [
          {
            name: '0.0',
            type: 'gauge',
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: '95%',
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
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
                shadowBlur: 8
              }
            },
            axisTick: { // 坐标轴小标记
              length: 10, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
                color: 'auto',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 8
              }
            },
            splitLine: { // 分隔线
              length: 15, // 属性length控制线长
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
                fontSize: 15,
                fontStyle: 'italic',
                color: '#eee',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 10
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
                color: '#fff'
              }
            },
            // detail: {formatter: '{value}%'},
            data: [{value: this.num, name: '污染'}]
          }
        ]
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
