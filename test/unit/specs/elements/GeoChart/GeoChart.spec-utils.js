// We import in this way because we also import this way in `GeoChart`
import _ from 'lodash'
import * as sinon from 'sinon'

// To mock d3 timers we have to hijack requestAnimationFrame before d3 picks it
const stubRequestAnimationFrame = stubRequestAnimationFrameFactory()
stubRequestAnimationFrame.setup()

const d3 = require('d3')

// These utils require faking timers
jest.useFakeTimers()

require('d3-tip').default = require('d3-tip')

export function stubLodashDebounceFactory () {
  const sandbox = sinon.createSandbox()

  return { setup, teardown }

  function setup () {
    sandbox.stub(_, 'debounce').returnsArg(0)
  }

  function teardown () {
    sandbox.restore()
  }
}

export function stubRequestAnimationFrameFactory () {
  const sandbox = sinon.createSandbox()
  let enqueuedCallbacks = []

  return {
    setup,
    teardown,
    fire
  }

  function setup () {
    sandbox.stub(window, 'requestAnimationFrame').callsFake(function (callback) {
      enqueuedCallbacks.push(callback)
    })
  }

  function teardown () {
    sandbox.restore()
  }

  function fire () {
    const callbacksToBeCalled = enqueuedCallbacks
    enqueuedCallbacks = []
    for (const callback of callbacksToBeCalled) {
      callback()
    }
  }
}

export function flushD3Transitions () {
  jest.runOnlyPendingTimers()

  const sandbox = sinon.createSandbox()
  sandbox.stub(performance, 'now').callsFake(function () {
    return getTimestampForXMinutesIntoTheFuture(performance.now.callCount)
  })
  sandbox.stub(Date, 'now').callsFake(function () {
    return getTimestampForXMinutesIntoTheFuture(Date.now.callCount)
  })

  const svgElementPrototypeTransformStub = svgElementPrototypeTransformStubFactory()

  svgElementPrototypeTransformStub.setup()
  svgElementPrototypeTransformStub.stubInSandbox(sandbox)

  try {
    stubRequestAnimationFrame.fire()
    d3.timerFlush()
    stubRequestAnimationFrame.fire()
  } catch (error) {
    throw error
  } finally {
    sandbox.restore()
    svgElementPrototypeTransformStub.teardown()
  }

  function getTimestampForXMinutesIntoTheFuture (minutes) {
    const now = new Date().getTime()
    return now + minutes * 60 * 1000
  }
}

function svgElementPrototypeTransformStubFactory () {
  const isTransformPresentInSVGElementPrototype = 'transform' in SVGElement.prototype

  const setup = isTransformPresentInSVGElementPrototype
    ? () => {}
    : () => { SVGElement.prototype.transform = undefined } // Sinon can't stub missing properties

  const teardown = isTransformPresentInSVGElementPrototype
    ? () => {}
    : () => { delete SVGElement.prototype.transform } // So ownProperties are restored -- maybe they are checked by a 3rd party

  return { setup, teardown, stubInSandbox }

  function stubInSandbox (sandbox) {
    sandbox.stub(SVGElement.prototype, 'transform').get(function () {
      const element = this

      return {
        baseVal: {
          consolidate () {
            const currentTransform = element.getAttribute('transform')

            if (currentTransform === '') {
              return {
                matrix: {
                  // See: https://en.wikipedia.org/wiki/Transformation_matrix
                  a: 1, // Row: 0, Col: 0
                  b: 0, // Row: 1, Col: 0
                  c: 0, // Row: 0, Col: 1
                  d: 1, // Row: 1, Col: 1
                  e: 0, // Row: 0, Col: 2
                  f: 0 // Row: 1, Col: 2
                }
              }
            }

            const matches = /translate\(\s*(-?\d*(?:\.\d+)?),\s*(-?\d*(?:\.\d+)?)\s*\)/gi.exec(currentTransform)

            if (!matches || matches.length !== 3) throw new Error(`Unparseable transform: «${currentTransform}»`)

            const xTranslate = parseFloat(matches[1])
            const yTranslate = parseFloat(matches[2])

            const transformMatrix = {
              // See: https://en.wikipedia.org/wiki/Transformation_matrix
              a: 1, // Row: 0, Col: 0
              b: 0, // Row: 1, Col: 0
              c: 0, // Row: 0, Col: 1
              d: 1, // Row: 1, Col: 1
              e: xTranslate, // Row: 0, Col: 2
              f: yTranslate // Row: 1, Col: 2
            }

            return {
              matrix: transformMatrix
            }
          }
        }
      }
    })
  }
}

export function stubGetBoundingClientRectFactory (functionOrValue) {
  const sandbox = sinon.createSandbox()

  return { setup, teardown }

  function setup () {
    if (_.isFunction(functionOrValue)) {
      sandbox.stub(Element.prototype, 'getBoundingClientRect').callsFake(functionOrValue)
    } else {
      sandbox.stub(Element.prototype, 'getBoundingClientRect').returns(functionOrValue)
    }
  }

  function teardown () {
    sandbox.restore()
  }
}

export function stubGetBBoxFactory (functionOrValue) {
  // Object shape at » https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
  functionOrValue = functionOrValue || {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
  const sandbox = sinon.createSandbox()

  const isGetBBoxPresentInSVGElementPrototype = 'getBBox' in SVGSVGElement.prototype

  return { setup, teardown }

  function setup () {
    // Sinon can't stub missing properties
    if (isGetBBoxPresentInSVGElementPrototype) {
      sandbox.stub(SVGSVGElement.prototype, 'getBBox').callsFake(getReturnValue)
    } else {
      SVGSVGElement.prototype.getBBox = getReturnValue
    }
  }

  function teardown () {
    if (isGetBBoxPresentInSVGElementPrototype) {
      sandbox.restore()
    } else {
      // So ownProperties are restored -- maybe they are checked by a 3rd party
      delete SVGSVGElement.getBBox
    }
  }

  function getReturnValue () {
    return _.isFunction(functionOrValue)
      ? functionOrValue()
      : functionOrValue
  }
}

export function stubGetScreenCTMFactory (functionOrValue) {
  // Object shape at » https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
  functionOrValue = functionOrValue || {
    is2D: true,
    isIdentity: true,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    m11: 1,
    m12: 0,
    m13: 0,
    m14: 0,
    m21: 0,
    m22: 1,
    m23: 0,
    m24: 0,
    m31: 0,
    m32: 0,
    m33: 1,
    m34: 0,
    m41: 0,
    m42: 0,
    m43: 0,
    m44: 1
  }
  const sandbox = sinon.createSandbox()

  const isGetScreenCTMPresentInSVGElementPrototype = 'getScreenCTM' in SVGSVGElement.prototype

  return { setup, teardown }

  function setup () {
    // Sinon can't stub missing properties
    if (isGetScreenCTMPresentInSVGElementPrototype) {
      sandbox.stub(SVGSVGElement.prototype, 'getScreenCTM').callsFake(getReturnValue)
    } else {
      SVGSVGElement.prototype.getScreenCTM = getReturnValue
    }
  }

  function teardown () {
    if (isGetScreenCTMPresentInSVGElementPrototype) {
      sandbox.restore()
    } else {
      // So ownProperties are restored -- maybe they are checked by a 3rd party
      delete SVGSVGElement.getScreenCTM
    }
  }

  function getReturnValue () {
    return _.isFunction(functionOrValue)
      ? functionOrValue()
      : functionOrValue
  }
}

export function stubCreateSVGPointFactory () {
  const sandbox = sinon.createSandbox()
  const defaultPoint = {
    matrixTransform () {
      return {}
    }
  }

  const isCreateSVGPointPresentInSVGSVGElementPrototype = 'createSVGPoint' in SVGSVGElement.prototype

  return { setup, teardown }

  function setup () {
    // Sinon can't stub missing properties
    if (isCreateSVGPointPresentInSVGSVGElementPrototype) {
      sandbox.stub(SVGSVGElement.prototype, 'createSVGPoint').returns(defaultPoint)
    } else {
      SVGSVGElement.prototype.createSVGPoint = () => defaultPoint
    }
  }

  function teardown () {
    if (isCreateSVGPointPresentInSVGSVGElementPrototype) {
      sandbox.restore()
    } else {
      // So ownProperties are restored -- maybe they are checked by a 3rd party
      delete SVGSVGElement.createSVGPoint
    }
  }
}
