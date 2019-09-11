import isServer from 'src/utils/isServer'

describe('isServer.js', () => {
  it('Should return true when $isServer is true', () => {
    const vNode = {
      componentInstance: {
        $isServer: true
      }
    }
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(true)
  })

  it('Should return false when $isServer is false', () => {
    const vNode = {
      componentInstance: {
        $isServer: false
      }
    }
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(false)
  })

  it('Should not throw error when componentInstance is undefined', () => {
    const vNode = {}
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(undefined)
  })
})
