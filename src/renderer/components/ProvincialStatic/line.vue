 <template>
  <div :class="className"
   :id="id" 
   :style="{height:height,width:width}" :num="num">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
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
      default: '700px'
    },
    height: {
      type: String,
      default: '300px'
    },
    xaxis: {
      type: Array,
      default: ['2012', '2013', '2014', '2015', '2016', '2017', '2018']
    },
    sseries: {
      type: Array,
      default: [
        {
          name: '武汉',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '宜昌',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '荆州',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: '仙桃',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '十堰',
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
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
    initChart () {
      this.chart = echarts.init(document.getElementById(this.id))
      var option = {
        title: {
          text: '主要城市污染'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.sseries.name
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
          data: this.xaxis
        },
        yAxis: {
          type: 'value'
        },
        series: this.sseries
      }
      this.chart.setOption(option)
      this.chart.on('click'/* 'mouseover' */, function (params) {
        // 控制台打印数据的名称
        alert(params.dataIndex)
      })
    }
  },

  watch: {
    data (newData, oldData) {
      this.initChart()
    },
    num (newData, oldData) {
      this.initChart()
    }
  }
}
</script>
<style lang="scss" scoped>

</style>