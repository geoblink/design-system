import throttle from 'src/utils/throttle'

describe('throttle.js', () => {
  const mockFn = jest.fn()
  const throttleCallback = throttle(mockFn)

  beforeEach(() => {
    mockFn.mockClear()
  })

  it('should return a function', () => {
    expect(throttleCallback).toEqual(expect.any(Function))
  })

  it('should be called once when run consecutively', () => {
    throttleCallback()
    throttleCallback()

    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('should be called more than once when there is some delay between calls', (done) => {
    throttleCallback()
    setTimeout(function () {
      throttleCallback()
      expect(mockFn).toHaveBeenCalledTimes(2)
      done()
    }, 11)
  })
})
