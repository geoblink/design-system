import _ from 'lodash'

const PREVIOUS_STATE_KEY = '$_geoblinkDesignSystem_debugUpdatedHookMixin_previousState'
/**
 * @mixin
 */
export default {
  updated () {
    if (!this[PREVIOUS_STATE_KEY]) {
      this[PREVIOUS_STATE_KEY] = this.$options.data()
    }

    const changedPropName = _.findKey(this._data, (value, key) => !_.isEqual(value, this[PREVIOUS_STATE_KEY][key]))

    this[PREVIOUS_STATE_KEY] = _.clone(this._data)

    console.warn(`GeoDebugUpdatedHookMixin [mixin] :: Updated hook called due to a change in property named «${changedPropName}»`)
  }
}
