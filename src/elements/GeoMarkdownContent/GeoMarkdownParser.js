import { assign } from 'lodash'
import VariableInterpolationPlugin from './VariableInterpolationPlugin'

/**
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
  codeBlock: 'codeBlock',
  inlineCode: 'inlineCode',
  table: 'table',
  thead: 'thead',
  tr: 'tr',
  th: 'th',
  tbody: 'tbody',
  td: 'td',
  plainText: 'plainText'
}

/**
 * @readonly
 * @enum {string}
 */
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
  blockquote: 'blockquote',
  code: 'code',
  pre: 'pre',
  table: 'table',
  thead: 'thead',
  tr: 'tr',
  th: 'th',
  tbody: 'tbody',
  td: 'td'
}

/**
 * @readonly
 * @enum {string}
 */
const htmlHeadingTagToMarkdownNodeHTMLTag = {
  h1: MarkdownNodeHTMLTag.h1,
  h2: MarkdownNodeHTMLTag.h2,
  h3: MarkdownNodeHTMLTag.h3,
  h4: MarkdownNodeHTMLTag.h4,
  h5: MarkdownNodeHTMLTag.h5,
  h6: MarkdownNodeHTMLTag.h6
}

/**
 * @param {object} params
 * @param {MarkdownNodeType} params.type
 * @param {string} params.tag
 * @param {Array<MarkdownNode>} params.childNodes
 */
export function MarkdownBlockNode (params) {
  this.type = params.type
  this.tag = params.tag
  this.childNodes = params.childNodes
}

/**
 * @param {{type: MarkdownNodeType, tag: string, childNodes: MarkdownNode[], title: string}} params
 */
export function MarkdownBlockNodeWithTitle (params) {
  Object.getPrototypeOf(MarkdownBlockNodeWithTitle.prototype).constructor.call(this, params)
  this.title = params.title
}
MarkdownBlockNodeWithTitle.prototype = Object.create(MarkdownBlockNode.prototype)

/**
 * @param {{childNodes: MarkdownNode[], title: string, href: string}} params
 */
export function MarkdownLinkBlockNode (params) { // extends MarkdownBlockNodeWithTitle {
  Object.getPrototypeOf(MarkdownLinkBlockNode.prototype).constructor.call(
    this,
    assign({}, params, {
      type: MarkdownNodeType.link,
      tag: MarkdownNodeHTMLTag.a
    })
  )
  this.href = params.href
}
MarkdownLinkBlockNode.prototype = Object.create(MarkdownBlockNodeWithTitle.prototype)

/**
 * @param {{childNodes: MarkdownNode[], title: string, alt: string, src: string}} params
 */
export function MarkdownImageBlockNode (params) {
  Object.getPrototypeOf(MarkdownImageBlockNode.prototype).constructor.call(
    this,
    assign({}, params, {
      type: MarkdownNodeType.image,
      tag: MarkdownNodeHTMLTag.img
    })
  )

  this.src = params.src
  this.alt = params.alt
}
MarkdownImageBlockNode.prototype = Object.create(MarkdownBlockNodeWithTitle.prototype)

/**
 * @param {{content: string}} params
 */
export function MarkdownInlineNode (params) {
  this.type = MarkdownNodeType.plainText
  this.content = params.content
}

/**
 * @typedef {(MarkdownBlockNode | MarkdownInlineNode)} MarkdownNode
 */

/**
 * @readonly
 * @enum {string}
 */
export const MarkdownParserFeatures = {
  backticks: 'backticks',
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
  fence: 'fence',
  table: 'table'
}

/**
 * @param {string} markdownText
 * @param {MarkdownIt} markdownItInstance
 * @returns {MarkdownNode[]}
 */
export function getMarkdownNodes (markdownText, variableValues, markdownItInstance) {
  markdownItInstance.use(VariableInterpolationPlugin, { variableValues })
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
  blockquote_close: 'blockquote_close',
  table_close: 'table_close',
  thead_close: 'thead_close',
  tr_close: 'tr_close',
  th_close: 'th_close',
  tbody_close: 'tbody_close',
  td_close: 'td_close'
}

/**
 * @callback NodeParsingFunction
 * @param {NodeParsingInput} params
 * @return {NodeParsingOutput}
 */

/**
 * @typedef {Object} NodeParsingInput
 * @property {Array<Token>} tokens
 * @property {number} position
 */

/**
 * @typedef {Object} NodeParsingOutput
 * @property {Array<MarkdownNode>} nodes
 * @property {number} parsedLength
 */

/**
 * @type {NodeParsingOutput}
 */
const SKIP_NODE_OUTPUT = { nodes: [], parsedLength: 1 }

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
  code_block: parseCodeBlockToken,
  fence: parseCodeBlockToken,
  code_inline: parseCodeInlineToken,
  table_open: parseTableOpenToken,
  thead_open: parseTheadOpenToken,
  tr_open: parseTrOpenToken,
  th_open: parseThOpenToken,
  tbody_open: parseTbodyOpenToken,
  td_open: parseTdOpenToken
}

/**
 * @param {Array<Token>} tokens
 * @returns {Array<MarkdownNode>}
 */
function parseASTList (tokens) {
  return parseASTListRecursive(tokens, 0).nodes
}

/**
 * @param {Array<Token>} tokens
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

    const { nodes, parsedLength } = result
    resultingNodes.push(...nodes)
    start += parsedLength
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
    parsedLength: 1
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
    parsedLength: 1
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
    parsedLength: 1 + childrenMetadata.parsedLength + 1
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
    parsedLength: 1 + childrenMetadata.parsedLength + 1
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
    parsedLength: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseStrongToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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

  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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
  return parseHTMLTagWithoutAttributesToken({
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
function parseCodeBlockToken ({ tokens, position }) {
  const token = tokens[position]

  const node = {
    type: MarkdownNodeType.codeBlock,
    content: token.content
  }

  return {
    nodes: [node],
    parsedLength: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseCodeInlineToken ({ tokens, position }) {
  const token = tokens[position]

  const node = {
    type: MarkdownNodeType.inlineCode,
    content: token.content
  }

  return {
    nodes: [node],
    parsedLength: 1
  }
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTableOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.table,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.table
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTheadOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.thead,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.thead
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTrOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.tr,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.tr
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseThOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.th,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.th
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTbodyOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.tbody,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.tbody
  })
}

/**
 * @param {NodeParsingInput} params
 * @returns {NodeParsingOutput}
 */
function parseTdOpenToken ({ tokens, position }) {
  return parseHTMLTagWithoutAttributesToken({
    tokens,
    position,
    markdownNodeType: MarkdownNodeType.td,
    markdownNodeHTMLTag: MarkdownNodeHTMLTag.td
  })
}

/**
 * @param {object} params
 * @param {Array<Token>} params.tokens
 * @param {number} params.position
 * @param {MarkdownNodeType} params.markdownNodeType
 * @param {MarkdownNodeHTMLTag} params.markdownNodeHTMLTag
 * @returns {NodeParsingOutput}
 */
function parseHTMLTagWithoutAttributesToken ({
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
    parsedLength: 1 + childrenMetadata.parsedLength + 1
  }
}
