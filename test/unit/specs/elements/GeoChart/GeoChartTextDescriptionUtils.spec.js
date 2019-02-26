import { computeLabelPositionsNaturalDirection } from 'src/elements/GeoChart/GeoChartTextDescriptionUtils.js'

describe.only('GeoChartTextDescriptionUtils.js', () => {
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
    }
  ]

  tests.forEach(function (test) {
    it(test.name, function () {
      const positions = computeLabelPositionsNaturalDirection(test.textElemsConfig, test.generalConfig)

      expect(positions).toEqual(test.expect)
    })
  })
})
