<template>
  <div id="viewDiv1"></div>
</template>

<script>
import { loadModules } from 'esri-loader'
import { geojsonToArcGIS } from '@esri/arcgis-to-geojson-utils'

export default {
  data () {
    return {
      mapView: null,
      fullscreenLoading: false
    }
  },
  props: ['jsonData'],
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
            container: 'viewDiv1',
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
          this.mapView.ui.add(searchWidget, {
            position: 'top-right'
          })
          this.mapView.ui.add(locateBtn, {
            position: 'top-left'
          })
          this.addJsonMap()
        }
      ).catch(err => {
        console.error(err)
        this.fullscreenLoading = false
      })
    },
    addJsonMap () {
      const options = {
        url: 'https://js.arcgis.com/4.6/'
      }
      var fields = [
        {
          name: 'ObjectID',
          alias: 'ObjectID',
          type: 'oid'
        }]
      var boderrender = {
        type: 'simple', // autocasts as new SimpleRenderer()
        symbol: {
          type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
          color: [211, 255, 0, 0],
          outline: {
            width: 1,
            color: '#FF0055',
            style: 'solid'
          }
        }
      }
      loadModules([
        'esri/views/MapView',
        'esri/Map',
        'esri/layers/FeatureLayer',
        'esri/geometry/Polygon',
        'esri/widgets/Legend',
        'esri/request',
        'dojo/domReady!',
        'esri/layers/GraphicsLayer'
      ], options).then(
        ([
          MapView,
          Map,
          FeatureLayer,
          Polygon,
          Legend,
          esriRequest
        ]) => {
          var geoJson = this.jsonData
          // 创建图层
          const arcgis = geojsonToArcGIS(geoJson)
          // console.log(JSON.stringify(arcgis))

          // Create an array of Graphics from each GeoJSON feature
          /*  var graphics = arcgis.features(function (feature, i) {
            return {
              geometry: new Polygon({
                x: feature.geometry.coordinates[0],
                y: feature.geometry.coordinates[1]
              }),
              // select only the attributes you care about
              attributes: {
                ObjectID: i
              }
            }
          }) */
          var layer = new FeatureLayer({
            source: arcgis, // autocast as an array of esri/Graphic
            // create an instance of esri/layers/support/Field for each field object
            fields: fields, // This is required when creating a layer from Graphics
            objectIdField: 'ObjectID', // This must be defined when creating a layer from Graphics
            renderer: boderrender, // set the visualization on the layer
            spatialReference: {
              wkid: 4326
            },
            geometryType: 'polygon' // Must be set when creating a layer from Graphics
          })

          /* var layer = new FeatureLayer({
            source: graphics
          }) */

          this.mapView.map.add(layer)
        }
      ).catch(err => {
        console.error(err)
        this.fullscreenLoading = false
      })
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
