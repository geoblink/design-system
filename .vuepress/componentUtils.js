/**
 * @param {object} params
 * @param {string} params.path
 * @param {any} params.definition
 * @param {any} params.documentation
 */
export function getVuepressPageSettingsForComponent (params) {
  return {
    frontmatter: {
      title: params.definition.name
    },
    headers: [{
      level: 1,
      slug: params.definition.name,
      title: params.definition.name
    }],
    path: `/components/${params.path}.html`,
    regularPath: `/components/${params.path}.html`,
    relativePath: `components/${params.path}`,
    title: params.definition.name
  }
}

/**
 * @param {object} originalPage
 * @param {string} originalPage.key
 * @param {Array<object>} originalPage.headers
 * @param {string} originalPage.title
 * @param {object} originalPage.frontmatter
 * @param {object} customPage
 * @param {string} customPage.originalRegularPath
 * @param {string} customPage.customRegularPath
 * @param {string} customPage.originalRelativePath
 * @param {string} customPage.internalPath
 */
export function getVuepressPageSettingsForExample (originalPage, customPage) {
  return {
    key: originalPage.key,
    headers: originalPage.headers,
    frontmatter: originalPage.frontmatter,
    title: `${originalPage.title} (Example)`,
    path: customPage.customRegularPath,
    regularPath: customPage.customRegularPath,
    relativePath: customPage.originalRelativePath
  }
}
