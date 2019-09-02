import _ from 'lodash'
import GeoTooltip, {
  areEdgesInsideViewport,
  getViewportEdges,
  getTooltipEdges,
  getAvailableSpaceForTooltipContent,
  getTooltipFittingAlignment
} from '@/elements/GeoTooltip/GeoTooltip.vue'

describe('GeoTooltip', function () {
  afterEach(function () {
    jest.restoreAllMocks()
  })

  describe('#areEdgesInsideViewport', function () {
    beforeEach(function () {
      jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 50)
      jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 20)
      jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 150)
      jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
    })

    describe('When tooltip is top-positioned', function () {
      describe('When tooltip is start-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 40,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 160,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 40
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })
      })

      describe('When tooltip is end-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 90,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })
      })

      describe('When tooltip is middle-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 70,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })
      })
    })

    describe('When tooltip is bottom-positioned', function () {
      describe('When tooltip is start-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 40,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 160,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 40
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })
      })

      describe('When tooltip is end-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 90,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })
      })

      describe('When tooltip is middle-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 70,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 10
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })
      })
    })

    describe('When tooltip is leading-positioned', function () {
      describe('When tooltip is start-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 110,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 70,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 210,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 10
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 40
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })
      })

      describe('When tooltip is end-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 90,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 40
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })
      })

      describe('When tooltip is middle-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 70,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 205,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 30
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })
      })
    })

    describe('When tooltip is trailing-positioned', function () {
      describe('When tooltip is start-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 110,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 40,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 190,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 10
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 40
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(false)
        })
      })

      describe('When tooltip is end-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 40,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 195,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 40
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(false)
        })
      })

      describe('When tooltip is middle-aligned', function () {
        it('Should return «true» if edges are inside viewport', function () {
          const absoluteOffset = {
            x: 120,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(true)
        })

        it('Should return «false» if leading edge is outside viewport', function () {
          const absoluteOffset = {
            x: 40,
            y: 50
          }

          const tooltipContentSize = {
            width: 60,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if trailing edge is outside viewport', function () {
          const absoluteOffset = {
            x: 195,
            y: 50
          }

          const tooltipContentSize = {
            width: 10,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if top edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 30
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })

        it('Should return «false» if bottom edge is outside viewport', function () {
          const absoluteOffset = {
            x: 100,
            y: 90
          }

          const tooltipContentSize = {
            width: 30,
            height: 30
          }

          expect(areEdgesInsideViewport(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.middle
          )).toEqual(false)
        })
      })
    })
  })

  describe('#getViewportEdges', function () {
    it('Should return proper edges', function () {
      jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 50)
      jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 20)
      jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 10)
      jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 30)

      expect(getViewportEdges()).toEqual({
        leading: 50,
        trailing: 50 + 10,
        top: 20,
        bottom: 20 + 30
      })
    })
  })

  describe('#getTooltipEdges', function () {
    const absoluteOffset = {
      x: 10,
      y: 20
    }
    const tooltipContentSize = {
      width: 100,
      height: 30
    }

    describe('When top-positioned', function () {
      it('Should return proper edges when tooltip is start-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          leading: 10,
          trailing: 110,
          top: -10,
          bottom: 20
        })
      })

      it('Should return proper edges when tooltip is end-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          leading: -90,
          trailing: 10,
          top: -10,
          bottom: 20
        })
      })

      it('Should return proper edges when tooltip is middle-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          leading: -40,
          trailing: 60,
          top: -10,
          bottom: 20
        })
      })
    })

    describe('When bottom-positioned', function () {
      it('Should return proper edges when tooltip is start-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          leading: 10,
          trailing: 110,
          top: 20,
          bottom: 50
        })
      })

      it('Should return proper edges when tooltip is end-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          leading: -90,
          trailing: 10,
          top: 20,
          bottom: 50
        })
      })

      it('Should return proper edges when tooltip is middle-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          leading: -40,
          trailing: 60,
          top: 20,
          bottom: 50
        })
      })
    })

    describe('When leading-positioned', function () {
      it('Should return proper edges when tooltip is start-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          leading: -90,
          trailing: 10,
          top: 20,
          bottom: 50
        })
      })

      it('Should return proper edges when tooltip is end-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          leading: -90,
          trailing: 10,
          top: -10,
          bottom: 20
        })
      })

      it('Should return proper edges when tooltip is middle-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          leading: -90,
          trailing: 10,
          top: 5,
          bottom: 35
        })
      })
    })

    describe('When trailing-positioned', function () {
      it('Should return proper edges when tooltip is start-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          leading: 10,
          trailing: 110,
          top: 20,
          bottom: 50
        })
      })

      it('Should return proper edges when tooltip is end-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          leading: 10,
          trailing: 110,
          top: -10,
          bottom: 20
        })
      })

      it('Should return proper edges when tooltip is middle-aligned', function () {
        expect(getTooltipEdges(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          leading: 10,
          trailing: 110,
          top: 5,
          bottom: 35
        })
      })
    })
  })

  describe('#getAvailableSpaceForTooltipContent', function () {
    const absoluteOffset = {
      x: 60,
      y: 25
    }

    beforeEach(function () {
      jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 50)
      jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 20)
      jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 100)
      jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
    })

    describe('When tooltip is top-positioned', function () {
      it('Should return proper space when tooltip is start-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          horizontal: 90,
          vertical: 5
        })
      })

      it('Should return proper space when tooltip is end-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          horizontal: 10,
          vertical: 5
        })
      })

      it('Should return proper space when tooltip is middle-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          horizontal: 100,
          vertical: 5
        })
      })
    })

    describe('When tooltip is bottom-positioned', function () {
      it('Should return proper space when tooltip is start-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          horizontal: 90,
          vertical: 55
        })
      })

      it('Should return proper space when tooltip is end-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          horizontal: 10,
          vertical: 55
        })
      })

      it('Should return proper space when tooltip is middle-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.bottom,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          horizontal: 100,
          vertical: 55
        })
      })
    })

    describe('When tooltip is leading-positioned', function () {
      it('Should return proper space when tooltip is start-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          horizontal: 10,
          vertical: 55
        })
      })

      it('Should return proper space when tooltip is end-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          horizontal: 10,
          vertical: 5
        })
      })

      it('Should return proper space when tooltip is middle-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.leading,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          horizontal: 10,
          vertical: 60
        })
      })
    })

    describe('When tooltip is trailing-positioned', function () {
      it('Should return proper space when tooltip is start-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual({
          horizontal: 90,
          vertical: 55
        })
      })

      it('Should return proper space when tooltip is end-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.end
        )).toEqual({
          horizontal: 90,
          vertical: 5
        })
      })

      it('Should return proper space when tooltip is middle-aligned', function () {
        expect(getAvailableSpaceForTooltipContent(
          absoluteOffset,
          GeoTooltip.constants.POSITIONS.trailing,
          GeoTooltip.constants.ALIGNMENTS.middle
        )).toEqual({
          horizontal: 90,
          vertical: 60
        })
      })
    })
  })

  describe('#getTooltipFittingAlignment', function () {
    describe('When tooltip is top-positioned', function () {
      const absoluteOffset = {
        x: 120,
        y: 50
      }
      const tooltipContentSize = {
        width: 100,
        height: 30
      }

      describe('When tooltip would fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 10)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
        })

        for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
          const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

          it(`Should return requested alignment if it is «${alignment}»`, function () {
            expect(getTooltipFittingAlignment(
              absoluteOffset,
              tooltipContentSize,
              GeoTooltip.constants.POSITIONS.top,
              alignment
            )).toEqual(alignment)
          })
        }
      })

      describe('When tooltip does not fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
        })

        it('Should return «start» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 100)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.start)
        })

        it('Should return «end» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 20)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 120)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.end)
        })

        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 120)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.top,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })

      it('Should return «middle» alignment if no alignment fits', function () {
        jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
        jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
        jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 80)
        jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 15)

        expect(getTooltipFittingAlignment(
          absoluteOffset,
          tooltipContentSize,
          GeoTooltip.constants.POSITIONS.top,
          GeoTooltip.constants.ALIGNMENTS.start
        )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
      })
    })

    describe('When tooltip is bottom-positioned', function () {
      const absoluteOffset = {
        x: 120,
        y: 50
      }
      const tooltipContentSize = {
        width: 100,
        height: 20
      }

      describe('When tooltip would fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 10)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
        })

        for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
          const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

          it(`Should return requested alignment if it is «${alignment}»`, function () {
            expect(getTooltipFittingAlignment(
              absoluteOffset,
              tooltipContentSize,
              GeoTooltip.constants.POSITIONS.bottom,
              alignment
            )).toEqual(alignment)
          })
        }
      })

      describe('When tooltip does not fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)
        })

        it('Should return «start» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 100)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.start)
        })

        it('Should return «end» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 20)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 120)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.end)
        })

        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 120)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })

      describe('When tooltip does not fit in any alignment', function () {
        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 80)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 15)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.bottom,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })
    })

    describe('When tooltip is leading-positioned', function () {
      const absoluteOffset = {
        x: 120,
        y: 50
      }
      const tooltipContentSize = {
        width: 100,
        height: 30
      }

      describe('When tooltip would fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 10)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 80)
        })

        for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
          const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

          it(`Should return requested alignment if it is «${alignment}»`, function () {
            expect(getTooltipFittingAlignment(
              absoluteOffset,
              tooltipContentSize,
              GeoTooltip.constants.POSITIONS.leading,
              alignment
            )).toEqual(alignment)
          })
        }
      })

      describe('When tooltip does not fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 10)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
        })

        it('Should return «start» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 35)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.start)
        })

        it('Should return «end» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.end)
        })

        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 40)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 20)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })

      describe('When tooltip does not fit in any alignment', function () {
        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 50)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 80)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 15)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.leading,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })
    })

    describe('When tooltip is trailing-positioned', function () {
      const absoluteOffset = {
        x: 120,
        y: 50
      }
      const tooltipContentSize = {
        width: 100,
        height: 30
      }

      describe('When tooltip would fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 10)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 80)
        })

        for (const alignmentKey of Object.keys(GeoTooltip.constants.ALIGNMENTS)) {
          const alignment = GeoTooltip.constants.ALIGNMENTS[alignmentKey]

          it(`Should return requested alignment if it is «${alignment}»`, function () {
            expect(getTooltipFittingAlignment(
              absoluteOffset,
              tooltipContentSize,
              GeoTooltip.constants.POSITIONS.trailing,
              alignment
            )).toEqual(alignment)
          })
        }
      })

      describe('When tooltip does not fit requested alignment', function () {
        beforeEach(function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 100)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 230)
        })

        it('Should return «start» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 35)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.end
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.start)
        })

        it('Should return «end» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 15)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 60)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.end)
        })

        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 40)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 20)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })

      describe('When tooltip does not fit in any alignment', function () {
        it('Should return «middle» alignment if it fits', function () {
          jest.spyOn(document.documentElement, 'scrollLeft', 'get').mockImplementation(() => 60)
          jest.spyOn(document.documentElement, 'scrollTop', 'get').mockImplementation(() => 50)
          jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 80)
          jest.spyOn(document.documentElement, 'clientHeight', 'get').mockImplementation(() => 15)

          expect(getTooltipFittingAlignment(
            absoluteOffset,
            tooltipContentSize,
            GeoTooltip.constants.POSITIONS.trailing,
            GeoTooltip.constants.ALIGNMENTS.start
          )).toEqual(GeoTooltip.constants.ALIGNMENTS.middle)
        })
      })
    })
  })
})
