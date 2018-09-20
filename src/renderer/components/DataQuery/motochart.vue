<template>
  <div class="moto" id="moto"></div>
</template>

<script>
import echarts from 'echarts'
import { getIndex3 } from '@/api/dataQuery.api'
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
    }
  },
  components: {
  },
  mounted () {
    this.showMoto(this.date, this.city)
  },
  watch: {
    city () {
      this.showMoto(this.date, this.city)
    }
  },
  methods: {
    showMoto (datestr, citynumber) {
      getIndex3(
        'json',
        citynumber,
        datestr.substring(0, 4)
      ).then(response => {
        this.chart = echarts.init(document.getElementById('moto'))
        var motoOption = {
          // backgroundColor: '#1b1b1b',
          tooltip: {
            formatter: '{a} <br/>{c} {b}'
          },
          series: [
            {
              name: 'aqi',
              type: 'gauge',
              min: 0,
              max: 200,
              splitNumber: 5,
              radius: '80%',
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  // color: [[0.25, 'lime'], [0.5, '#1e90ff'], [1, '#ff4500']],
                  color: [[0.2, 'lime'], [0.4, '#1e90ff'], [0.8, '#aa0'], [1, '#ff4500']],
                  width: 2,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              axisLabel: {
                // 坐标轴小标记
                textStyle: {
                  // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 10, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3,
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 1
                }
              },
              pointer: {
                // 分隔线
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5
              },
              title: {
                offsetCenter: [0, '-10%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontSize: this.width / 30,
                  fontStyle: 'italic',
                  color: '#eee',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 2
                }
              },
              detail: {
                backgroundColor: 'rgba(100,166,100,0.2)',
                borderWidth: 0,
                borderColor: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  color: '#fff'
                }
              },
              data: [{ value: parseInt(response.data['aqi']), name: 'AQI' }]
            },
            {
              name: 'pm2.5',
              type: 'gauge',
              center: ['18%', '55%'], // 默认全局居中
              radius: '50%',
              min: 0,
              max: 100,
              endAngle: 45,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  // color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
                  color: [[0.2, 'lime'], [0.4, '#1e90ff'], [0.8, '#aa0'], [1, '#ff4500']],
                  width: 2,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              axisLabel: {
                // 坐标轴小标记
                textStyle: {
                  // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                },
                formatter: function (v) {
                  switch (v + '') {
                    case '0':
                      return '0'
                    case '50':
                      return '50'
                    case '100':
                      return '100'
                  }
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 10, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3,
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 10
                }
              },
              pointer: {
                width: 5,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5
              },
              title: {
                offsetCenter: [0, '-10%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontStyle: 'italic',
                  color: titleColor,
                  // shadowColor: '#fff', // 默认透明
                  shadowBlur: 0
                }
              },
              detail: {
                backgroundColor: 'rgba(100,166,100,0.2)',
                borderWidth: 0,
                borderColor: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 80,
                height: 20,
                offsetCenter: [20, '50%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  color: '#fff'
                }
              },
              data: [{ value: parseInt(response.data['pm25']), name: 'PM2.5' }]
            },
            {
              name: 'so2',
              type: 'gauge',
              center: ['82%', '55%'], // 默认全局居中
              radius: '50%',
              min: 0,
              max: 100,
              startAngle: 135,
              // endAngle:45,
              splitNumber: 4,
              axisLine: {
                // 坐标轴线
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  // color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                  color: [[0.2, 'lime'], [0.4, '#1e90ff'], [0.8, '#aa0'], [1, '#ff4500']],
                  width: 2,
                  // shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              axisTick: {
                // 坐标轴小标记
                length: 10, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle控制线条样式
                  color: 'auto',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                }
              },
              axisLabel: {
                textStyle: {
                  // 属性lineStyle控制线条样式
                  fontWeight: 'bolder',
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 8
                },
                formatter: function (v) {
                  switch (v + '') {
                    case '0':
                      return '0'
                    case '50':
                      return '50'
                    case '100':
                      return '100'
                  }
                }
              },
              splitLine: {
                // 分隔线
                length: 15, // 属性length控制线长
                lineStyle: {
                  // 属性lineStyle（详见lineStyle）控制线条样式
                  width: 3,
                  color: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 1
                }
              },
              pointer: {
                width: 2,
                shadowColor: '#fff', // 默认透明
                shadowBlur: 2
              },
              title: {
                offsetCenter: [0, '-10%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  fontStyle: 'italic',
                  color: titleColor,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 2
                }
              },
              detail: {
                backgroundColor: 'rgba(100,166,100,0.2)',
                borderWidth: 0,
                borderColor: '#fff',
                shadowColor: '#fff', // 默认透明
                shadowBlur: 5,
                width: 80,
                height: 30,
                offsetCenter: [-20, '50%'], // x, y，单位px
                textStyle: {
                  // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  fontWeight: 'bolder',
                  color: '#fff'
                }
              },
              data: [{ value: parseInt(response.data['so2']), name: 'SO2' }]
            }
          ]
        }
        this.chart.setOption(motoOption)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.moto {
  width: 20vw;
  height: 20vh;
}
</style>
