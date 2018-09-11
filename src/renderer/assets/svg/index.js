import Vue from 'vue'
import SvgIcon from '@/components/Utils/SvgIcon.vue'

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./icon', false, /\.svg$/)
export const iconMap = requireAll(req)
