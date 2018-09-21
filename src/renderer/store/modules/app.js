const app = {
  state: {
    mapConfig: {
      centerLat: 0,
      centerLng: 0,
      selectedDateStr: '2017-05-09',
      dailyData: null
    },
    maskMainView: false
  },
  mutations: {
    SET_MAPCENTER_LAT: (state, centerLat) => {
      state.mapConfig.centerLat = centerLat
    },
    SET_MAPCENTER_LNG: (state, centerLng) => {
      state.mapConfig.centerLng = centerLng
    },
    SET_SELECTED_DATE: (state, selectedDateStr) => {
      state.mapConfig.selectedDateStr = selectedDateStr
    },
    SET_MAIN_VIEW_LOADING_STATUS: (state, isloading) => {
      state.maskMainView = isloading
    },
    SET_DAILY_DATA: (state, data) => {
      state.mapConfig.dailyData = data
    }
  },
  actions: {
    setMapCenterLat ({ commit }, centerLat) {
      commit('SET_MAPCENTER_LAT', centerLat)
    },
    setMapCenterLng ({ commit }, centerLng) {
      commit('SET_MAPCENTER_LNG', centerLng)
    },
    setSelectedDate ({ commit }, selectedDateStr) {
      commit('SET_SELECTED_DATE', selectedDateStr)
    },
    setMainViewLoadingStatus ({ commit }, isloading) {
      commit('SET_MAIN_VIEW_LOADING_STATUS', isloading)
    },
    setDailyData ({ commit }, data) {
      commit('SET_DAILY_DATA', data)
    }
  }
}

export default app
