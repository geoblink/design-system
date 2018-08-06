import _ from 'lodash'
import throttle from '../utils/throttle'
import isServer from '../utils/isServer'
import counterFactory from '../utils/counterFactory'
const getNextCallbackId = counterFactory()

const runCallbacks = throttle(function (event) {
  for (const callback of Object.values(callbacks)) {
    callback(event)
  }
})

let callbacks = {}

module.exports = {
  bind: function (el, binding, vNode) {
    if (!isValidBinding(binding) || isServer(vNode)) {
      return
    }

    if (_.isEmpty(callbacks)) {
      window.addEventListener('scroll', runCallbacks, true)
    }

    el.__geoOnAnyScrollCallbackId__ = getNextCallbackId()
    callbacks[el.__geoOnAnyScrollCallbackId__] = function (event) {
      binding.value(event)
    }
  },

  unbind: function (el) {
    callbacks = _.omit(callbacks, el.__geoOnAnyScrollCallbackId__)
    if (_.isEmpty(callbacks)) {
      window.removeEventListener('scroll', runCallbacks)
    }
  }
}

function isValidBinding (binding) {
  if (typeof binding.value !== 'function') {
    console.error(`[geo-scroll-anywhere:] provided expression ${binding.expression} is not a function`)
    return false
  }

  return true
}
