const app = {
  state: {
    mapConfig: {
      centerLat: 0,
      centerLng: 0
    }
  },
  mutations: {
    SET_MAPCENTER_LAT: (state, centerLat) => {
      state.mapConfig.centerLat = centerLat
    },
    SET_MAPCENTER_LNG: (state, centerLng) => {
      state.mapConfig.centerLng = centerLng
    }
  },
  actions: {
    setMapCenterLat ({ commit }, centerLat) {
      commit('SET_MAPCENTER_LAT', centerLat)
    },
    setMapCenterLng ({ commit }, centerLng) {
      commit('SET_MAPCENTER_LNG', centerLng)
    }
  }
}

export default app
