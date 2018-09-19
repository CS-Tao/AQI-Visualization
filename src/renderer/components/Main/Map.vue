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
      mapView: null,
      pointGraphics: [],
      centerPointGraphic: null
    }
  },
  computed: {
    ...mapGetters([
      'selectedDateStr',
      'setMainViewLoadingStatus',
      'mapCenterLat',
      'mapCenterLng'
    ])
  },
  watch: {
    selectedDateStr () {
      this.reAddPoints()
    },
    mapCenterLat () {
      this.setMapCenter(this.mapCenterLat, this.mapCenterLng)
    },
    mapCenterLng () {
      this.setMapCenter(this.mapCenterLat, this.mapCenterLng)
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
        'esri/widgets/Home',
        'esri/widgets/Locate'
      ], options).then(
        ([
          MapView,
          WebMap,
          Home,
          Locate
        ]) => {
          let webmap = new WebMap({
            portalItem: { id: '883df56b63464f34b7924b5dbf7a9550' }
          })
          this.mapView = new MapView({
            map: webmap,
            container: 'viewDiv',
            popup: {
              dockEnabled: true,
              dockOptions: {
                buttonEnabled: true,
                position: 'top-right',
                breakpoint: false
              }
            }
          })
          var homeWidget = new Home({
            view: this.mapView
          })
          var locateBtn = new Locate({
            view: this.mapView
          })
          this.mapView.ui.add(homeWidget, {
            position: 'top-left'
          })
          this.mapView.ui.add(locateBtn, {
            position: 'top-left'
          })
          this.mapView.on('click', event => { this.mapClicked(event) })
          if (this.selectedDateStr) {
            mapview3dApi.getAllDataInDay(this.selectedDateStr).then(respose => {
              if (respose.status === 200) {
                this.addPoints(respose.data)
              } else {
                throw new Error('数据加载失败')
              }
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
        this.mapView.graphics.removeMany(this.pointGraphics)
        this.pointGraphics = []
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
          let level = data[i].level
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
              cityId,
              cityName,
              year,
              month,
              day,
              aqiValue,
              pm25Value,
              pm10Value,
              coValue,
              no2Value,
              so2Value,
              level
            },
            popupTemplate: {
              title:
                  "<font color='#00a000'>&nbsp;&nbsp;{year}年{month}月{day}日&nbsp;&nbsp;&nbsp;{cityName}&nbsp;-&nbsp;空气污染情况",
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
                    },
                    {
                      fieldName: 'level',
                      visible: true,
                      label: '等级'
                    }
                  ]
                }
              ]
            },
            outFields: ['*']
          })
          this.pointGraphics.push(pointGraphic)
        }
        this.mapView.graphics.addMany(this.pointGraphics)
        this.$store.dispatch('setMainViewLoadingStatus', false)
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message
        })
        this.$store.dispatch('setMainViewLoadingStatus', false)
      })
    },
    reAddPoints () {
      if (this.selectedDateStr) {
        mapview3dApi.getAllDataInDay(this.selectedDateStr).then(respose => {
          if (respose.status === 200) { this.addPoints(respose.data) } else { throw new Error('数据加载失败') }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
          this.$store.dispatch('setMainViewLoadingStatus', false)
        })
      }
    },
    setMapCenter (lat, lng) {
      if (lng !== null && lat !== null) {
        loadModules(['esri/Graphic', 'dojo/domReady!']).then(([Graphic]) => {
          let markerSymbol = {
            type: 'simple-marker',
            color: '#a00',
            size: 10,
            outline: {
              color: 'white',
              width: 1
            }
          }
          let point = {
            type: 'point',
            longitude: lng,
            latitude: lat
          }
          if (this.centerPointGraphic && this.mapView.graphics.includes(this.centerPointGraphic)) {
            this.mapView.graphics.remove(this.centerPointGraphic)
          }
          this.centerPointGraphic = new Graphic({
            geometry: point,
            symbol: markerSymbol
          })
          this.mapView.graphics.add(this.centerPointGraphic)
        }).catch(e => {
          this.$message({
            type: 'error',
            message: e.message
          })
        })
        this.mapView.center = [lng, lat]
      } else {
        if (this.centerPointGraphic && this.mapView.graphics.includes(this.centerPointGraphic)) {
          this.mapView.graphics.remove(this.centerPointGraphic)
          this.centerPointGraphic = null
        }
      }
    },
    mapClicked (event) {
      this.$store.dispatch('setMapCenterLat', null)
      this.$store.dispatch('setMapCenterLng', null)
      if (this.centerPointGraphic && this.mapView.graphics.includes(this.centerPointGraphic)) {
        this.mapView.graphics.remove(this.centerPointGraphic)
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
