<template>
  <div>
    <div id="viewDiv" class="scene"></div>
  </div>
</template>

<script>
import { loadModules } from 'esri-loader'

export default {
  data () {
    return {
      sceneView: null,
      map: null,
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
        'esri/views/SceneView',
        'esri/WebScene'
      ], options).then(
        ([
          SceneView,
          WebScene
        ]) => {
          this.fullscreenLoading = true
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
                x: 104.3,
                y: 28.7,
                z: 20000000
              },
              heading: 0,
              tilt: 0
            },
            popup: {
              dockEnabled: true,
              dockOptions: {
                buttonEnabled: true,
                position: 'bottom-right',
                breakpoint: false
              }
            }
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
.scene {
  width: 100%;
  height: 100%;
}
</style>
