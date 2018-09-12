<template>
  <div class="querycontainer">
    <div class="choosedate">
        <el-date-picker class="date" v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        <button class="choose-btn" @click="queryTop10">选择</button>
    </div>
    <div class="barchart" id="barchart"></div>
    <div class="average" id="average"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import {getTop10, getCalender} from '@/api/dataQuery.api'
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    queryTop10 () {
      if (this.value === '') { return }
      getTop10({
        date: this.value
      })
        .then(response => {
          // alert(JSON.stringify(response.data.data))
          var myChart = echarts.init(document.getElementById('barchart'))

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
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
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
            xAxis:
              {
                type: 'category',
                data: response.data.data['省份'],
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
                data: response.data.data['aqi'],
                color: '#5092D6'
              },
              {
                name: 'SO2',
                type: 'bar',
                stack: '广告',
                data: response.data.data['so2'],
                color: '#002156'
              },
              {
                name: '粉尘',
                type: 'bar',
                data: response.data.data['粉尘'],
                color: '#B3BAC6'
              }
            ]
          }
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option)
          document.getElementById('average').innerText = JSON.stringify(response.data.data['average'])
          myChart.on('click', function (params) {
            // 获得了城市名称
            document.getElementById('average').innerText = ''
            var calenderChart = echarts.init(document.getElementById('average'))
            getCalender({
              date: params.name
            }).then(response => {
              var calenderOption = {
                title: {
                  // top: 30,
                  text: '2016年某人每天的步数',
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
                  data: ['步数', 'Top 12'],
                  textStyle: {
                    color: '#3989E3'
                  }
                },
                calendar: {
                  top: '35%',
                  left: 'center',
                  range: response.data.data['range'],
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: '#000',
                      // width: 4,
                      type: 'solid'
                    }
                  },
                  yearLabel: {
                    // formatter: '{start}  1st',
                    textStyle: {
                      color: '#fff'
                    }
                  },
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
                    name: '步数',
                    type: 'scatter',
                    coordinateSystem: 'calendar',
                    data: response.data.data['data'],
                    symbolSize: function (val) {
                      return val[1]
                    },
                    itemStyle: {
                      normal: {
                        color: '#ddb926'
                      }
                    }
                  },
                  {
                    name: 'Top 12',
                    type: 'effectScatter',
                    coordinateSystem: 'calendar',
                    data: response.data.data['data'].sort(function (a, b) {
                      return b[1] - a[1]
                    }).slice(0, 2),
                    symbolSize: function (val) {
                      return val[1]
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
    left: 7vw;
    width: 30vw;
    .choosedate{
        width: 100%;
        height: 32px;
        position: relative;
        .date{
            width: 90%;
            float: left;
            }
        .choose-btn{
            width: 10%;
            height: 32px;
            float: left;
            }
        }
        .barchart{
        width: 100%;
        height: 30vh;
        position: relative;
        background-color: #00103B;
        }
    .average{
        width: 100%;
        height: 30vh;
        font-family: 'DS-Digital';
        font-size: 100px;
        color: #B3BAC6;
        text-align: center;
        line-height: 30vh;
        position: relative;
        background-color: #00103B;
    }
    
  }
</style>
