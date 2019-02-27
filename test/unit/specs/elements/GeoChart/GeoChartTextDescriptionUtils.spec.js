import { computeLabelPositionsWithBackPressure, computeLabelPositionsWithoutReadjustment } from '@/elements/GeoChart/GeoChartTextDescriptionUtils.js'

describe('GeoChartTextDescriptionUtils.js', () => {
  describe('computeLabelPositionsWithBackPressure', () => {
    const tests = [
      {
        name: 'all labels fit in the preferred position',
        textElemsConfig: [
          {
            height: 5,
            preferredPosition: 80
          },
          {
            height: 5,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 300
        },
        expect: [80, 50]
      },
      {
        name: 'not enough space for any of them',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 10
        },
        expect: [null, null]
      },
      {
        name: 'only one fits',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 20
        },
        expect: [10, null]
      },
      {
        name: 'the 2 boxes overlap',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 80
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [80, 60]
      },
      {
        name: 'the 2 boxes overlap at the end',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [30, 10]
      },
      {
        name: '3 boxes overlap at the end',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [50, 30, 10]
      },
      {
        name: '2 boxes overlap out of 3',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 30
          },
          {
            height: 20,
            preferredPosition: 30
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 40
        },
        expect: [30, 10, null]
      }
    ]

    tests.forEach(function (test) {
      it(test.name, function () {
        const positions = computeLabelPositionsWithBackPressure(test.textElemsConfig, test.generalConfig)

        expect(positions).toEqual(test.expect)
      })
    })
  })

  describe('computeLabelPositionsWithoutReadjustment', () => {
    const tests = [
      {
        name: 'all labels fit in the preferred position',
        textElemsConfig: [
          {
            height: 5,
            preferredPosition: 80
          },
          {
            height: 5,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 300
        },
        expect: [80, 50]
      },
      {
        name: 'not enough space for any of them',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 10
        },
        expect: [null, null]
      },
      {
        name: 'only one fits',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 50
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 20
        },
        expect: [null, null]
      },
      {
        name: 'the 2 boxes overlap',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 80
          },
          {
            height: 20,
            preferredPosition: 80
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [80, null]
      },
      {
        name: 'the 2 boxes overlap at the end',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [10, null]
      },
      {
        name: '3 boxes overlap at the end',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 100
        },
        expect: [10, null, null]
      },
      {
        name: '2 boxes overlap out of 3',
        textElemsConfig: [
          {
            height: 20,
            preferredPosition: 30
          },
          {
            height: 20,
            preferredPosition: 30
          },
          {
            height: 20,
            preferredPosition: 10
          }
        ],
        generalConfig: {
          margin: 0,
          minY: 0,
          maxY: 40
        },
        expect: [30, null, 10]
      }
    ]

    tests.forEach(function (test) {
      it(test.name, function () {
        const positions = computeLabelPositionsWithoutReadjustment(test.textElemsConfig, test.generalConfig)

        expect(positions).toEqual(test.expect)
      })
    })
  })
})
