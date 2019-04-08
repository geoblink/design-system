import { POSITIONS } from '../GeoChartAxis/GeoChartAxis'
import { DIMENSIONS } from '../GeoChartBars/GeoChartBars'
import { SCALE_TYPES } from '../GeoChartScale/GeoChartScale'

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
  required: ['type', 'valueForOrigin', 'domain'],
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
    // finally set. Some additional CSS classes required by D3 might be added
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
        // finally set. Some additional CSS classes required by D3 might be added
        // regardless this customization. Use this function to customize which
        // CSS classes are set to the group inside this axis containing the
        // ticks lines and labels.
        cssClasses: {},
        // Function taking as first parameter the value of the axis in the domain,
        // corresponding to the series being drawed and as second parameter its
        // index. Should return a string.
        format: {}
      }
    },
    label: {
      content: {
        type: 'string'
      },
      offset: {
        type: 'integer'
      }
    }
  }
}

export const guidelineConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  oneOf: [
    { required: [ 'idAxis' ], not: { required: ['axisConfig'] } },
    { required: [ 'axisConfig' ], not: { required: ['idAxis'] } }
  ],
  properties: {
    idAxis: {
      type: 'string'
    },
    axisConfig: axisConfigJsonSchema,
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to each line.
    // Note that there might be some of the default classes might be added
    // regardless to your customization as they are required internally.
    cssClasses: {},
    guidelines: {
      type: 'object',
      additionalProperties: false,
      properties: {
        count: {
          type: 'integer',
          minimum: 0
        },
        outerLines: {
          type: 'boolean'
        },
        // Function taking as first parameter an array of CSS classes that would
        // be set by default. Should return the array of CSS classes to be
        // finally set. Some additional CSS classes required by D3 might be added
        // regardless this customization. Use this function to customize which
        // CSS classes are set to the group inside this axis containing the
        // ticks lines and labels.
        cssClasses: {}
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
          { required: ['normalOffset'] },
          { required: ['naturalNormalOffset'] }
        ]
      }
    }, {
      required: ['normalOffset'],
      not: { required: ['naturalNormalOffset'] }
    }, {
      required: ['naturalNormalOffset'],
      not: { required: ['normalOffset'] }
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
    },
    tooltip: {
      required: ['content'],
      additionalProperties: false,
      type: 'object',
      properties: {
        // Function taking as first parameter a single item of data array and as
        // second parameter its index. Should return the text to be displayed as
        // tooltip for the bar corresponding to given value.
        content: {},
        // Function taking as parameters the browser MouseEvent triggering the
        // tooltip. Should return the offset of the tooltip as an object with an
        // `x` and a `y` key, both holding numbers. If not provided offset will
        // be 0.
        offset: {}
      }
    },
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {}
  }
}

export const colorBarConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data', 'dimension', 'idHorizontalAxis', 'idVerticalAxis', 'normalValue'],
  allOf: [{
    oneOf: [{
      not: {
        anyOf: [
          { required: ['normalOffset'] },
          { required: ['naturalNormalOffset'] }
        ]
      }
    }, {
      required: ['normalOffset'],
      not: { required: ['naturalNormalOffset'] }
    }, {
      required: ['naturalNormalOffset'],
      not: { required: ['normalOffset'] }
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
  }, {
    oneOf: [{
      not: {
        anyOf: [
          { required: ['highlightedWidth'] },
          { required: ['naturalHighlightedWidth'] }
        ]
      }
    }, {
      required: ['highlightedWidth'],
      not: { required: ['naturalHighlightedWidth'] }
    }, {
      required: ['naturalHighlightedWidth'],
      not: { required: ['highlightedWidth'] }
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
    },
    normalValue: {
      type: 'number'
    },
    naturalHighlightedWidth: {
      type: 'number'
    },
    highlightedWidth: {
      type: 'number'
    },
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {}
  }
}

export const pieConfigJsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['data', 'keyForValues'],
  properties: {
    data: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object'
      }
    },
    innerRadius: {
      type: 'number'
    },
    outerRadius: {
      type: 'number'
    },
    keyForValues: {
      type: 'string'
    },
    tooltip: {
      required: ['content'],
      additionalProperties: false,
      type: 'object',
      properties: {
        // Function taking as first parameter a single item of data array and as
        // second parameter its index. Should return the text to be displayed as
        // tooltip for the bar corresponding to given value.
        content: {},
        // Function taking as parameters the browser MouseEvent triggering the
        // tooltip. Should return the offset of the tooltip as an object with an
        // `x` and a `y` key, both holding numbers. If not provided offset will
        // be 0.
        offset: {}
      }
    },
    text: {
      type: 'object',
      additionalProperties: false,
      required: ['content'],
      properties: {
        margin: {
          type: 'number'
        },
        // Function taking as first parameter a single item of data array and as
        // second parameter its index. Should return an array with options see GeoChart.TextDescriptionOptions.
        content: {},
        cssClassesGroups: {},
        cssClassesTexts: {}
      }
    },
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {}
  }
}

export const lineSegmentsConfigSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['circleData', 'dimension', 'idHorizontalAxis', 'idVerticalAxis', 'normalValue'],
  allOf: [
    {
      not: {
        required: ['circleRadius', 'circleNaturalMargin']
      }
    },
    {
      oneOf: [{
        not: {
          anyOf: [
            { required: ['normalOffset'] },
            { required: ['naturalNormalOffset'] }
          ]
        }
      }, {
        required: ['normalOffset'],
        not: { required: ['naturalNormalOffset'] }
      }, {
        required: ['naturalNormalOffset'],
        not: { required: ['normalOffset'] }
      }]
    }, {
      oneOf: [{
        not: {
          anyOf: [
            { required: ['lineWidth'] },
            { required: ['lineNaturalWidth'] }
          ]
        }
      }, {
        required: ['lineWidth'],
        not: { required: ['lineNaturalWidth'] }
      }, {
        required: ['lineNaturalWidth'],
        not: { required: ['lineWidth'] }
      }]
    }, {
      oneOf: [{
        not: {
          anyOf: [
            { required: ['circleRadius'] },
            { required: ['circleNaturalRadius'] }
          ]
        }
      }, {
        required: ['circleRadius'],
        not: { required: ['circleNaturalRadius'] }
      }, {
        required: ['circleNaturalRadius'],
        not: { required: ['circleRadius'] }
      }]
    }, {
      oneOf: [{
        not: {
          anyOf: [
            { required: ['circleMargin'] },
            { required: ['circleNaturalMargin'] }
          ]
        }
      }, {
        required: ['circleMargin'],
        not: { required: ['circleNaturalMargin'] }
      }, {
        required: ['circleNaturalMargin'],
        not: { required: ['circleMargin'] }
      }]
    }
  ],
  properties: {
    circleData: {
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
    dimension: {
      type: 'string',
      enum: Object.values(DIMENSIONS)
    },
    idHorizontalAxis: {
      type: 'string'
    },
    idVerticalAxis: {
      type: 'string'
    },
    normalValue: {
      type: 'number'
    },
    lineWidth: {
      type: 'number'
    },
    lineNaturalWidth: {
      type: 'number'
    },
    circleRadius: {
      type: 'number'
    },
    circleNaturalRadius: {
      type: 'number'
    },
    circleMargin: {
      type: 'number'
    },
    circleNaturalMargin: {
      type: 'number'
    },
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {},
    // Function that returns the property that is needed by D3 to track data changes correctly
    trackByKey: {}
  }
}

export const lineConfigSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['lineData', 'dimension', 'idHorizontalAxis', 'idVerticalAxis', 'lineWidth'],
  properties: {
    lineData: {
      type: 'array',
      additionalItems: false,
      items: {
        type: 'object'
      }
    },
    idHorizontalAxis: {
      type: 'string'
    },
    idVerticalAxis: {
      type: 'string'
    },
    lineWidth: {
      type: 'number'
    },
    dimension: {
      type: 'string',
      enum: Object.values(DIMENSIONS)
    },
    interpolationFn: {},
    tooltip: {},
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {}
  }
}

export const anchoredShapesConfigSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'shapeData',
    'dimension',
    'idHorizontalAxis',
    'idVerticalAxis',
    'normalValue',
    'getAnchorPosition',
    'getShapeSize',
    'getShapePath'
  ],
  allOf: [
    {
      oneOf: [{
        not: {
          anyOf: [
            { required: ['normalOffset'] },
            { required: ['naturalNormalOffset'] }
          ]
        }
      }, {
        required: ['normalOffset'],
        not: { required: ['naturalNormalOffset'] }
      }, {
        required: ['naturalNormalOffset'],
        not: { required: ['normalOffset'] }
      }]
    }
  ],
  properties: {
    shapeData: {
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
    dimension: {
      type: 'string',
      enum: [DIMENSIONS.horizontal]
    },
    idHorizontalAxis: {
      type: 'string'
    },
    idVerticalAxis: {
      type: 'string'
    },
    normalValue: {
      type: 'number'
    },
    // Function taking as first parameter an array of CSS classes that would be
    // set by default. Should return the array of CSS classes to be finally set.
    // Use this function to customize which CSS classes are set to the rect for
    // the bar of each item. Note that there might be some of the default classes
    // might be added regardless to your customization as they are required
    // internally.
    cssClasses: {},
    // Function that receives an item from the data and should return either
    // leading or trailing to determine the position
    // of the shape in relation to the axis. Leading for left/above the axis and trailing
    // for right/below it.
    getAnchorPosition: {},
    // Function that returns an object with width and height values so the shape can be
    // drawn with a polygon.
    getShapeSize: {},
    // Function that returns a path to render the desired shape. The DS integrates the function
    // to render a triangle. The rest of the algorithms for the shapes should be provided
    // by the developer.
    getShapePath: {},
    // Function that returns the property that is needed by D3 to track data changes correctly
    trackByKey: {},
    text: {
      type: 'object',
      additionalProperties: false,
      properties: {
        // Function that returns an array of objects, each one containing a text property and a cssClass property
        content: {}
      }
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
  oneOf: [{
    required: ['axisGroups']
  }, {
    required: ['pieConfig']
  }],
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
    colorBarGroups: {
      type: 'array',
      additionalItems: false,
      items: colorBarConfigJsonSchema
    },
    lineSegmentsGroups: {
      type: 'array',
      additionalItems: false,
      items: lineSegmentsConfigSchema
    },
    lineGroups: {
      type: 'array',
      additionalItems: false,
      items: lineConfigSchema
    },
    anchoredShapesGroups: {
      type: 'array',
      additionalItems: false,
      items: anchoredShapesConfigSchema
    },
    guidelinesGroups: {
      type: 'array',
      additionalItems: false,
      items: guidelineConfigJsonSchema
    },
    pieConfig: pieConfigJsonSchema,
    labelGroups: {
      type: 'array',
      additionalItems: false,
      items: labelConfigJsonSchema
    }
  }
}
