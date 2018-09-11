<template>
  <div class="claro">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'

export default {
  data () {
    return {
      mapView: null,
      datepickerClearable: false,
      datepickerEditable: false,
      dateSelected: new Date(2017, 2, 1),
      dateString: '2017-03-01',
      fullscreenLoading: false
    }
  },
  mounted () {
    this.initMap()
  },
  watch: {
    dateSelected: function () {
      var yearStr = this.dateSelected.getFullYear()
      var monthStr = this.dateSelected.getMonth() + 1
      var dayStr = this.dateSelected.getDate()
      var dateStr = yearStr
      if (monthStr < 10) dateStr += '-0' + monthStr
      else dateStr += '-' + monthStr
      if (dayStr < 10) dateStr += '-0' + dayStr
      else dateStr += '-' + dayStr
      this.dateString = dateStr
    }
  },
  methods: {
    initMap () {
      esriLoader
        .loadModules([
          'esri/views/MapView',
          'esri/WebMap',
          'esri/widgets/Search',
          'esri/widgets/Locate',
          'esri/widgets/Expand',
          'esri/widgets/BasemapGallery',
          'esri/widgets/Fullscreen',
          'esri/Graphic',
          'dojo/domReady!'
        ])
        .then(
          ([
            MapView,
            WebMap,
            Search,
            Locate,
            Expand,
            BasemapGallery,
            Fullscreen,
            Graphic
          ]) => {
            let webmap = new WebMap({
              portalItem: { id: '84c291b9ae4949819fb647d723590916' }
            })
            this.mapView = new MapView({
              map: webmap,
              container: 'viewDiv',
              popup: {
                dockEnabled: true,
                dockOptions: {
                  buttonEnabled: true,
                  position: 'bottom-right',
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
            // var basemapGallery = new BasemapGallery({
            //   view: this.mapView,
            //   container: document.createElement('div')
            // })
            // var bgExpand = new Expand({
            //   view: this.mapView,
            //   content: basemapGallery.container,
            //   expandIconClass: 'esri-icon-basemap'
            // })
            // var fullscreen = new Fullscreen({
            //   view: this.mapView
            // })
            this.mapView.ui.add(searchWidget, {
              position: 'top-right'
            })
            // this.mapView.ui.add(fullscreen, 'top-right')
            // this.mapView.ui.add(bgExpand, 'top-right')
            this.mapView.ui.add(locateBtn, {
              position: 'top-left'
            })
          }
        )
        .catch(err => {
          console.error(err)
          this.fullscreenLoading = false
        })
    },
    addPoints (data) {
      esriLoader
        .loadModules(['esri/Graphic', 'dojo/domReady!'])
        .then(([Graphic]) => {
          this.fullscreenLoading = true
          var pointGraphics = []
          for (var i = 0; i < data.length; i++) {
            let color = [128, 0, 255, 0.3]
            let outlineWidth = 1
            let outlineColor = [128, 0, 255, 0.75]
            let size = data[i].value[0] / 5
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
              type: 'point',
              longitude: lng,
              latitude: lat
            }

            let markerSymbol = {
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
            pointGraphics.push(pointGraphic)
          }
          this.mapView.graphics = []
          this.mapView.graphics.addMany(pointGraphics)
          this.fullscreenLoading = false
        })
        .catch(err => {
          console.error(err)
          this.fullscreenLoading = false
        })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import url("https://js.arcgis.com/4.6/esri/css/main.css");
@import url("https://js.arcgis.com/4.6/dijit/themes/claro/claro.css");
// @import '../../style/Map/main.css';
// @import '../..//style/Map/claro.css';

#viewDiv {
  width: 100%;
  height: 100%;
}
</style>