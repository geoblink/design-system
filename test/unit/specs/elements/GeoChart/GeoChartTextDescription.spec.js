import _ from 'lodash'

import {
  flushD3Transitions,
  stubGetBoundingClientRectFactory,
  stubGetBBoxFactory,
  stubGetScreenCTMFactory,
  stubLodashDebounceFactory,
  getTransformTranslateMatches,
  stubCreateSVGPointFactory
} from './GeoChart.spec-utils' // This has to be imported before D3
import { ALGORITHMS } from '@/elements/GeoChart/GeoChartUtils/textDescriptionUtils'
import { setupTextDescriptions } from '@/elements/GeoChart/GeoChartUtils/GeoChartTextDescription'
import { createLocalVue, mount } from '@vue/test-utils'
import GeoChart from '@/elements/GeoChart/GeoChart.vue'

const localVue = createLocalVue()
localVue.component('geo-chart', GeoChart)

describe('GeoChartTextDescription.js', () => {
  let wrapper
  const chart = {
    animationsDurationInMilliseconds: 1000
  }
  const chartConfig = {
    height: 300,
    width: 500
  }

  const settings = {
    keyForId: 'id',
    textOptions: {
      content,
      cssClassesGroups (originalClasses) { return [...originalClasses, 'my-group-class'] },
      cssClassesTexts (originalClasses) { return [...originalClasses, 'my-text-class'] }
    },
    getTextPositionMainDirection: getTextPositionMainDirection,
    minY: 0,
    maxY: 300,
    algorithm: ALGORITHMS.withoutReadjustment,
    data: [{}],
    textOrigin: [100, 100],
    textAnchor: 'start'
  }

  function content () {
    return [{ text: 'content text' }]
  }

  function getTextPositionMainDirection (d, i) {
    return d.yPos || 20
  }

  const bbox = {
    x: 0,
    y: 0,
    width: 0,
    height: 20,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }

  const stubGetBBox = stubGetBBoxFactory(bbox)
  const stubGetScreenCTM = stubGetScreenCTMFactory()
  const stubCreateSVGPoint = stubCreateSVGPointFactory()
  const stubLodashDebounce = stubLodashDebounceFactory()
  const stubGetBoundingClientRect = stubGetBoundingClientRectFactory({
    height: chartConfig.height,
    width: chartConfig.width
  })

  beforeEach(function () {
    stubGetBoundingClientRect.setup()
    stubLodashDebounce.setup()
    stubGetBBox.setup()
    stubCreateSVGPoint.setup()
    stubGetScreenCTM.setup()

    wrapper = mount(GeoChart, {
      propsData: {
        config: {
          axisGroups: [{
            id: 'dummy-axis',
            keyForValues: 'value',
            position: {
              type: GeoChart.constants.AXIS.POSITIONS.left
            },
            scale: {
              type: GeoChart.constants.SCALES.SCALE_TYPES.linear,
              valueForOrigin: 0,
              domain: {
                start: 0,
                end: 1
              }
            }
          }]
        },
        height: `${chartConfig.height}px`,
        width: `${chartConfig.width}px`
      }
    })

    flushD3Transitions()
  })

  afterEach(function () {
    stubGetBoundingClientRect.teardown()
    stubLodashDebounce.teardown()
    stubGetBBox.teardown()
    stubCreateSVGPoint.teardown()
    stubGetScreenCTM.teardown()

    wrapper.destroy()
    wrapper = null
  })

  it('Should create group, text and tspan', function () {
    expect(wrapper.find('.geo-chart').exists()).toBe(true)
    setupTextDescriptions([settings], wrapper.vm.d3Instance, { chart })
    expect(wrapper.find('.geo-chart-text-descriptions').exists()).toBe(true)
    expect(wrapper.findAll('.geo-chart-text-descriptions text').exists()).toBe(true)
    expect(wrapper.findAll('.geo-chart-text-descriptions text tspan').exists()).toBe(true)
  })

  it('Should add custom class to descriptions', function () {
    setupTextDescriptions([settings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    expect(wrapper.find('.geo-chart-text-descriptions.my-group-class').exists()).toBe(true)
  })

  it('Should add custom class to texts', function () {
    setupTextDescriptions([settings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    expect(wrapper.find('.geo-chart-text-descriptions text.my-text-class').exists()).toBe(true)
  })

  it('Should translate group to textOrigin', function () {
    expect(wrapper.find('.geo-chart').exists()).toBe(true)
    setupTextDescriptions([settings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    const descriptions = wrapper.find('.geo-chart-text-descriptions')
    expect(descriptions.exists()).toBe(true)

    const transformMatches = getTransformTranslateMatches(descriptions)
    expect(parseInt(transformMatches[1])).toBe(settings.textOrigin[0])
    expect(parseInt(transformMatches[2])).toBe(settings.textOrigin[1])
  })

  it('Should create one text and tspan as data items and content return items', function () {
    const newSettings = _.assign({}, settings, {
      textOptions: {
        content (d) {
          return [{ text: d.value }]
        }
      },
      data: [
        { value: 'my text' }
      ]
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(newSettings.data.length)

    for (let i = 0; i < textElems.length; i++) {
      const tspanElems = textElems.at(i).findAll('tspan')
      expect(tspanElems).toHaveLength(newSettings.textOptions.content({}).length)

      for (let i = 0; i < tspanElems.length; i++) {
        expect(tspanElems.at(i).text()).toBe(newSettings.data[i].value)
      }
    }
  })

  it('Should create multiple tspan\'s', function () {
    const texts = {
      0: '#',
      1: '200'
    }
    const newSettings = _.assign({}, settings, {
      textOptions: {
        content () {
          return [{ text: texts[0] }, { text: texts[1] }]
        }
      }
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(newSettings.data.length)

    for (let i = 0; i < textElems.length; i++) {
      const tspanElems = textElems.at(i).findAll('tspan')
      expect(textElems.at(i).text()).toBe(texts[0] + texts[1])
      expect(tspanElems).toHaveLength(newSettings.textOptions.content({}).length)

      for (let i = 0; i < tspanElems.length; i++) {
        expect(tspanElems.at(i).text()).toBe(texts[i])
      }
    }
  })

  it('Should add custom class to tspan', function () {
    const newSettings = _.assign({}, settings, {
      textOptions: {
        content () {
          return [{ text: 'text', cssClass: 'my-tspan-class' }]
        }
      }
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(newSettings.data.length)

    for (let i = 0; i < textElems.length; i++) {
      expect(textElems.at(i).findAll('tspan.my-tspan-class').exists()).toBe(true)
    }
  })

  it('Should position the text in the mid point of bbox height', function () {
    const newSettings = _.assign({}, settings, {
      data: [
        { yPos: 30 }
      ]
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(newSettings.data.length)

    for (let i = 0; i < textElems.length; i++) {
      const yPosText = newSettings.data[i].yPos - bbox.height / 2
      expect(textElems.at(i).attributes('y')).toBe(yPosText.toString())
    }
  })

  it('Should not render sencond text if positions overlap using withoutReadjustment algorithm', function () {
    const newSettings = _.assign({}, settings, {
      data: [
        { yPos: 30 },
        { yPos: 30 }
      ]
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(1)
  })

  it('Should render sencond text if positions overlap using backPressure algorithm', function () {
    const newSettings = _.assign({}, settings, {
      algorithm: ALGORITHMS.backPressure,
      data: [
        { yPos: 30 },
        { yPos: 30 }
      ]
    })

    setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    const textElems = wrapper.findAll('.geo-chart-text-descriptions text')
    expect(textElems).toHaveLength(2)
  })

  it('Should return an array with data and Y position of the shown texts', function () {
    const newSettings = _.assign({}, settings, {
      data: [
        { yPos: 60 },
        { yPos: 30 }
      ]
    })

    const dataWithPositions = setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    expect(dataWithPositions.length).toBe(1)

    for (let i = 0; i < dataWithPositions.length; i++) {
      expect(dataWithPositions[i].length).toBe(newSettings.data.length)

      for (let j = 0; j < dataWithPositions[i].length; j++) {
        expect(dataWithPositions[i][j].data).toEqual(newSettings.data[j])
        expect(dataWithPositions[i][j].position).toEqual(newSettings.data[j].yPos - bbox.height / 2)
      }
    }
  })

  it('Should not return data that overlaps', function () {
    const newSettings = _.assign({}, settings, {
      data: [
        { yPos: 60 },
        { yPos: 60 }
      ]
    })

    const dataWithPositions = setupTextDescriptions([newSettings], wrapper.vm.d3Instance, { chart })
    flushD3Transitions()

    expect(dataWithPositions.length).toBe(1)

    for (let i = 0; i < dataWithPositions.length; i++) {
      expect(dataWithPositions[i].length).toBe(1)

      for (let j = 0; j < dataWithPositions[i].length; j++) {
        expect(dataWithPositions[i][j].data).toEqual(newSettings.data[j])
        expect(dataWithPositions[i][j].position).toEqual(newSettings.data[j].yPos - bbox.height / 2)
      }
    }
  })
})
