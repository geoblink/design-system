import counterFactory from 'src/utils/counterFactory.js'

describe('counterFactory.js', () => {
  let counter

  beforeEach(() => {
    counter = counterFactory()
  })

  it('should return a function', () => {
    expect(counter).toEqual(expect.any(Function))
  })

  it('should return 0 on first tick', () => {
    expect(counter()).toBe(0)
  })

  it('should increase counter on 1 on each tick', () => {
    expect(counter()).toBe(0)
    expect(counter()).toBe(1)
    expect(counter()).toBe(2)
  })
})
