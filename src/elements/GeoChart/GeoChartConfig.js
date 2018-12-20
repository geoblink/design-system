import { POSITIONS } from './GeoChartAxis'
import { DIMENSIONS } from './GeoChartBars'
import { SCALE_TYPES } from './GeoChartScale'

export const scaleLinearSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['type', 'domain'],
  properties: {
    type: {
      const: SCALE_TYPES.linear
    },
    valueForOrigin: {
      type: 'number'
    },
    domain: {
      oneOf: [{
        type: 'object',
        additionalProperties: false,
        required: ['start', 'end'],
        properties: {
          start: {
            type: 'number'
          },
          end: {
            type: 'number'
          }
        }
      }, {
        type: 'array',
        additionalItems: false,
        items: {
          type: 'number'
        }
      }]
    }
  }
}

export const scaleCategoricalSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['type', 'domain'],
  properties: {
    type: {
      const: SCALE_TYPES.categorical
    },
    valueForOrigin: {
      type: 'string'
    },
    domain: {
      type: 'array',
      additionalItems: false,
      items: {
        type: ['string', 'number']
      }
    },
    padding: {
      type: 'object',
      additionalProperties: false,
      properties: {
        inner: {
          type: 'number'
        },
        outer: {
          type: 'number'
        }
      }
    }
  }
}

export const axisConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['id', 'position', 'scale'],
  properties: {
    ticks: {
      type: 'object',
      additionalProperties: false,
      properties: {
        count: {
          type: 'integer',
          minimum: 0
        },
        format: {},
        labelTransform: {}
      }
    },
    id: {
      type: 'string'
    },
    position: {
      oneOf: [{
        type: 'object',
        additionalProperties: false,
        required: ['type'],
        properties: {
          type: {
            type: 'string',
            enum: [
              POSITIONS.top,
              POSITIONS.bottom,
              POSITIONS.horizontallyCenteredInTheMiddle,
              POSITIONS.left,
              POSITIONS.right,
              POSITIONS.verticallyCenteredInTheMiddle
            ]
          }
        }
      }, {
        type: 'object',
        additionalProperties: false,
        required: ['type', 'value', 'relativeToScale'],
        properties: {
          type: {
            const: POSITIONS.anchoredToScale
          },
          value: {
            type: 'number'
          },
          relativeToScale: {
            type: 'string'
          }
        }
      }]
    },
    scale: {
      type: 'object',
      oneOf: [scaleLinearSchema, scaleCategoricalSchema]
    }
  }
}

export const barConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data', 'dimension', 'idHorizontalAxis', 'idVerticalAxis'],
  properties: {
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
    idHorizontalAxis: {
      type: 'string'
    },
    idVerticalAxis: {
      type: 'string'
    }
  }
}

export const chartConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['chart', 'axisGroups'],
  properties: {
    chart: {
      type: 'object',
      additionalProperties: false,
      required: ['margin'],
      properties: {
        animationsDurationInMilliseconds: {
          type: 'number'
        },
        margin: {
          type: 'object',
          required: ['top', 'right', 'bottom', 'left'],
          additionalProperties: false,
          properties: {
            top: {
              type: 'number'
            },
            left: {
              type: 'number'
            },
            bottom: {
              type: 'number'
            },
            right: {
              type: 'number'
            }
          }
        }
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
