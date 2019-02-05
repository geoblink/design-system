// We import in this way because we also import this way in `GeoChart`
import _ from 'lodash'
import * as sinon from 'sinon'

// These utils require faking timers
jest.useFakeTimers()

export function stubLodashThrottleFactory () {
  const sandbox = sinon.createSandbox()

  return { setup, teardown }

  function setup () {
    sandbox.stub(_, 'throttle').returnsArg(0)
  }

  function teardown () {
    sandbox.restore()
  }
}
