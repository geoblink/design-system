import _ from 'lodash'
import ResizeObserver from 'resize-observer-polyfill'
import throttle from '../utils/throttle'
import isServer from '../utils/isServer'
import counterFactory from '../utils/counterFactory'
const getNextCallbackId = counterFactory()

let connectedObservers = {}

export default {
  bind: function (el, binding, vNode) {
    if (!isValidBinding(binding) || isServer(vNode)) {
      return
    }

    el.__geoOnResizeCallbackId__ = getNextCallbackId()

    const observer = new ResizeObserver(throttle(function (entries) {
      binding.value(entries)
    }))

    observer.observe(el)

    connectedObservers[el.__geoOnResizeCallbackId__] = observer
  },

  unbind: function (el) {
    connectedObservers[el.__geoOnResizeCallbackId__].disconnect()
    connectedObservers = _.omit(connectedObservers, el.__geoOnResizeCallbackId__)
  }
}

function isValidBinding (binding) {
  if (typeof binding.value !== 'function') {
    console.error(`GeoOnResize [directive] :: provided expression ${binding.expression} is not a function`)
    return false
  }

  return true
}
