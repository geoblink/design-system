/**
 * @typedef MarkdownNodeType
 * @readonly
 * @enum {string}
 */
export const MarkdownNodeType = {
  paragraph: 'paragraph',
  link: 'link',
  image: 'image',
  strong: 'strong',
  emphasis: 'emphasis',
  strikethrough: 'strikethrough',
  heading: 'heading',
  orderedList: 'orderedList',
  unorderedList: 'unorderedList',
  listItem: 'listItem',
  blockquote: 'blockquote',
  code: 'code',
  plainText: 'plainText'
}

export const MarkdownNodeHTMLTag = {
  p: 'p',
  a: 'a',
  img: 'img',
  strong: 'strong',
  em: 'em',
  del: 'del',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  ul: 'ul',
  ol: 'ol',
  li: 'li',
  blockquote: 'blockquote'
}

const htmlHeadingTagToMarkdownNodeHTMLTag = {
  h1: MarkdownNodeHTMLTag.h1,
  h2: MarkdownNodeHTMLTag.h2,
  h3: MarkdownNodeHTMLTag.h3,
  h4: MarkdownNodeHTMLTag.h4,
  h5: MarkdownNodeHTMLTag.h5,
  h6: MarkdownNodeHTMLTag.h6
}

export class MarkdownBlockNode {
  /**
   * @param {{type: MarkdownNodeType, tag: string, childNodes: MarkdownNode[]}} params
   */
  constructor (params) {
    this.type = params.type
    this.tag = params.tag
    this.childNodes = params.childNodes
  }
}

export class MarkdownBlockNodeWithTitle extends MarkdownBlockNode {
  /**
   * @param {{type: MarkdownNodeType, tag: string, childNodes: MarkdownNode[], title: string}} params
   */
  constructor (params) {
    super(params)
    this.title = params.title
  }
}

export class MarkdownLinkBlockNode extends MarkdownBlockNodeWithTitle {
  /**
   * @param {{childNodes: MarkdownNode[], title: string, href: string}} params
   */
  constructor (params) {
    super(Object.assign({}, params, {
      type: MarkdownNodeType.link,
      tag: MarkdownNodeHTMLTag.a
    }))
    this.href = params.href
  }
}

export class MarkdownImageBlockNode extends MarkdownBlockNodeWithTitle {
  /**
   * @param {{childNodes: MarkdownNode[], title: string, alt: string, src: string}} params
   */
  constructor (params) {
    super(Object.assign({}, params, {
      type: MarkdownNodeType.image,
      tag: MarkdownNodeHTMLTag.img
    }))
    this.src = params.src
    this.alt = params.alt
  }
}

export class MarkdownInlineNode {
  /**
   * @param {{content: string}} params
   */
  constructor (params) {
    this.type = MarkdownNodeType.plainText
    this.content = params.content
  }
}

export class MarkdownCodeBlockNode {
  /**
   * @param {{content: string}} params
   */
  constructor (params) {
    this.type = MarkdownNodeType.code
    this.content = params.content
  }
}

/**
 * @typedef {(MarkdownBlockNode | MarkdownInlineNode | MarkdownCodeBlockNode)} MarkdownNode
 */

/**
 * @typedef MarkdownParserFeatures
 * @readonly
 * @enum {string}
 */
export const MarkdownParserFeatures = {
  smartquotes: 'smartquotes',
  replacements: 'replacements',
  linkify: 'linkify',
  link: 'link',
  image: 'image',
  emphasis: 'emphasis',
  strikethrough: 'strikethrough',
  heading: 'heading',
  lheading: 'lheading',
  list: 'list',
  blockquote: 'blockquote',
  code: 'code',
  fence: 'fence'
}

/**
 * @param {string} markdownText
 * @param {MarkdownIt} markdownItInstance
 * @returns {MarkdownNode[]}
 */
export function getMarkdownNodes (markdownText, markdownItInstance) {
  const tokens = markdownItInstance.parse(markdownText, {})
  return parseASTList(tokens)
}

const closingTagTokenTypes = {
  paragraph_close: 'paragraph_close',
  link_close: 'link_close',
  strong_close: 'strong_close',
  em_close: 'em_close',
  s_close: 's_close',
  heading_close: 'heading_close',
  bullet_list_close: 'bullet_list_close',
  ordered_list_close: 'ordered_list_close',
  list_item_close: 'list_item_close',
  blockquote_close: 'blockquote_close'
}

/**
 * @callback NodeParsingFunction
 * @param {NodeParsingInput} params
 * @return {NodeParsingOutput}
 *
 * @typedef {{ tokens: Token[], position: number }} NodeParsingInput
 * @typedef {{ nodes: MarkdownNode[], positionsAdvanced: number }} NodeParsingOutput
 */

/**
 * @type {NodeParsingOutput}
 */
const SKIP_NODE_OUTPUT = { nodes: [], positionsAdvanced: 1 }

/**
 * @type {Object.<string, NodeParsingFunction>}
 */
const nodeTypeParsers = {
  text: parseTextToken,
  inline: parseInlineToken,
  paragraph_open: parseParagraphToken,
  link_open: parseLinkToken,
  image: parseImageToken,
  strong_open: parseStrongToken,
  em_open: parseEmphasisToken,
  s_open: parseStrikethroughToken,
  heading_open: parseHeadingToken,
  bullet_list_open: parseUnorderedListToken,
  ordered_list_open: parseOrderedListToken,
  list_item_open: parseListItemToken,
  blockquote_open: parseBlockquoteToken,
  code_block: parseCodeblockToken,
  fence: parseCodeblockToken
}

/**
 * @param {Token[]} tokens
 * @returns {MarkdownNode[]}
 */
function parseASTList (tokens) {
  return parseASTListRecursive(tokens, 0).nodes
}

/**
 * @param {Token[]} tokens
 * @param {number} start
 * @returns {NodeParsingOutput}
 */
function parseASTListRecursive (tokens, start) {
  const resultingNodes = []
  const originalStart = start

  while (start < tokens.length) {
    const result = parseToken({ tokens, position: start })

    if (!result) {
      return {
        nodes: resultingNodes,
        parsedLength: start - originalStart
      }
    }

    const { nodes, positionsAdvanced } = result
    resultingNodes.push(...nodes)
    start += positionsAdvanced
  }

  return {
    nodes: resultingNodes,
    parsedLength: start - originalStart
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput | null}
 */
function parseToken ({ tokens, position }) {
  const token = tokens[position]

  if (token.hidden) return SKIP_NODE_OUTPUT

  if (token.type in closingTagTokenTypes) return null

  if (token.type in nodeTypeParsers) return nodeTypeParsers[token.type]({ tokens, position })

  console.warn('Ignoring unsupported token', token)

  return SKIP_NODE_OUTPUT
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTextToken ({ tokens, position }) {
  const token = tokens[position]

  const node = {
    type: MarkdownNodeType.plainText,
    content: token.content
  }

  return {
    nodes: [node],
    positionsAdvanced: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseInlineToken ({ tokens, position }) {
  const token = tokens[position]

  const childrenMetadata = parseASTListRecursive(token.children, 0)

  return {
    nodes: childrenMetadata.nodes,
    positionsAdvanced: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseParagraphToken ({ tokens, position }) {
  const childrenMetadata = parseASTListRecursive(tokens, position + 1)
  const node = {
    type: MarkdownNodeType.paragraph,
    tag: MarkdownNodeHTMLTag.p,
    childNodes: childrenMetadata.nodes
  }

  return {
    nodes: [node],
    positionsAdvanced: 1 + childrenMetadata.parsedLength + 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseLinkToken ({ tokens, position }) {
  const token = tokens[position]

  const childrenMetadata = parseASTListRecursive(tokens, position + 1)
  const node = {
    type: MarkdownNodeType.link,
    tag: MarkdownNodeHTMLTag.a,
    childNodes: childrenMetadata.nodes,
    href: token.attrGet('href'),
    title: token.attrGet('title')
  }

  return {
    nodes: [node],
    positionsAdvanced: 1 + childrenMetadata.parsedLength + 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseImageToken ({ tokens, position }) {
  const token = tokens[position]

  const node = {
    type: MarkdownNodeType.image,
    tag: MarkdownNodeHTMLTag.img,
    childNodes: [],
    src: token.attrGet('src'),
    alt: token.attrGet('alt'),
    title: token.attrGet('title')
  }

  return {
    nodes: [node],
    positionsAdvanced: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseStrongToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.strong,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.strong
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseEmphasisToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.emphasis,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.em
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseStrikethroughToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.strikethrough,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.del
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseHeadingToken ({ tokens, position }) {
  const token = tokens[position]
  const markdownNodeHTMLTag = htmlHeadingTagToMarkdownNodeHTMLTag[token.tag]

  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.heading,
    markdownNodeHTMLTag
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseUnorderedListToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.unorderedList,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.ul
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseOrderedListToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.orderedList,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.ol
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseListItemToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.listItem,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.li
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseBlockquoteToken ({ tokens, position }) {
  return parseNoAttributedHTMLTagToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.blockquote,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.blockquote
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseCodeblockToken ({ tokens, position }) {
  const token = tokens[position]

  const node = {
    type: MarkdownNodeType.code,
    content: token.content
  }

  return {
    nodes: [node],
    positionsAdvanced: 1
  }
}

/**
 * @param {{tokens: Token[], position: number, markdownNodeType: MarkdownNodeType, markdownNodeHTMLTag, MarkdownNodeHTMLTag}} params
 * @returns {NodeParsingOutput}
 */
function parseNoAttributedHTMLTagToken ({
  tokens,
  position,
  markdownNodeType,
  markdownNodeHTMLTag
}) {
  const childrenMetadata = parseASTListRecursive(tokens, position + 1)
  const node = {
    type: markdownNodeType,
    tag: markdownNodeHTMLTag,
    childNodes: childrenMetadata.nodes
  }

  return {
    nodes: [node],
    positionsAdvanced: 1 + childrenMetadata.parsedLength + 1
  }
}
