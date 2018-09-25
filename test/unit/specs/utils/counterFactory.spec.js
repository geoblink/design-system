import counterFactory from 'src/utils/counterFactory.js'

let counter

beforeEach(() => {
  counter = counterFactory()
})

describe('counterFactory.js', () => {
  it('should return a function', () => {
    expect(counter).toEqual(expect.any(Function))
  })

  it('should return 0 on first tick', () => {
    const counterValue = counter()

    expect(counterValue).toBe(0)
  })

  it('should increase counter on 1 on each tick', () => {
    let counterValue = counter()

    expect(counterValue).toBe(0)
    counterValue = counter()
    expect(counterValue).toBe(1)
    counterValue = counter()
    expect(counterValue).toBe(2)
  })
})
