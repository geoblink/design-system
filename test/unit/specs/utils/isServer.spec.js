import isServer from 'src/utils/isServer'

describe('isServer.js', () => {
  it('should return true when $isServer is true', () => {
    const vNode = {
      componentInstance: {
        $isServer: true
      }
    }
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(true)
  })

  it('should return false when $isServer is false', () => {
    const vNode = {
      componentInstance: {
        $isServer: false
      }
    }
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(false)
  })

  it('should not throw error when componentInstance is undefined', () => {
    const vNode = {}
    const isServerResult = isServer(vNode)

    expect(isServerResult).toBe(undefined)
  })
})
