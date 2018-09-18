<template>
  <div id="viewDiv"></div>
</template>

<script>
import { loadModules } from 'esri-loader'
import { mapGetters } from 'vuex'
import mapview3dApi from '@/api/mapview3d.api'

export default {
  data () {
    return {
      mapView: null
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
        'esri/views/MapView',
        'esri/WebMap',
        'esri/widgets/Search',
        'esri/widgets/Locate'
      ], options).then(
        ([
          MapView,
          WebMap,
          Search,
          Locate
        ]) => {
          let webmap = new WebMap({
            portalItem: { id: '84c291b9ae4949819fb647d723590916' }
          })
          this.mapView = new MapView({
            map: webmap,
            container: 'viewDiv',
            popup: {
              dockEnabled: false,
              dockOptions: {
                buttonEnabled: false,
                position: 'bottom-left',
                breakpoint: false
              }
            }
          })
          var searchWidget = new Search({
            view: this.mapView
          })
          var locateBtn = new Locate({
            view: this.mapView
          })
          this.mapView.ui.add(searchWidget, {
            position: 'top-right'
          })
          this.mapView.ui.add(locateBtn, {
            position: 'top-left'
          })
          if (this.selectedDateStr) {
            mapview3dApi.getAllDataInDay(this.selectedDateStr).then(respose => {
              this.addPoints(respose.data)
            }).catch(err => {
              console.error(err)
              this.$store.dispatch('setMainViewLoadingStatus', false)
            })
          }
        }
      ).catch(err => {
        console.error(err)
        this.$store.dispatch('setMainViewLoadingStatus', false)
      })
    },
    addPoints (data) {
      loadModules(['esri/Graphic', 'dojo/domReady!']).then(([Graphic]) => {
        this.$store.dispatch('setMainViewLoadingStatus', true)
        var pointGraphics = []
        for (var i = 0; i < data.length; i++) {
          let color = [255, 255, 255, 0.3]
          let outlineWidth = 0.5
          let outlineColor = [255, 255, 255, 0.75]
          let size = data[i].value[0] / 15
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
          let point = {
            type: 'point', // autocasts as new Point()
            longitude: lng,
            latitude: lat
          }
          // Create a symbol for drawing the point
          let markerSymbol = {
            type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
            color: color,
            size: size,
            outline: {
              // autocasts as new SimpleLineSymbol()
              color: outlineColor,
              width: outlineWidth
            }
          }
          // Create a graphic and add the geometry and symbol to it
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
          pointGraphics.push(pointGraphic)
        }
        this.mapView.graphics = []
        this.mapView.graphics.addMany(pointGraphics)
        this.$store.dispatch('setMainViewLoadingStatus', false)
      }).catch(err => {
        console.error(err)
        this.$store.dispatch('setMainViewLoadingStatus', false)
      })
    },
    reAddPoints (data) {
      if (this.selectedDateStr) {
        mapview3dApi.getAllDataInDay(this.selectedDateStr).then(respose => {
          this.addPoints(respose.data)
        }).catch(err => {
          console.error(err)
          this.$store.dispatch('setMainViewLoadingStatus', false)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#viewDiv {
  width: 100%;
  height: 100%;
}
</style>
