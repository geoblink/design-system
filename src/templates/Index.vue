<template>
  <div class="index-page__container">
    <div class="index-page__above-the-fold">
      <div class="index-page__above-the-fold__logo-container">
        <img src="assets/icons/geoblink_logo_white.png">
      </div>
      <div class="index-page__above-the-fold___text-introduction">
        <h1 class="text-introduction__header">The Geoblink's internal Design System built on top of VueJS</h1>
        <h4 class="text-introduction__subheader">Geoblink Design System provides you a set of components, patterns and guides to develop better, more and faster.</h4>
      </div>
      <div class="index-page__above-the-fold___buttons-container">
        <geo-danger-button
          :disabled="false"
          @click="goToDocs()"
        >
          See the Docs
        </geo-danger-button>
      </div>
    </div>
    <div class="index-page__features-container">
      <div class="index-page__features__text-container">
        <h2 class="features__text-header">Features</h2>
      </div>
      <div class="index-page__features__feature-list">
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['far', 'clock']"
            />
          </div>
          <div class="feature-item__header">Faster Workflow</div>
          <div class="feature-item__text">A ser of interconnected patterns & practices for you and your team with comprehensive documentation.</div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['far', 'comments']"
            />
          </div>
          <div class="feature-item__header">Naming of Things</div>
          <div class="feature-item__text">A well thought-out terminology, naming conventions, and hierarchy for the whole design system to save time.</div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['fas', 'list-ol']"
            />
          </div>
          <div class="feature-item__header">Component Status</div>
          <div class="feature-item__text">Get an automated overview of how Geoblink Design System progresses over time and what's still left to do.</div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['fas', 'tags']"
            />
          </div>
          <div class="feature-item__header">Design Tokens</div>
          <div class="feature-item__text">Global design tokens in YAML format that you can use inside any component. In both CSS and JavaScript.</div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['fas', 'window-maximize']"
            />
          </div>
          <div class="feature-item__header">Living Docs</div>
          <div class="feature-item__text">Automatic generation of living, user editable documentation you can play with.</div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon">
            <font-awesome-icon
              :icon="['fab', 'npm']"
            />
          </div>
          <div class="feature-item__header">Use via NPM</div>
          <div class="feature-item__text">Easily import Geoblink Design System in your projects as an NPM dependency.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Shows how to layout and structure a home page.
 */
export default {
  name: 'Index',
  status: 'deprecated',
  release: '1.0.0',
  metaInfo: {
    title: 'Geoblink Design System',
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      { rel: 'favicon', href: '/assets/favicon.ico' }
    ]
  },
  methods: {
    goToDocs () {
      window.location.href = 'http://localhost:6060'
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0 !important;
  }

  .index-page__above-the-fold {
    align-items: center;
    background: url('/assets/background-landing.png');
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100vh;
    padding: 20vh;
    box-sizing: border-box;
  }

  .index-page__above-the-fold__logo-container {
    text-align: center;
    padding: 50px 0;
  }

  .index-page__above-the-fold___text-introduction {
    color: $color-white;
    font-family: $font-family-heading;
    width: 700px;
    margin: 0 auto;
    text-align: center;
  }

  .text-introduction__header {
    font-size: 45px;
    font-weight: 500;
  }

  .text-introduction__subheader {
    font-size: $font_size_medium;
    font-weight: 300;
  }

  .index-page__above-the-fold___buttons-container {
    margin: 0 auto;
    width: 120px;
  }

  .index-page__features-container {
    max-width: 1300px;
    height: 100%;
    width: 86%;
    margin: 0 auto;
  }

  .index-page__features__feature-list {
    display: grid;
    grid-template-columns: 28.666% 28.666% 28.666%;
    grid-column-gap: 7%;
    align-content: stretch;
    justify-content: center;
  }

  .index-page__features__feature-list__feature-item {
    margin-bottom: 120px;
  }

  .index-page__features__text-container {
    text-align: center;
    font-family: $font-family-heading;
    font-size: 38px;
    font-weight: 300;
    color: $color-blue-dark;
  }

  .feature-item__icon {
    font-size: 50px;
    color: $color-blue-light;
    padding-bottom: 25px;
  }

  .feature-item__header {
    font-size: 25px;
    font-family: $font-family-heading;
    padding-bottom: 15px;
  }

  .feature-item__text {
    font-size: 18px;
    font-family: $font_family_text;
  }
</style>
