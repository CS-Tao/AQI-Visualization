<template>
  <div class="querycontainer">
    <div class="choosedate">
      <el-date-picker class="date" v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
      <button class="choose-btn" @click="queryTop10">选择</button>
      </div>
      <div class="barchart" id="barchart"></div>
      <div class="average" id="average"></div>
    <div class="moto" id="moto"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getTop10, getCalender, getIndex3 } from '@/api/dataQuery.api'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    queryTop10 () {
      var latlng = []
      var cityid = []
      if (this.value === '') {
        return
      }
      var myChart = echarts.init(document.getElementById('barchart'))
      getTop10(
        'json', this.value
      ).then(response => {
        // alert(JSON.stringify(response.data.data))
        latlng = response.data['latlng']
        cityid = response.data['cityId']
        var option = {
          title: {
            text: this.value + '污染情况',
            x: 'center',
            textStyle: {
              color: '#3989E3'
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
              color: '#3989E3'
            }
          },
          legend: {
            data: ['AQI', 'SO2', '粉尘'],
            y: '15%',
            textStyle: {
              color: '#3989E3'
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
                color: '#3989E3'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#3989E3'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#3989E3'
              }
            },
            axisLabel: {
              textStyle: {
                color: '#3989E3'
              }
            }
          },
          series: [
            {
              name: 'AQI',
              type: 'bar',
              data: response.data['aqi'],
              color: '#5092D6'
            },
            {
              name: 'SO2',
              type: 'bar',
              stack: '广告',
              data: response.data['pm25'],
              color: '#002156'
            },
            {
              name: '粉尘',
              type: 'bar',
              data: response.data['so2'],
              color: '#B3BAC6'
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
        document.getElementById('average').innerText = JSON.stringify(
          response.data['average']
        )
      })
      myChart.on('click', (params) => {
        // 获得了城市名称
        this.$store.dispatch('setMapCenterLat', latlng[params.dataIndex][0])
        this.$store.dispatch('setMapCenterLng', latlng[params.dataIndex][1])
        var city = cityid[params.dataIndex].toString()
        var year = this.value.substring(0, 4)
        // document.getElementById('average').innerText = ''
        var calenderChart = echarts.init(document.getElementById('average'))
        getCalender(
          'json',
          city,
          year
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
                  return val[1] / 50
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
                  return val[1] / 50
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
          calenderChart.setOption(calenderOption)
        })
        getIndex3(
          'json',
          city,
          year
        ).then(response => {
          var motoChart = echarts.init(document.getElementById('moto'))
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
                splitNumber: 10,
                radius: '80%',
                axisLine: {
                  // 坐标轴线
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: [[0.25, 'lime'], [0.5, '#1e90ff'], [1, '#ff4500']],
                    width: 3,
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                axisLabel: {
                  // 坐标轴小标记
                  textStyle: {
                    // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 0
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  length: 15, // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                splitLine: {
                  // 分隔线
                  length: 25, // 属性length控制线长
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
                  textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 2
                  }
                },
                detail: {
                  backgroundColor: 'rgba(30,144,255,0.8)',
                  borderWidth: 1,
                  borderColor: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 0,
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
                name: 'SO2',
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
                    color: [[0.29, 'lime'], [0.86, '#1e90ff'], [1, '#ff4500']],
                    width: 2,
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                axisLabel: {
                  // 坐标轴小标记
                  textStyle: {
                    // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  length: 12, // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                splitLine: {
                  // 分隔线
                  length: 20, // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 3,
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                pointer: {
                  width: 5,
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 2
                },
                title: {
                  offsetCenter: [0, '-30%'], // x, y，单位px
                  textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 2
                  }
                },
                detail: {
                  // backgroundColor: 'rgba(30,144,255,0.8)',
                  // borderWidth: 1,
                  borderColor: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 0,
                  width: 80,
                  height: 30,
                  offsetCenter: [25, '20%'], // x, y，单位px
                  textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                  }
                },
                data: [{ value: parseInt(response.data['pm25']), name: 'PM2.5' }]
              },
              {
                name: '粉尘',
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
                    color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                    width: 2,
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                axisTick: {
                  // 坐标轴小标记
                  length: 12, // 属性length控制线长
                  lineStyle: {
                    // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  }
                },
                axisLabel: {
                  textStyle: {
                    // 属性lineStyle控制线条样式
                    fontWeight: 'bolder',
                    color: '#fff',
                    shadowColor: '#fff', // 默认透明
                    shadowBlur: 3
                  },
                  formatter: function (v) {
                    switch (v + '') {
                      case '0':
                        return 'Low'
                      case '50':
                        return 'Mid'
                      case '100':
                        return 'High'
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
                  show: false
                },
                /*
                detail: {
                  borderColor: '#fff',
                  shadowColor: '#fff', // 默认透明
                  shadowBlur: 0,
                  width: 80,
                  height: 30,
                  offsetCenter: [-25, '20%'], // x, y，单位px
                  textStyle: {
                    // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                  }
                }, */
                data: [{ value: parseInt(response.data['so2']), name: 'SO2' }]
              }
            ]
          }
          motoChart.setOption(motoOption)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.querycontainer {
  position: absolute;
  top: 15vh;
  bottom: 0vh;
  left: 7vw;
  width: 30vw;
  overflow: hidden;
  background-color: #00103b;
  .choosedate {
    width: 30vw;
    height: 32px;
    position: relative;
    .date {
      width: 90%;
      float: left;
    }
    .choose-btn {
      width: 10%;
      height: 32px;
      float: left;
    }
  }
  .barchart {
    width: 30vw;
    height: 30vh;
    position: relative;
  }
  .average {
    margin-top: 2vh;
    width: 30vw;
    height: 20vh;
    font-family: "DS-Digital";
    font-size: 100px;
    color: #b3bac6;
    text-align: center;
    line-height: 30vh;
    position: relative;
  }
  .moto {
    width: 30vw;
    height: 30vh;
  }
}
</style>
