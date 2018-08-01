import throttle from '../utils/throttle'
import isServer from '../utils/isServer'
import isObjectEmpty from '../utils/isObjectEmpty'
import getObjectWithoutKey from '../utils/getObjectWithoutKey'
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

    if (isObjectEmpty(callbacks)) {
      window.addEventListener('scroll', runCallbacks, true)
    }

    el.__geoOnAnyScrollCallbackId__ = getNextCallbackId()
    callbacks[el.__geoOnAnyScrollCallbackId__] = function (event) {
      binding.value(event)
    }
  },

  unbind: function (el) {
    callbacks = getObjectWithoutKey(callbacks, el.__geoOnAnyScrollCallbackId__)
    if (isObjectEmpty(callbacks)) {
      window.removeEventListener('scroll', runCallbacks)
    }
  }
}

function isValidBinding (binding) {
  if (typeof binding.value !== 'function') {
    console.warn(`[geo-any-scroll:] provided expression ${binding.expression} is not a function`)
    return false
  }

  return true
}
