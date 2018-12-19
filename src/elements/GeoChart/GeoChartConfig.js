import { POSITIONS } from './GeoChart.axis'
import { DIMENSIONS } from './GeoChart.bars'

export const axisConfigJsonSchema = {
  type: 'object',
  properties: {
    ticks: {
      type: 'integer',
      minimum: 0
    },
    position: {
      type: 'string',
      enum: Object.values(POSITIONS)
    },
    scale: 'object'
  }
}

export const barConfigJsonSchema = {
  type: 'object',
  required: 'data',
  properties: {
    additionalProperties: false,
    required: ['data', 'dimension', 'scale'],
    data: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object'
      }
    },
    dimension: {
      type: 'string',
      enum: Object.values(DIMENSIONS)
    },
    scale: {
      type: 'object',
      additionalItems: false,
      required: ['horizontal', 'vertical'],
      properties: {
        horizontal: 'object',
        vertical: 'object'
      }
    }
  }
}

export const chartConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['chartSize', 'chartMargin', 'axisGroups'],
  properties: {
    chartSize: {
      type: 'object',
      required: ['height', 'width'],
      additionalProperties: false,
      properties: {
        height: 'number',
        width: 'number'
      }
    },
    chartMargin: {
      type: 'object',
      required: ['top', 'right', 'bottom', 'left'],
      additionalProperties: false,
      properties: {
        top: 'number',
        left: 'number',
        bottom: 'number',
        right: 'number'
      }
    },
    axisGroups: {
      type: 'array',
      additionalItems: false,
      items: axisConfigJsonSchema,
      minItems: 1
    },
    barGroups: {
      type: 'array',
      additionalItems: false,
      items: barConfigJsonSchema
    }
  }
}
