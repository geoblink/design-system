import _ from 'lodash'

/**
 * Returns a throttled version of given function, using a proper delay so the UI
 * isn't blocked.
 *
 * It will run the function both: at the leading and trailing edge of the interval,
 * more info about this in [Lodash docs](https://lodash.com/docs/4.17.5#throttle).
 *
 * @parameter Function callback Function to be run.
 * @parameter time in ms to throttle (default 10)
 * @returns Function Throttled function.
 */
export default function (callback, time = 10) {
  return _.throttle(callback, time, {
    leading: true,
    trailing: true
  })
}
