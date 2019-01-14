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

export const scaleLogarithmicSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['type', 'valueForOrigin', 'domain'],
  properties: {
    type: {
      const: SCALE_TYPES.logarithmic
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
            type: 'number',
            exclusiveMinimum: 0
          },
          end: {
            type: 'number',
            exclusiveMinimum: 0
          }
        }
      }, {
        type: 'array',
        additionalItems: false,
        items: {
          type: 'number',
          exclusiveMinimum: 0
        }
      }]
    },
    base: {
      type: 'number'
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
      type: ['string', 'number']
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
        required: ['type', 'value', 'relativeToAxis'],
        properties: {
          type: {
            const: POSITIONS.anchoredToAxis
          },
          value: {
            type: 'number'
          },
          relativeToAxis: {
            type: 'string'
          }
        }
      }]
    },
    scale: {
      type: 'object',
      oneOf: [
        scaleLinearSchema,
        scaleLogarithmicSchema,
        scaleCategoricalSchema
      ]
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
        // index. Should return an array of objects with a `text` key for the
        // text to be displayed in the tick and a `cssClasses` key for an array
        // of CSS classes to be applied to the text.
        format: {},
        label: {
          type: 'object',
          properties: {
            // Takes as parameter a drawingEnvironment and should return a number
            // of px to use as maximum width of tick texts of this axis.
            maximumWidth: {}
          }
        }
      }
    }
  }
}

export const barConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data', 'dimension', 'idHorizontalAxis', 'idVerticalAxis'],
  allOf: [{
    oneOf: [{
      not: {
        anyOf: [
          { required: ['normal'] },
          { required: ['naturalNormal'] }
        ]
      }
    }, {
      required: ['normal'],
      not: { required: ['naturalNormal'] }
    }, {
      required: ['naturalNormal'],
      not: { required: ['normal'] }
    }]
  }, {
    oneOf: [{
      not: {
        anyOf: [
          { required: ['width'] },
          { required: ['naturalWidth'] }
        ]
      }
    }, {
      required: ['width'],
      not: { required: ['naturalWidth'] }
    }, {
      required: ['naturalWidth'],
      not: { required: ['width'] }
    }]
  }],
  properties: {
    data: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object'
      }
    },
    normalOffset: {
      type: 'number'
    },
    naturalNormalOffset: {
      type: 'number'
    },
    width: {
      type: 'number'
    },
    naturalWidth: {
      type: 'number'
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

export const labelConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data', 'idVerticalAxis'],
  properties: {
    data: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object',
        required: ['labels'],
        additionalProperties: true,
        properties: {
          labels: {
            type: 'array',
            additionalItems: false,
            items: {
              type: 'object',
              required: ['text'],
              additionalProperties: false,
              properties: {
                text: {
                  type: 'string'
                },
                padding: {
                  type: 'object',
                  required: ['top', 'right', 'bottom', 'left'],
                  additionalProperties: false,
                  properties: {
                    top: {
                      type: 'number'
                    },
                    right: {
                      type: 'number'
                    },
                    bottom: {
                      type: 'number'
                    },
                    left: {
                      type: 'number'
                    }
                  }
                },
                margin: {
                  type: 'object',
                  required: ['top', 'right', 'bottom', 'left'],
                  additionalProperties: false,
                  properties: {
                    top: {
                      type: 'number'
                    },
                    right: {
                      type: 'number'
                    },
                    bottom: {
                      type: 'number'
                    },
                    left: {
                      type: 'number'
                    }
                  }
                },
                cornerRadius: {
                  type: 'number'
                },
                // Function taking as first parameter an array of CSS classes
                // that would be set by default. Should return the array of CSS
                // classes to be finally set. Use this function to customize
                // which CSS classes are set to the group containing the text.
                // Note that there might be some of the default classes might be
                // added regardless to your customization as they are required
                // internally.
                cssClasses: {}
              }
            }
          }
        }
      }
    },
    idVerticalAxis: {
      type: 'string'
    }
  }
}

export const jsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['axisGroups'],
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
    },
    labelGroups: {
      type: 'array',
      additionalItems: false,
      items: labelConfigJsonSchema
    }
  }
}
