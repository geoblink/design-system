const base = process.env.VUEPRESS_BASE || '/'

module.exports = {
  base,
  title: 'Geoblink Design System documentation',
  themeConfig: {
    logo: `/assets/img/logo.svg`,
    nav: [
      { text: 'Home', link: '/' }
    ],
    sidebar: 'auto',
    lastUpdated: 'Last Updated',
    repo: 'https://bitbucket.org/geoblink/geoblink-design-system',
    docsDir: 'e2e',
    editLinks: true
  }
}
