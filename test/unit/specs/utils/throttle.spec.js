import throttle from 'src/utils/throttle'

jest.useFakeTimers()

let throttleCallback
let mockFn

beforeEach(() => {
  mockFn = jest.fn()
  throttleCallback = throttle(mockFn)
})

describe('throttle.js', () => {
  it('should return a function', () => {
    expect(throttleCallback).toEqual(expect.any(Function))
  })

  it('should not be called more than 1 time', () => {
    throttleCallback()
    throttleCallback()

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should be called more than 1 time if timeout triggers', () => {
    throttleCallback()
    jest.runAllTimers()
    throttleCallback()

    expect(mockFn).toHaveBeenCalledTimes(2)
  })
})
