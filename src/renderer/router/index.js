import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = {
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/Main').default,
      redirect: 'map-view',
      children: [{
        path: '',
        name: 'map-view',
        component: require('@/components/MapView').default
      }, {
        path: 'data-query',
        name: 'data-query',
        component: require('@/components/DataQuery').default,
        meta: {
          left: true,
          order: 0,
          text: '污染查询'
        }
      }, {
        path: 'data-dist',
        name: 'data-dist',
        component: require('@/components/DataDist').default,
        meta: {
          left: true,
          order: 1,
          text: '污染分布'
        }
      },
      {
        path: 'map-view-3d',
        name: 'map-view-3d',
        component: require('@/components/MapView3D').default,
        meta: {
          left: false,
          order: 0,
          text: '立体展示'
        }
      }, {
        path: 'provincial-static',
        name: 'provincial-static',
        component: require('@/components/ProvincialStatic').default,
        meta: {
          left: false,
          order: 1,
          text: '省份统计'
        }
      }]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

export default new Router(routes)
