let urls = {
  demo: {
    // Get demo
    getRequest: '/getDemoUrl',
    // Post demo
    postRequest: '/postDemoUrl'
  },
  province: {
    // Get the names of all provinces in the country
    getProvinceName: '/getprovincesnames',
    // Get AQL data for all cities in a province
    getProvinceData: '/getprovincesdata'
  }
}

export default urls
