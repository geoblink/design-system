import _ from 'lodash'

/**
 * @readonly
 * @enum {string}
 */
export const DATA_KEYS = {
  isInferringPageSize: 'geoblinkDesignSystem_inferPageSizeMixin_isInferringPageSize',
  internallyForcedCurrentPageStart: 'geoblinkDesignSystem_inferPageSizeMixin_internallyForcedCurrentPageStart',
  inferredPageSize: 'geoblinkDesignSystem_inferPageSizeMixin_inferredPageSize',
  lastInferredPageSize: 'geoblinkDesignSystem_inferPageSizeMixin_lastInferredPageSize'
}

export const INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME = 'infer-page-size'

/**
 * @callback InferPageSizeStepCallback
 * @return Promise<void>
 */

/**
 * @callback GetHeight
 * @return number
 */

/**
 * @callback NextTick
 * @param {Function} [callback]
 * @return Promise<void>
 */

/**
 * @callback Emit
 * @param {string} name
 * @param {any} payload
 */

/**
 * @typedef {object} InferPageSizeParams
 * @property {number} sourceDataLength Total amount of data that can be provided
 * at most, ignoring any pagination constraint
 * @property {InferPageSizeStepCallback} [before] Function to be
 * called immediately before starting the algorithm
 * @property {InferPageSizeStepCallback} [after] Function to be
 * called immediately after the algorithm but before running any pending tick
 * @property {GetHeight} getContainerHeight Function returning the height of the
 * container where content is displayed. It should be smaller than content
 * height when scroll is required and greater than content height when there's
 * empty unused space.
 * @property {GetHeight} getContentHeight Function returning the height of the
 * actual content displayed.
 * @property {number} maxPageSizeDelta Maximum amount to increase page size by,
 * this value is useful to tweak the heuristic used to infer proper page size.
 */

/**
 * @typedef {object} PrivateOnlyInferPageSizeParams
 * @property {number} pageSizeDelta Amount to increase page size by,
 * this value is automatically picked by the inference algorithm.
 */

/**
 * @typedef {InferPageSizeParams & PrivateOnlyInferPageSizeParams} PublicAndPrivateOnlyInferPageSizeParams
 */

/**
 * @callback InferPageSize
 * @param {InferPageSizeParams} [params]
 * @return {Promise<void>|null}
 */

/**
 * @typedef {object} ComponentWithInferPageSizeMixin
 * @property {boolean} geoblinkDesignSystem_inferPageSizeMixin_isInferringPageSize
 * @property {number} geoblinkDesignSystem_inferPageSizeMixin_internallyForcedCurrentPageStart
 * @property {number|null} geoblinkDesignSystem_inferPageSizeMixin_inferredPageSize
 * @property {InferPageSize} inferPageSize
 * @property {NextTick} $nextTick
 * @property {Emit} $emit
 */

/**
 * @mixin
 */
export default {
  data () {
    return {
      // Used to force table to display first page during page size inference
      [DATA_KEYS.internallyForcedCurrentPageStart]: -1,
      [DATA_KEYS.inferredPageSize]: null
      // This is intentionally non-reactive to avoid triggering infinite loops
      // when inferring page size stops
      // [DATA_KEYS.isInferringPageSize]: false
      // [DATA_KEYS.lastInferredPageSize]: 1
    }
  },
  methods: {
    /**
     * @param {InferPageSizeParams} params
     */
    inferPageSize (params) {
      const vm = (/** @type ComponentWithInferPageSizeMixin */ (/** @type unknown */ this))
      if (vm[DATA_KEYS.isInferringPageSize]) return null

      vm[DATA_KEYS.isInferringPageSize] = true
      vm[DATA_KEYS.internallyForcedCurrentPageStart] = 0
      vm[DATA_KEYS.inferredPageSize] = vm[DATA_KEYS.lastInferredPageSize] || 1

      const firstIterationParams = _.assign({}, params, { pageSizeDelta: 1 })

      return vm.$nextTick()
        .then(() => params && params.before ? params.before() : null)
        .then(() => attemptToIncreaseInferredPageSize(firstIterationParams, vm))
        .then(() => params && params.after ? params.after() : null)
        .then(() => {
          vm[DATA_KEYS.internallyForcedCurrentPageStart] = -1
          vm.$nextTick()
        })
        .then(() => {
          vm[DATA_KEYS.isInferringPageSize] = false
          vm[DATA_KEYS.lastInferredPageSize] = vm[DATA_KEYS.inferredPageSize]

          /**
           * Inferred page size changed.
           *
           * @event infer-page-size
           * @type {number}
           */
          vm.$emit(INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME, vm[DATA_KEYS.inferredPageSize])
        })
    }
  }
}

/**
 * @param {PublicAndPrivateOnlyInferPageSizeParams} params
 * @param {ComponentWithInferPageSizeMixin} vm
 */
function attemptToIncreaseInferredPageSize (params, vm) {
  if (getIsVerticalScrollRequired(params)) {
    vm[DATA_KEYS.inferredPageSize] -= 1

    return vm.$nextTick()
      .then(() => attemptToDecreaseInferredPageSize(params, vm))
  } else if (vm[DATA_KEYS.inferredPageSize] >= params.sourceDataLength) return

  // Heuristic: it's worth increasing pages by 2 rows each time as it's a good
  // compromise between growing fast and not too fast that fixing overgrowing
  // takes too much.
  vm[DATA_KEYS.inferredPageSize] = Math.min(vm[DATA_KEYS.inferredPageSize] + params.pageSizeDelta, params.sourceDataLength)

  const nextIterationParams = _.assign({}, params, {
    pageSizeDelta: Math.min(params.pageSizeDelta * 2, params.maxPageSizeDelta)
  })

  return vm.$nextTick()
    .then(() => attemptToIncreaseInferredPageSize(nextIterationParams, vm))
}

/**
 * @param {PublicAndPrivateOnlyInferPageSizeParams} params
 * @param {ComponentWithInferPageSizeMixin} vm
 */
function attemptToDecreaseInferredPageSize (params, vm) {
  // We want to display at least one row of data, regardless scroll.
  if (vm[DATA_KEYS.inferredPageSize] <= 1) {
    vm[DATA_KEYS.inferredPageSize] = 1
    return vm.$nextTick()
  }

  if (!getIsVerticalScrollRequired(params)) return

  vm[DATA_KEYS.inferredPageSize] -= 1

  return vm.$nextTick()
    .then(() => attemptToDecreaseInferredPageSize(params, vm))
}

/**
 * @param {InferPageSizeParams} params
 * @returns {boolean}
 */
function getIsVerticalScrollRequired (params) {
  const containerHeight = params.getContainerHeight()
  const contentHeight = params.getContentHeight()

  const isVerticalScrollRequired = containerHeight < contentHeight

  return isVerticalScrollRequired
}
