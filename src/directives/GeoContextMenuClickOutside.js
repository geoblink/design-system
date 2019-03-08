import _ from 'lodash'
import throttle from '../utils/throttle'
import isServer from '../utils/isServer'
import counterFactory from '../utils/counterFactory'
const getNextCallbackId = counterFactory()

const runCallbacks = throttle(function (event) {
  const sortedCallbacks = _.map(
    _.reverse(_.sortedUniq(Object.keys(callbacks))),
    (index) => callbacks[index]
  )

  for (const callback of sortedCallbacks) {
    callback(event)
  }
})

let callbacks = {}

export default {
  bind: function (el, binding, vNode) {
    if (!isValidBinding(binding) || isServer(vNode)) {
      return
    }

    if (_.isEmpty(callbacks)) {
      window.addEventListener('contextmenu', runCallbacks, true)
    }

    el.__geoOnContextMenuClickOutsideCallbackId__ = getNextCallbackId()
    callbacks[el.__geoOnContextMenuClickOutsideCallbackId__] = function (event) {
      if (event.isStopped || !vNode.context || el === event.target || el.contains(event.target)) {
        return
      }

      binding.value(event, function () {
        event.isStopped = true
      })
    }
  },

  unbind: function (el) {
    callbacks = _.omit(callbacks, el.__geoOnContextMenuClickOutsideCallbackId__)
    if (_.isEmpty(callbacks)) {
      window.removeEventListener('contextmenu', runCallbacks)
    }
  }
}

function isValidBinding (binding) {
  if (typeof binding.value !== 'function') {
    console.error(`GeoContextMenuClickOutside [directive] :: provided expression ${binding.expression} is not a function`)
    return false
  }

  return true
}
