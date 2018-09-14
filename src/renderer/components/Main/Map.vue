<template>
  <div id="viewDiv"></div>
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  data () {
    return {
      mapView: null,
      fullscreenLoading: false
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
