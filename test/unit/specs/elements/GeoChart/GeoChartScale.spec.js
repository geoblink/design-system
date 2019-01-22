import * as GeoChartScale from '@/elements/GeoChart/GeoChartScale.js'
import * as GeoChartAxis from '@/elements/GeoChart/GeoChartAxis.js'
import * as GeoChartSizing from '@/elements/GeoChart/GeoChartSizing.js'

import * as _ from 'lodash'
import * as d3 from 'd3'

describe('GeoChartScale', function () {
  describe('Constants', function () {
    it('should export SCALE_TYPES', function () {
      expect(GeoChartScale).toHaveProperty('SCALE_TYPES')
    })

    it('should export linear scale', function () {
      expect(GeoChartScale.SCALE_TYPES).toHaveProperty('linear')
    })

    it('should export logarithmic scale', function () {
      expect(GeoChartScale.SCALE_TYPES).toHaveProperty('logarithmic')
    })

    it('should export categorical scale', function () {
      expect(GeoChartScale.SCALE_TYPES).toHaveProperty('categorical')
    })

    it('should export DEFAULT_LOGARITHMIC_SCALE_BASE', function () {
      expect(GeoChartScale.DEFAULT_LOGARITHMIC_SCALE_BASE).toBeGreaterThan(1)
    })
  })

  describe('#getNewScale', function () {
    const chartBaseConfig = {
      size: {
        height: 0,
        width: 0
      },
      margin: GeoChartSizing.EMPTY_MARGIN
    }

    describe('Linear scales', function () {
      const linearScaleBaseConfig = {
        id: 0,
        dimension: GeoChartAxis.DIMENSIONS.horizontal,
        scale: {
          type: GeoChartScale.SCALE_TYPES.linear,
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 0
          }
        }
      }

      it('should return a valid scale', function () {
        const valueForOrigin = 20

        const scale = GeoChartScale.getNewScale(
          _.merge({}, linearScaleBaseConfig, { scale: { valueForOrigin } }),
          chartBaseConfig
        )

        expect(scale).toHaveProperty('valueForOrigin', valueForOrigin)
        expect(scale).toHaveProperty('axisScale')
        expect(scale.axisScale).toBeInstanceOf(Function)
        expect(Object.getPrototypeOf(scale.axisScale)).toBe(Object.getPrototypeOf(d3.scaleLinear))
      })

      it('should consider chart width in range of horizontal axis', function () {
        const width = 200
        const height = 100

        const scale = GeoChartScale.getNewScale(
          linearScaleBaseConfig,
          _.merge({}, chartBaseConfig, { size: { width, height } })
        )

        expect(scale.axisScale.range()).toEqual([0, width])
      })

      it('should consider chart margin in range of horizontal axis', function () {
        const leftMargin = 100
        const rightMargin = 50
        const width = 200
        const margin = {
          top: 30,
          right: rightMargin,
          bottom: 90,
          left: leftMargin
        }

        const scale = GeoChartScale.getNewScale(
          linearScaleBaseConfig,
          _.merge({}, chartBaseConfig, { margin, size: { width } })
        )

        expect(scale.axisScale.range()).toEqual([leftMargin, width - rightMargin])
      })

      it('should consider chart height in range of vertical axis', function () {
        const dimension = GeoChartAxis.DIMENSIONS.vertical
        const width = 200
        const height = 100

        const scale = GeoChartScale.getNewScale(
          _.merge(linearScaleBaseConfig, { dimension }),
          _.merge({}, chartBaseConfig, { size: { width, height } })
        )

        expect(scale.axisScale.range()).toEqual([0, height])
      })

      it('should consider chart margin in range of vertical axis', function () {
        const dimension = GeoChartAxis.DIMENSIONS.vertical
        const topMargin = 75
        const bottomMargin = 50
        const width = 200
        const height = 300
        const margin = {
          top: topMargin,
          right: 60,
          bottom: bottomMargin,
          left: 40
        }

        const scale = GeoChartScale.getNewScale(
          _.merge({}, linearScaleBaseConfig, { dimension }),
          _.merge({}, chartBaseConfig, { margin, size: { width, height } })
        )

        expect(scale.axisScale.range()).toEqual([topMargin, height - bottomMargin])
      })

      it('should set domain using start and end', function () {
        const domain = {
          start: 100,
          end: 500
        }
        const scale = GeoChartScale.getNewScale(
          _.merge({}, linearScaleBaseConfig, { scale: { domain } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual([domain.start, domain.end])
      })

      it('should set domain using list of numbers', function () {
        const domainStart = 100
        const domainMiddle = 150
        const domainEnd = 500
        const domain = [domainStart, domainEnd]
        const domainWithMiddle = [domainStart, domainMiddle, domainEnd]

        const scale = GeoChartScale.getNewScale(
          _.merge({}, linearScaleBaseConfig, { scale: { domain } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual(domain)

        const scaleWithMiddle = GeoChartScale.getNewScale(
          _.merge({}, linearScaleBaseConfig, { scale: { domain: domainWithMiddle } }),
          chartBaseConfig
        )

        expect(scaleWithMiddle.axisScale.domain()).toEqual(domainWithMiddle)
      })

      it('should throw error when using an invalid domain', function () {
        const domain = {
          start: 100
        }

        expect(function () {
          const config = _.cloneDeep(linearScaleBaseConfig)
          config.scale.domain = domain

          return GeoChartScale.getNewScale(
            config,
            chartBaseConfig
          )
        }).toThrow()
      })
    })
  })
})
