<template>
  <div>
    <div id="viewDiv" class="scene"></div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'
import { mapGetters } from 'vuex'
import mapview3dApi from '@/api/mapview3d.api'

export default {
  data () {
    return {
      sceneView: null,
      map: null
    }
  },
  computed: {
    ...mapGetters([
      'selectedDateStr',
      'setMainViewLoadingStatus'
    ])
  },
  watch: {
    selectedDateStr () {
      this.reAddPoints()
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    initMap () {
      const options = {
        url: 'https://js.arcgis.com/4.6/'
      }
      loadModules([
        'esri/views/SceneView',
        'esri/WebScene',
        'esri/widgets/Search',
        'esri/widgets/Home',
        'esri/widgets/Locate'
      ], options).then(
        ([
          SceneView,
          WebScene,
          Search,
          Home,
          Locate
        ]) => {
          this.$store.dispatch('setMainViewLoadingStatus', true)
          this.map = new WebScene({
            portalItem: {
              id: 'c1c65ac29660409a95805eab4b276f13'
            }
          })
          this.sceneView = new SceneView({
            container: 'viewDiv',
            map: this.map,
            alphaCompositingEnabled: true,
            environment: {
              background: {
                type: 'color',
                color: [255, 252, 244, 0]
              },
              starsEnabled: false,
              atmosphereEnabled: false
            },
            camera: {
              position: {
                x: 108,
                y: 33,
                z: 10000000
              },
              heading: 0,
              tilt: 0
            },
            popup: {
              dockEnabled: true,
              dockOptions: {
                buttonEnabled: true,
                position: 'top-right',
                breakpoint: false
              }
            }
          })
          var searchWidget = new Search({
            view: this.sceneView
          })
          var homeWidget = new Home({
            view: this.sceneView
          })
          var locateBtn = new Locate({
            view: this.sceneView
          })
          this.sceneView.ui.add(searchWidget, {
            position: 'top-right'
          })
          this.sceneView.ui.add(homeWidget, {
            position: 'top-left'
          })
          this.sceneView.ui.add(locateBtn, {
            position: 'top-left'
          })
          this.reAddPoints()
        }
      ).catch(err => {
        console.error(err)
        this.$store.dispatch('setMainViewLoadingStatus', false)
      })
    },
    reAddPoints () {
      if (this.selectedDateStr) {
        loadModules([
          'esri/Graphic',
          'esri/layers/GraphicsLayer',
          'dojo/domReady!'
        ]).then(
          ([
            Graphic,
            GraphicsLayer
          ]) => {
            this.$store.dispatch('setMainViewLoadingStatus', true)
            mapview3dApi.getAllDataInDay(this.selectedDateStr).then(respose => {
              if (respose.status === 200) {
                var graphicsLayer = new GraphicsLayer()
                this.map.removeAll()
                this.map.add(graphicsLayer)
                let data = respose.data
                for (var i = 0; i < data.length; i++) {
                  let color = [255, 255, 255, 0.3]
                  let outlineWidth = 1
                  let outlineColor = [255, 255, 255, 0.75]
                  let size = data[i].value[0] / 10
                  let lng = data[i].position[0]
                  let lat = data[i].position[1]
                  let cityId = data[i].id
                  let cityName = data[i].name
                  let year = data[i].date.year
                  let month = data[i].date.month
                  let day = data[i].date.day
                  let aqiValue = data[i].value[0]
                  let pm25Value = data[i].value[1]
                  let pm10Value = data[i].value[2]
                  let coValue = data[i].value[3]
                  let no2Value = data[i].value[4]
                  let so2Value = data[i].value[5]
                  var point = {
                    type: 'point',
                    x: lng,
                    y: lat,
                    z: 0
                  }
                  var markerSymbol = {
                    type: 'simple-marker',
                    color: color,
                    size: size,
                    outline: {
                      color: outlineColor,
                      width: outlineWidth
                    }
                  }
                  let pointGraphic = new Graphic({
                    geometry: point,
                    symbol: markerSymbol,
                    attributes: {
                      cityId: cityId,
                      cityName: cityName,
                      year: year,
                      month: month,
                      day: day,
                      aqiValue: aqiValue,
                      pm25Value: pm25Value,
                      pm10Value: pm10Value,
                      coValue: coValue,
                      no2Value: no2Value,
                      so2Value: so2Value
                    },
                    popupTemplate: {
                      title:
                        "<font color='#008000'>&nbsp;&nbsp;{year}年{month}月{day}日&nbsp;&nbsp;&nbsp;{cityName}&nbsp;-&nbsp;空气污染情况",
                      content: [
                        {
                          type: 'fields',
                          fieldInfos: [
                            {
                              fieldName: 'aqiValue',
                              visible: true,
                              label: 'AQI'
                            },
                            {
                              fieldName: 'pm25Value',
                              visible: true,
                              label: 'PM2.5'
                            },
                            {
                              fieldName: 'pm10Value',
                              visible: true,
                              label: 'PM10'
                            },
                            {
                              fieldName: 'coValue',
                              visible: true,
                              label: 'CO'
                            },
                            {
                              fieldName: 'no2Value',
                              visible: true,
                              label: 'NO2'
                            },
                            {
                              fieldName: 'so2Value',
                              visible: true,
                              label: 'SO2'
                            }
                          ]
                        }
                      ]
                    },
                    outFields: ['*']
                  })
                  graphicsLayer.add(pointGraphic)
                }
                this.$store.dispatch('setMainViewLoadingStatus', false)
              } else {
                throw new Error('数据加载失败')
              }
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.message
              })
              this.$store.dispatch('setMainViewLoadingStatus', false)
            })
          }
        ).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
          this.$store.dispatch('setMainViewLoadingStatus', false)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  width: 100%;
  height: 100%;
}
</style>
