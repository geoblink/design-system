import GeoChart from '@/elements/GeoChart/GeoChart.vue'
import * as GeoChartScale from '@/elements/GeoChart/GeoChartScale/GeoChartScale.js'
import * as GeoChartSizing from '@/elements/GeoChart/GeoChartUtils/GeoChartSizing.js'

import * as _ from 'lodash'
import * as d3 from 'd3'

describe('GeoChartScale', function () {
  describe('Constants', function () {
    it('should export SCALE_TYPES', function () {
      expect(GeoChart.constants).toHaveProperty('SCALES')
      expect(GeoChart.constants.SCALES).toHaveProperty('SCALE_TYPES')
    })

    it('should export linear scale', function () {
      expect(GeoChart.constants.SCALES.SCALE_TYPES).toHaveProperty('linear')
    })

    it('should export logarithmic scale', function () {
      expect(GeoChart.constants.SCALES.SCALE_TYPES).toHaveProperty('logarithmic')
    })

    it('should export categorical scale', function () {
      expect(GeoChart.constants.SCALES.SCALE_TYPES).toHaveProperty('categorical')
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
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
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

      testRange(linearScaleBaseConfig)

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
        }).toThrowError()
      })
    })

    describe('Logarithmic scales', function () {
      const logarithmicScaleBaseConfig = {
        id: 0,
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.logarithmic,
          valueForOrigin: 0,
          domain: {
            start: 10,
            end: 100
          }
        }
      }

      it('should return a valid scale', function () {
        const valueForOrigin = 20

        const scale = GeoChartScale.getNewScale(
          _.merge({}, logarithmicScaleBaseConfig, { scale: { valueForOrigin } }),
          chartBaseConfig
        )

        expect(scale).toHaveProperty('valueForOrigin', valueForOrigin)
        expect(scale).toHaveProperty('axisScale')
        expect(scale.axisScale).toBeInstanceOf(Function)
        expect(Object.getPrototypeOf(scale.axisScale)).toBe(Object.getPrototypeOf(d3.scaleLog))
      })

      testRange(logarithmicScaleBaseConfig)

      it('should set domain using start and end', function () {
        const domain = {
          start: 100,
          end: 500
        }
        const scale = GeoChartScale.getNewScale(
          _.merge({}, logarithmicScaleBaseConfig, { scale: { domain } }),
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
          _.merge({}, logarithmicScaleBaseConfig, { scale: { domain } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual(domain)

        const scaleWithMiddle = GeoChartScale.getNewScale(
          _.merge({}, logarithmicScaleBaseConfig, { scale: { domain: domainWithMiddle } }),
          chartBaseConfig
        )

        expect(scaleWithMiddle.axisScale.domain()).toEqual(domainWithMiddle)
      })

      it('should throw error when using an invalid domain', function () {
        const domain = {
          start: 100
        }

        expect(function () {
          const config = _.cloneDeep(logarithmicScaleBaseConfig)
          config.scale.domain = domain

          return GeoChartScale.getNewScale(
            config,
            chartBaseConfig
          )
        }).toThrowError()
      })
    })

    describe('Categorical scales', function () {
      const categoricalScaleBaseConfig = {
        id: 0,
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.categorical,
          valueForOrigin: 0,
          domain: {
            start: 10,
            end: 100
          }
        }
      }

      it('should return a valid scale', function () {
        const valueForOrigin = 20

        const scale = GeoChartScale.getNewScale(
          _.merge({}, categoricalScaleBaseConfig, { scale: { valueForOrigin } }),
          chartBaseConfig
        )

        expect(scale).toHaveProperty('valueForOrigin', valueForOrigin)
        expect(scale).toHaveProperty('axisScale')
        expect(scale.axisScale).toBeInstanceOf(Function)
        expect(Object.getPrototypeOf(scale.axisScale)).toBe(Object.getPrototypeOf(d3.scaleLog))
      })

      testRange(categoricalScaleBaseConfig)

      it('should set domain using list of strings', function () {
        const categoryA = 100
        const categoryB = 150
        const categoryC = 500
        const domainWith2Items = [categoryA, categoryC]
        const domainWith3Items = [categoryA, categoryB, categoryC]

        const scale = GeoChartScale.getNewScale(
          _.merge({}, categoricalScaleBaseConfig, { scale: { domain: domainWith2Items } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual(domainWith2Items)

        const scaleWithMiddle = GeoChartScale.getNewScale(
          _.merge({}, categoricalScaleBaseConfig, { scale: { domain: domainWith3Items } }),
          chartBaseConfig
        )

        expect(scaleWithMiddle.axisScale.domain()).toEqual(domainWith3Items)
      })

      it('should set inner padding', function () {
        const innerPadding = 0.4
        const scale = GeoChartScale.getNewScale(
          _.merge({}, categoricalScaleBaseConfig, { scale: { padding: { inner: innerPadding } } }),
          chartBaseConfig
        )

        expect(scale.axisScale.paddingInner()).toEqual(innerPadding)
      })

      it('should set outer padding', function () {
        const outerPadding = 0.2
        const scale = GeoChartScale.getNewScale(
          _.merge({}, categoricalScaleBaseConfig, { scale: { padding: { outer: outerPadding } } }),
          chartBaseConfig
        )

        expect(scale.axisScale.paddingOuter()).toEqual(outerPadding)
      })
    })

    describe('Time scales', function () {
      const today = new Date()
      const startDate = new Date('2019-01-01')
      const endDate = new Date('2019-03-01')
      const timeScaleBaseConfig = {
        id: 0,
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        scale: {
          type: GeoChart.constants.SCALES.SCALE_TYPES.time,
          valueForOrigin: today,
          domain: {
            start: today,
            end: today
          }
        }
      }

      it('should return a valid scale', function () {
        const valueForOrigin = new Date()

        const scale = GeoChartScale.getNewScale(
          _.merge({}, timeScaleBaseConfig, { scale: { valueForOrigin } }),
          chartBaseConfig
        )

        expect(scale).toHaveProperty('valueForOrigin', valueForOrigin)
        expect(scale).toHaveProperty('axisScale')
        expect(scale.axisScale).toBeInstanceOf(Function)
        expect(Object.getPrototypeOf(scale.axisScale)).toBe(Object.getPrototypeOf(d3.scaleTime))
      })

      testRange(timeScaleBaseConfig)

      it('should set domain using start and end', function () {
        const domain = {
          start: startDate,
          end: endDate
        }
        const scale = GeoChartScale.getNewScale(
          _.merge({}, timeScaleBaseConfig, { scale: { domain } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual([domain.start, domain.end])
      })

      it('should set domain using list of dates', function () {
        const domain = [startDate, endDate]
        const domainWithMiddle = [startDate, new Date('2019-02-01'), endDate]

        const scale = GeoChartScale.getNewScale(
          _.merge({}, timeScaleBaseConfig, { scale: { domain } }),
          chartBaseConfig
        )

        expect(scale.axisScale.domain()).toEqual(domain)

        const scaleWithMiddle = GeoChartScale.getNewScale(
          _.merge({}, timeScaleBaseConfig, { scale: { domain: domainWithMiddle } }),
          chartBaseConfig
        )

        expect(scaleWithMiddle.axisScale.domain()).toEqual(domainWithMiddle)
      })

      it('should throw error when using an invalid domain', function () {
        const domain = {
          start: startDate
        }

        expect(function () {
          const config = _.cloneDeep(timeScaleBaseConfig)
          config.scale.domain = domain

          return GeoChartScale.getNewScale(
            config,
            chartBaseConfig
          )
        }).toThrowError()
      })
    })

    it('should throw error when trying to get an unknown scale', function () {
      const unknownScaleBaseConfig = {
        id: 0,
        dimension: GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.horizontal,
        scale: {
          type: 'unknown',
          valueForOrigin: 0,
          domain: {
            start: 0,
            end: 0
          }
        }
      }

      expect(function () {
        GeoChartScale.getNewScale(
          unknownScaleBaseConfig,
          chartBaseConfig
        )
      }).toThrowError()
    })

    function testRange (scaleConfig) {
      it('should consider chart width in range of horizontal axis', function () {
        const width = 200
        const height = 100

        const scale = GeoChartScale.getNewScale(
          scaleConfig,
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
          scaleConfig,
          _.merge({}, chartBaseConfig, { margin, size: { width } })
        )

        expect(scale.axisScale.range()).toEqual([leftMargin, width - rightMargin])
      })

      it('should consider chart height in range of vertical axis', function () {
        const dimension = GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical
        const width = 200
        const height = 100

        const scale = GeoChartScale.getNewScale(
          _.merge(scaleConfig, { dimension }),
          _.merge({}, chartBaseConfig, { size: { width, height } })
        )

        expect(scale.axisScale.range()).toEqual([0, height])
      })

      it('should consider chart margin in range of vertical axis', function () {
        const dimension = GeoChart.constants.DIMENSIONS.DIMENSIONS_2D.vertical
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
          _.merge({}, scaleConfig, { dimension }),
          _.merge({}, chartBaseConfig, { margin, size: { width, height } })
        )

        expect(scale.axisScale.range()).toEqual([topMargin, height - bottomMargin])
      })
    }
  })
})
