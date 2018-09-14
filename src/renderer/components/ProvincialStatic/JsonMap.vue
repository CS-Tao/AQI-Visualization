<template>
  <div class="claro">
    <div id="viewDiv"></div>
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'

export default {
  props: {
    geojsonData: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      fullscreenLoading: false
    }
  },
  mounted () {
    this.initMap()
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
    addjson () {
      esriLoader
        .loadModules([
          'esri/views/MapView',
          'esri/Map',
          'esri/layers/FeatureLayer',
          'esri/geometry/Point',
          'esri/widgets/Legend',
          'esri/request',
          'dojo/domReady!'
        ]).then(
          ([
            MapView,
            Map,
            FeatureLayer,
            Point,
            Legend,
            esriRequest
          ])
        ).catch(err => {
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
