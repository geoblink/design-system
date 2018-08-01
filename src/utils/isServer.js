/**
 * Returns whether Vue is currently running in the server (for server-side
 * rendering).
 *
 * @return boolean `true` if Vue is currently running in the server.
 */
export default function (vNode) {
  return vNode.componentInstance && vNode.componentInstance.$isServer
}
