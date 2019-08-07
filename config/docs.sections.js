module.exports = [
  {
    name: 'Geoblink\'s Design System',
    content: '../docs/getting-started.md',
    components: '../docs/components/status/**/[A-Z]*.vue',
    sectionDepth: 1,
    exampleMode: 'hide',
    usageMode: 'hide'
  },
  {
    name: 'Design Principles',
    content: '../docs/principles.md'
  },
  {
    name: 'Voice & Tone',
    content: '../docs/voice-and-tone.md'
  },
  {
    name: 'Design Tokens',
    content: '../docs/tokens.md',
    sectionDepth: 1,
    exampleMode: 'hide',
    usageMode: 'hide',
    components: () => [
      '../docs/components/tokens/Color.vue',
      '../docs/components/tokens/FontSize.vue',
      '../docs/components/tokens/Spacing.vue',
      '../docs/components/tokens/All.vue'
    ]
  },
  {
    name: 'Elements',
    content: '../docs/elements.md',
    exampleMode: 'expand',
    usageMode: 'expand',
    sectionDepth: 1,
    sections: [
      {
        name: 'Alerts & Feedback',
        sectionDepth: 1,
        sections: [
          {
            name: 'GeoActivityIndicator',
            components: '../src/elements/GeoActivityIndicator/GeoActivityIndicator*.vue',
            sectionDepth: 0
          }, {
            name: 'GeoFeedbackBox',
            components: '../src/elements/GeoFeedbackBox/Geo*FeedbackBox.vue',
            sectionDepth: 0
          }, {
            name: 'GeoAlert',
            components: '../src/elements/GeoAlert/Geo*Alert.vue',
            sectionDepth: 0
          }
        ]
      },
      {
        name: 'GeoBorderedBox',
        components: '../src/elements/GeoBorderedBox/GeoBorderedBox*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoBorderedToken',
        components: '../src/elements/GeoBorderedToken/GeoBorderedToken.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoButton',
        components: '../src/elements/GeoButton/Geo*Button.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoCalendar',
        components: '../src/elements/GeoCalendar/GeoCalendar*.vue',
        sectionDepth: 1,
        sections: [
          {
            name: 'GeoCalendarGrid',
            components: '../src/elements/GeoCalendar/GeoCalendarGrid/GeoCalendar*.vue',
            sectionDepth: 0
          },
          {
            name: 'GeoCalendarNavigation',
            components: '../src/elements/GeoCalendar/GeoCalendarNavigation/GeoCalendar*.vue',
            sectionDepth: 0
          },
          {
            name: 'GeoCalendarPickerGranularity',
            components: '../src/elements/GeoCalendar/GeoCalendarPickerGranularity/GeoCalendar*.vue',
            sectionDepth: 0
          }
        ]
      },
      {
        name: 'GeoCircle',
        components: '../src/elements/GeoCircle/GeoCircle.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoDropdown',
        components: '../src/elements/GeoDropdown/GeoDropdown*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoFileUpload',
        components: '../src/elements/GeoFileUpload/GeoFileUpload*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoEditableInput',
        components: '../src/elements/GeoEditableInput/GeoEditableInput*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoList',
        components: '../src/elements/GeoList/GeoList*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoModal',
        components: '../src/elements/GeoModal/GeoModal*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoNotificationBar',
        components: '../src/elements/GeoNotificationBar/GeoNotificationBar*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoPill',
        components: '../src/elements/GeoPill/GeoPill.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoScrollableContainer',
        components: '../src/elements/GeoScrollableContainer/GeoScrollableContainer*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoSegmentedControl',
        components: '../src/elements/GeoSegmentedControl/Geo*SegmentedControl*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoSelect',
        components: '../src/elements/GeoSelect/Geo*Select*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoSwitch',
        components: '../src/elements/GeoSwitch/GeoSwitch*.vue',
        sectionDepth: 1
      },
      {
        name: 'GeoTabBar',
        components: '../src/elements/GeoTabBar/GeoTabBar*.vue',
        sectionDepth: 0
      },
      {
        name: 'GeoTable',
        components: '../src/elements/GeoTable/GeoTable*.vue',
        sectionDepth: 1,
        sections: [{
          name: 'Introduction',
          content: '../src/elements/GeoTable/GeoTable.md',
          sectionDepth: 0
        }, {
          name: 'Headers',
          content: '../src/elements/GeoTable/GeoTable.headers.md',
          sectionDepth: 0
        }, {
          name: 'Body',
          content: '../src/elements/GeoTable/GeoTable.body.md',
          sectionDepth: 0
        }, {
          name: 'Pagination & sorting',
          content: '../src/elements/GeoTable/GeoTable.pagination.md',
          sectionDepth: 0
        }, {
          name: 'Empty state',
          content: '../src/elements/GeoTable/GeoTable.empty.md',
          sectionDepth: 0
        }]
      },
      {
        name: 'GeoInput',
        components: '../src/elements/GeoInput/GeoInput*.vue',
        sectionDepth: 1
      },
      // hygen-component (reference for injection, do not remove)
      {
        name: 'String Utils',
        components: () => [
          '../src/elements/GeoHighlightedString/GeoHighlightedString.vue',
          '../src/elements/GeoTrimmedContent/GeoTrimmedContent.vue',
          '../src/elements/GeoMarquee/GeoMarquee.vue',
          '../src/elements/GeoMarkdownContent/GeoMarkdownContent.vue'
        ],
        sectionDepth: 1
      },
      {
        name: 'Charts',
        sectionDepth: 1,
        sections: [{
          name: 'Introduction',
          components: '../src/elements/GeoChart/GeoChart.vue',
          sectionDepth: 0
        }, {
          name: 'Axes',
          content: '../src/elements/GeoChart/GeoChartAxis/GeoChartAxis.md',
          sectionDepth: 0
        }, {
          name: 'Axes guidelines',
          content: '../src/elements/GeoChart/GeoChartAxisGuidelines/GeoChartAxisGuidelines.md',
          sectionDepth: 0
        }, {
          name: 'Scales',
          content: '../src/elements/GeoChart/GeoChartScale/GeoChartScale.md',
          sectionDepth: 0
        }, {
          name: 'Labels',
          content: '../src/elements/GeoChart/GeoChartLabels/GeoChartLabels.md',
          sectionDepth: 0
        }, {
          name: 'Bar charts',
          content: '../src/elements/GeoChart/GeoChartBars/GeoChartBars.md',
          sectionDepth: 0
        }, {
          name: 'Colored bar charts',
          content: '../src/elements/GeoChart/GeoChartColorBar/GeoChartColorBar.md',
          sectionDepth: 0
        }, {
          name: 'Line segments charts',
          content: '../src/elements/GeoChart/GeoChartLineSegments/GeoChartLineSegments.md',
          sectionDepth: 0
        }, {
          name: 'Anchored Shapes charts',
          content: '../src/elements/GeoChart/GeoChartAnchoredShapes/GeoChartAnchoredShapes.md'
        }, {
          name: 'Pie charts',
          content: '../src/elements/GeoChart/GeoChartPie/GeoChartPie.md'
        }, {
          name: 'Line charts',
          sections: [{
            name: 'Basic usage',
            content: '../src/elements/GeoChart/GeoChartLine/GeoChartLineBasic.md'
          }, {
            name: 'Horizontal lines',
            content: '../src/elements/GeoChart/GeoChartLine/GeoChartLineHorizontal.md'
          }, {
            name: 'Vertical lines',
            content: '../src/elements/GeoChart/GeoChartLine/GeoChartLineVertical.md'
          }, {
            name: 'Categorical lines',
            content: '../src/elements/GeoChart/GeoChartLine/GeoChartLineCategorical.md'
          }, {
            name: 'Time lines',
            content: '../src/elements/GeoChart/GeoChartLine/GeoChartLineTime.md'
          }]
        }]
      }
    ]
  },
  {
    name: 'Patterns',
    content: '../docs/patterns.md',
    components: '../src/patterns/**/[A-Z]*.vue',
    exampleMode: 'expand',
    usageMode: 'expand',
    sectionDepth: 2
  },
  {
    name: 'Templates',
    content: '../docs/templates.md',
    components: '../src/templates/**/[A-Z]*.vue',
    exampleMode: 'expand',
    usageMode: 'expand',
    sectionDepth: 2
  },
  {
    name: 'Customizing Components',
    content: '../docs/custom-styling.md'
  },
  {
    name: 'Components Constants',
    content: '../docs/components-constants.md'
  },
  {
    name: 'FAQ',
    content: '../docs/faq.md',
    sectionDepth: 1
  },
  {
    /**
     * Private components have to be loaded into the documentation as well,
     * otherwise anything using them will be broken. We’re loading them in
     * their own section, which then gets hidden in docs/docs.styles.scss
     */
    name: 'Private Components',
    components: '../src/**/[_]*.vue'
  }
]
