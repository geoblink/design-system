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
      window.addEventListener('click', runCallbacks, true)
    }

    el.__geoOnClickOutsideCallbackId__ = getNextCallbackId()
    callbacks[el.__geoOnClickOutsideCallbackId__] = function (event) {
      if (!vNode.context || el === event.target || el.contains(event.target)) {
        return
      }
      binding.value(event)
    }
  },

  unbind: function (el) {
    callbacks = getObjectWithoutKey(callbacks, el.__geoOnClickOutsideCallbackId__)
    if (isObjectEmpty(callbacks)) {
      window.removeEventListener('click', runCallbacks)
    }
  }
}

function isValidBinding (binding) {
  if (typeof binding.value !== 'function') {
    console.warn(`[geo-click-outside:] provided expression ${binding.expression} is not a function`)
    return false
  }

  return true
}
