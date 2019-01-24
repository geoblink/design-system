// We import in this way because we also import this way in `GeoChart`
import _ from 'lodash'
import * as sinon from 'sinon'

// To mock d3 timers we have to hijack requestAnimationFrame before d3 picks it
const stubRequestAnimationFrame = stubRequestAnimationFrameFactory()
stubRequestAnimationFrame.setup()

const d3 = require('d3')

// These utils require faking timers
jest.useFakeTimers()

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
                  a: 1, // R: 0, C: 0
                  b: 0, // R: 1, C: 0
                  c: 0, // R: 0, C: 1
                  d: 1, // R: 1, C: 1
                  e: 0, // R: 0, C: 2
                  f: 0 // R: 1, C: 2
                }
              }
            }

            const matches = /translate\(\s*(-?\d*(?:\.\d+)?),\s*(-?\d*(?:\.\d+)?)\s*\)/gi.exec(currentTransform)

            if (!matches || matches.length !== 3) throw new Error(`Unparseable transform: «${currentTransform}»`)

            const xTranslate = parseFloat(matches[1])
            const yTranslate = parseFloat(matches[2])

            const transformMatrix = {
              a: 1, // R: 0, C: 0
              b: 0, // R: 1, C: 0
              c: 0, // R: 0, C: 1
              d: 1, // R: 1, C: 1
              e: xTranslate, // R: 0, C: 2
              f: yTranslate // R: 1, C: 2
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
