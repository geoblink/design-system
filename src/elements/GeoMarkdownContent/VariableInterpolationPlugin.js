const variableRegexPattern = ':([a-zA-Z][a-zA-Z0-9_]*)'
const variableRegexGlobal = new RegExp(variableRegexPattern, 'g')

/**
 * @param {MarkdownIt} markdownItInstance MarkdownIt instance
 * @param {Object} variableValues Values to replace variableNames with.
 */
export default function (markdownItInstance, { variableValues }) {
  markdownItInstance.core.ruler.after('inline', 'interpolated_variable', parseVariables)

  /**
   * @param {MarkdownIt.State} state
   */
  function parseVariables (state) {
    for (const blockToken of state.tokens) {
      if (blockToken.type !== 'inline') continue

      blockToken.children = blockToken.children.map(function (currentToken) {
        return getVariableTokens(currentToken, state)
      }).reduce((allChildren, grandchildren) => [...allChildren, ...grandchildren], [])
    }
  }

  /**
   * @param {{content: string, level: number}} currentToken
   * @param {MarkdownIt.State} state
   */
  function getVariableTokens (currentToken, state) {
    const { content, level } = currentToken

    const contentContainsVariable = variableRegexGlobal.test(content)
    if (!contentContainsVariable) {
      return [currentToken]
    }

    /** @type {MarkdownIt.Token[]} */
    const newTokens = []
    const variableRegex = new RegExp(variableRegexPattern, 'g')

    let remainingContentStartingPosition
    let match
    while ((match = variableRegex.exec(content)) !== null) {
      const position = match.index
      const [matchedText, variableName] = match

      if (position > 0) {
        const contentBeforeVariableToken = new state.Token('text', '', 0)
        contentBeforeVariableToken.content = content.slice(0, position)
        contentBeforeVariableToken.level = level
        newTokens.push(contentBeforeVariableToken)
      }

      const variableValueToken = new state.Token('text', '', 0)
      const valueForVariable = variableValues[variableName]

      variableValueToken.content = valueForVariable
      variableValueToken.level = level

      newTokens.push(variableValueToken)

      remainingContentStartingPosition = position + matchedText.length
    }

    if (remainingContentStartingPosition < content.length - 1) {
      const remainingContentToken = new state.Token('text', '', 0)
      remainingContentToken.content = content.slice(remainingContentStartingPosition)
      remainingContentToken.level = state.level
      newTokens.push(remainingContentToken)
    }

    return newTokens
  }
}
