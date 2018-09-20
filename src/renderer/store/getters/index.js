const getters = {
  mapCenterLat: state => state.app.mapConfig.centerLat,
  mapCenterLng: state => state.app.mapConfig.centerLng,
  selectedDateStr: state => state.app.mapConfig.selectedDateStr,
  dailyData: state => state.app.mapConfig.dailyData,
  maskMainView: state => state.app.maskMainView
}

export default getters
