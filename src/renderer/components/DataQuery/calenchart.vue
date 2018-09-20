<template>
  <div class="calender" id="calender"></div>
</template>

<script>
import echarts from 'echarts'
import { getCalender } from '@/api/dataQuery.api'
import resize from '@/components/Utils/ChartResize'
const titleColor = '#f3f4f5'
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
    },
    cityname: {
      type: String,
      required: true
    }
  },
  components: {
  },
  watch: {
    city () {
      this.showCalen(this.date, this.city, this.cityname)
    }
  },
  mounted () {
    this.showCalen(this.date, this.city, this.cityname)
  },
  methods: {
    showCalen (datestr, citynumber, cityname) {
      this.chart = echarts.init(document.getElementById('calender'))
      getCalender(
        'json',
        citynumber,
        datestr.substring(0, 4)
      ).then(response => {
        var current = []
        for (var i = 0; i < response.data.length; i++) {
          if (response.data[i][0] === this.date) {
            current.push(response.data[i])
          } else {
            current.push([response.data[i][0], 0])
          }
        }
        var calenderOption = {
          title: {
            // top: 30,
            text: cityname + '全年空气污染情况',
            left: 'center',
            textStyle: {
              color: titleColor
            }
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '11%',
            left: 'center',
            data: ['Aqi', 'Aqi Top 10', '当前选中'],
            textStyle: {
              color: titleColor
            }
          },
          calendar: {
            width: '96%',
            height: '60%',
            top: '30%',
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
              name: 'Aqi',
              type: 'scatter',
              coordinateSystem: 'calendar',
              data: response.data,
              symbolSize: function (val) {
                return val[1] / 24
              },
              itemStyle: {
                normal: {
                  color: '#ddb926'
                }
              }
            },
            {
              name: 'Aqi Top 10',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: response.data
                .sort(function (a, b) {
                  return b[1] - a[1]
                })
                .slice(0, 10),
              symbolSize: function (val) {
                return val[1] / 24
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
            },
            {
              name: '当前选中',
              type: 'effectScatter',
              coordinateSystem: 'calendar',
              data: current,
              symbolSize: function (val) {
                return val[1] / 15
              },
              itemStyle: {
                normal: {
                  color: '#5287c4'
                }
              }
            }
          ]
        }
        this.chart.setOption(calenderOption)
        this.chart.on('click', (params) => {
          // 获得了城市名称
          this.$store.dispatch('setSelectedDate', params.data[0])
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.calender {
  width: 52vw;
  height: 25vh;
}
</style>
