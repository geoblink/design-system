import _ from 'lodash'

/**
 * Returns a throttled version of given function, using a proper delay so the UI
 * isn't blocked.
 *
 * It will run the function both: at the leading and trailing edge of the interval,
 * more info about this in [Lodash docs](https://lodash.com/docs/4.17.5#throttle).
 *
 * @parameter Function callback Function to be run.
 * @returns Function Throttled function.
 */
export default function (callback) {
  return _.throttle(callback, 10, {
    leading: true,
    trailing: true
  })
}
