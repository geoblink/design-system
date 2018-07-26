export default function counterFactory () {
  let value = 0
  return function () {
    return value++
  }
}
