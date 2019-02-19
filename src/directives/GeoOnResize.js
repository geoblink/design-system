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

    const callback = _.get(binding.value, 'callback', binding.value)
    const target = _.get(binding.value, 'target', el)

    const observer = new ResizeObserver(throttle(function (entries) {
      callback(entries)
    }))

    observer.observe(target)

    connectedObservers[el.__geoOnResizeCallbackId__] = observer
  },

  unbind: function (el) {
    connectedObservers[el.__geoOnResizeCallbackId__].disconnect()
    connectedObservers = _.omit(connectedObservers, el.__geoOnResizeCallbackId__)
  }
}

function isValidBinding (binding) {
  const callback = _.get(binding.value, 'callback', binding.value)
  if (typeof callback !== 'function') {
    console.error(`GeoOnResize [directive] :: provided callback ${callback} is not a function`)
    return false
  }

  return true
}
