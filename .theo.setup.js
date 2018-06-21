module.exports = function (theo) {
  theo.registerValueTransform(
    'hsb',
    prop => prop.get('type') === 'color',
    function (prop) {

      const matches = prop.get('value').match(/brightness\(\#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2}), ([^)]*)\)/i)

      if (matches && matches.length === 5) {
        const [value, red, green, blue, amount] = matches

        const r = parseInt(red, 16) / 255
        const g = parseInt(green, 16) / 255
        const b = parseInt(blue, 16) / 255

        const rgbMax = Math.max(r, g, b)
        const rgbMin = Math.min(r, g, b)
        const rgbDelta = rgbMax - rgbMin

        const hue = getHue({ red: r, green: g, blue: b})
        const saturation = getSaturation({ red: r, green: g, blue: b })
        const brightness = Math.max(Math.min(rgbMax * 100 + parseInt(amount), 100), 0)

        const hslLightness = (2 - saturation / 100) * (brightness / 2)
        const hslSaturation = (brightness * saturation) / (hslLightness < 50 ? hslLightness * 2 : 200 - hslLightness * 2)

        return getHexFromHSL({ hue, saturation: hslSaturation, lightness: hslLightness })
      }

      return prop.get('value')
    }
  )
  theo.registerTransform('web', ['hsb'])
}

function getHue ({red, green, blue}) {
  const rgbMax = Math.max(red, green, blue)
  const rgbMin = Math.min(red, green, blue)
  const rgbDelta = rgbMax - rgbMin

  let hue
  if (rgbMax === red) hue = (green - blue) / rgbDelta
  if (rgbMax === green) hue = 2 + (blue - red) / rgbDelta
  if (rgbMax === blue) hue = 4 + (red - green) / rgbDelta

  hue *= 60
  hue = hue < 0 ? hue + 360 : hue

  return Math.round(hue)
}

function getSaturation ({red, green, blue}) {
  const rgbMax = Math.max(red, green, blue)
  const rgbMin = Math.min(red, green, blue)
  const rgbDelta = rgbMax - rgbMin

  return rgbMax !== 0
    ? rgbDelta / rgbMax * 100
    : 0
}

function getHexFromHSL ({hue, saturation, lightness}) {
  hue /= 360
  saturation /= 100
  lightness /= 100

  let r, g, b
  if (saturation === 0) {
    r = g = b = lightness // achromatic
  } else {
    const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation
    const p = 2 * lightness - q
    r = hue2rgb(p, q, hue + 1 / 3)
    g = hue2rgb(p, q, hue)
    b = hue2rgb(p, q, hue - 1 / 3)
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`

  function hue2rgb (p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  function toHex (x) {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }
}
