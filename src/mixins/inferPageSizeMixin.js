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
 * called immediately before starting iteration of the algorithm but after
 * running any pending tick
 * @property {InferPageSizeStepCallback} [after] Function to be
 * called immediately after each iteration of the algorithm but before running
 * any pending tick
 * @property {InferPageSizeStepCallback} [beforeEach] Function to be
 * called before each iteration of the algorithm.
 * @property {InferPageSizeStepCallback} [afterEach] Function to be
 * called after each iteration of the algorithm.
 * @property {GetHeight} getContainerHeight Function returning the height of the
 * container where content is displayed. It should be smaller than content
 * height when scroll is required and greater than content height when there's
 * empty unused space.
 * @property {GetHeight} getContentHeight Function returning the height of the
 * actual content displayed.
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

      return vm.$nextTick()
        .then(() => params && params.before ? params.before() : null)
        .then(() => attemptToIncreaseInferredPageSize(params, vm))
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
           * @event inferred-page-size-changed
           * @type {number}
           */
          vm.$emit(INFERRED_PAGE_SIZE_CHANGED_EVENT_NAME, vm[DATA_KEYS.inferredPageSize])
        })
    }
  }
}

/**
 * @param {InferPageSizeParams} params
 * @param {ComponentWithInferPageSizeMixin} vm
 */
function attemptToIncreaseInferredPageSize (params, vm) {
  if (vm[DATA_KEYS.inferredPageSize] >= params.sourceDataLength) return

  if (params.beforeEach) params.beforeEach()

  vm[DATA_KEYS.inferredPageSize] += 1

  return vm.$nextTick().then(function () {
    if (params.afterEach) params.afterEach()

    const containerHeight = params.getContainerHeight()
    const contentHeight = params.getContentHeight()

    const isVerticalScrollRequired = containerHeight < contentHeight

    if (isVerticalScrollRequired) {
      vm[DATA_KEYS.inferredPageSize] -= 1
      return vm.$nextTick().then(function () {
        return attemptToDecreaseInferredPageSize(params, vm)
      })
    }

    return attemptToIncreaseInferredPageSize(params, vm)
  })
}

/**
 * @param {InferPageSizeParams} params
 * @param {ComponentWithInferPageSizeMixin} vm
 */
function attemptToDecreaseInferredPageSize (params, vm) {
  if (vm[DATA_KEYS.inferredPageSize] === 1) return

  if (params.beforeEach) params.beforeEach()

  const containerHeight = params.getContainerHeight()
  const contentHeight = params.getContentHeight()

  const isVerticalScrollRequired = containerHeight < contentHeight

  if (!isVerticalScrollRequired) {
    if (params.afterEach) params.afterEach()
    return vm.$nextTick()
  }

  vm[DATA_KEYS.inferredPageSize] -= 1

  return vm.$nextTick().then(function () {
    if (params.afterEach) params.afterEach()

    return attemptToDecreaseInferredPageSize(params, vm)
  })
}
