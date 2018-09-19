<template>
  <div class="chartpanel">
    <div class="average" id="average"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getCalender } from '@/api/dataQuery.api'
import resize from '@/components/Utils/ChartResize'
export default {
  mixins: [resize],
  props: {
    date: {
      type: String,
      required: true,
      chart: null
    },
    city: {
      type: Number,
      required: true
    }
  },
  components: {
  },
  watch: {
    city () {
      this.showCalen(this.date, this.city)
    }
  },
  mounted () {
    this.showCalen(this.date, this.city)
  },
  methods: {
    showCalen (datestr, citynumber) {
      this.chart = echarts.init(document.getElementById('average'))
      getCalender(
        'json',
        citynumber,
        datestr.substring(0, 4)
      ).then(response => {
        var calenderOption = {
          title: {
            // top: 30,
            text: '空气污染',
            left: 'center',
            textStyle: {
              color: '#3989E3'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '15%',
            left: 'center',
            data: ['aqi', 'Top 10'],
            textStyle: {
              color: '#3989E3'
            }
          },
          calendar: {
            width: '96%',
            height: '50%',
            top: '45%',
            left: 'center',
            range: [response.data[0][0].substring(0, 4) + '-01-01', response.data[0][0].substring(0, 4) + '-12-31'],
            splitLine: {
              show: true,
              lineStyle: {
                color: '#000',
                // width: 4,
                type: 'solid'
              }
            },
            /* yearLabel: {
                // formatter: '{start}  1st',
                textStyle: {
                  color: '#fff'
                }
              }, */
            itemStyle: {
              normal: {
                color: '#323c48',
                borderWidth: 1,
                borderColor: '#111'
              }
            }
          },
          series: [
            {
              name: 'aqi',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: response.data,
              symbolSize: function (val) {
                return val[1] / 40
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: 'Top 10',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: response.data
                .sort(function (a, b) {
                  return b[1] - a[1]
                })
                .slice(0, 10),
              symbolSize: function (val) {
                return val[1] / 40
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              itemStyle: {
                normal: {
                  color: '#f4e925',
                  shadowBlur: 10,
                  shadowColor: '#333'
                }
              },
              zlevel: 1
            }
          ]
        }
        this.chart.setOption(calenderOption)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.chartpanel{
  width:30vw;
  .average {
    margin-top: 2vh;
    width: 30vw;
    height: 20vh;
    font-size: 100px;
    color: #b3bac6;
    text-align: center;
    line-height: 30vh;
    position: relative;
  }
}
</style>
