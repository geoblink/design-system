/**
 * This is Vue Design System’s helper util that
 * highlights the currently active nav item.
 */

export default {
  methods: {
    clearActiveLinks () {
      const activeLinks = document.querySelectorAll('.vueds-active')
      if (activeLinks) {
        activeLinks.forEach(function (element) {
          element.classList.remove('vueds-active')
        })
      }
    },
    click (event) {
      event.stopPropagation()
      // if (this.clearActiveLinks) {
      //   this.clearActiveLinks()
      // } else {
      //   this.methods.clearActiveLinks()
      // }
      if (event.target.parentNode.classList.contains('vueds-active')) {
        event.target.parentNode.classList.remove('vueds-active')
      } else {
        event.target.parentNode.classList.add('vueds-active')
      }

      // When clicking a sub link
      const parent = event.target.parentNode.parentNode.parentNode
      if (parent && parent.className.match(/(rsg--item)/)) {
        parent.classList.add('vueds-active')
        if (event.target.classList.contains('vueds-active')) {
          event.target.classList.remove('vueds-active')
        }
      }
    },
    init () {
      let currentURL = ''
      const sidebar = document.querySelector("div[class^='rsg--sidebar']")

      if (process && process.env && process.env.NODE_ENV === 'test') {
        currentURL = '/example/'
      } else {
        currentURL = window.location.pathname + window.location.hash.split('?')[0].replace(/%20/g, ' ')
      }

      if (sidebar) {
        if (this.clearActiveLinks) {
          this.clearActiveLinks()
        } else {
          this.methods.clearActiveLinks()
        }

        const navLinks = sidebar.querySelectorAll('nav > ul > li > a')
        const subNavLinks = sidebar.querySelectorAll('nav > ul > li ul a')
        const currentPage = sidebar.querySelector("a[href='" + currentURL + "']")
        const search = sidebar.querySelector("div[class^='rsg--search'] input")
        const self = this

        if (currentURL && currentPage) {
          currentPage.parentNode.classList.add('vueds-active')
          const parent = currentPage.parentNode.parentNode.parentNode
          if (parent.className.match(/(rsg--item)/)) {
            currentPage.parentNode.parentNode.parentNode.classList.add('vueds-active')
          }
        }

        if (search && !search.classList.contains('set')) {
          search.setAttribute('placeholder', 'Type to filter')
        }

        // Cleanup

        if (navLinks) {
          navLinks.forEach(function (element) {
            element.removeEventListener('click', self.click.bind(self), false)
            element.addEventListener('click', self.click.bind(self), false)
          })
        }

        if (subNavLinks) {
          subNavLinks.forEach(function (element) {
            element.removeEventListener('click', self.click.bind(self), false)
            element.addEventListener('click', self.click.bind(self), false)
          })
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
