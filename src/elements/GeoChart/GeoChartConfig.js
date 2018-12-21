import { POSITIONS } from './GeoChartAxis'
import { DIMENSIONS } from './GeoChartBars'
import { SCALE_TYPES } from './GeoChartScale'

export const scaleLinearSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['type', 'valueForOrigin', 'domain'],
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
  required: ['id', 'keyForValues', 'position', 'scale'],
  properties: {
    id: {
      type: 'string'
    },
    keyForValues: {
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
    },
    // Function taking as first parameter an array of CSS classes that would
    // be set by default. Should return the array of CSS classes to be
    // finally set. Some addtional CSS classes required by D3 might be added
    // regardless this customization. Use this function to customize which CSS
    // classes are set to the group containing this axis.
    cssClasses: {},
    ticks: {
      type: 'object',
      additionalProperties: false,
      properties: {
        count: {
          type: 'integer',
          minimum: 0
        },
        // Function taking as first parameter an array of CSS classes that would
        // be set by default. Should return the array of CSS classes to be
        // finally set. Some addtional CSS classes required by D3 might be added
        // regardless this customization. Use this function to customize which
        // CSS classes are set to the group inside this axis containing the
        // ticks lines and labels.
        cssClasses: {},
        // Function taking as first parameter the value of the axis in the domain,
        // corresponding to the series being drawed and as second parameter its
        // index. Should return an array of strings to use for ticks of this axis.
        format: {},
        label: {
          // Takes as parameter a drawingEnvironment and should return a number
          // of px to use as maximum width of tick texts of this axis.
          maximumWidth: {},
          // Takes as parameters the value of the axis in the domain,
          // corresponding to the series being transformed, as second parameter
          // its index and as third one a drawingEnvironment. Should return a
          // valid transformation string. https://github.com/trinary/d3-transform
          transform: {}
        }
      }
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
