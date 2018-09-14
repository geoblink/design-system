<template>
  <div class="index-page__container">
    <div class="index-page__above-the-fold">
      <div class="index-page__above-the-fold__logo-container">
        <img src="assets/icons/geoblink_logo_white.png">
      </div>
      <div class="index-page__above-the-fold___text-introduction">
        <h1 class="text-introduction__header">An open source tool for building Design Systems with Vue.js</h1>
        <h4 class="text-introduction__subheader">Vue Design System provides you and your team a set of organized tools, patterns & practices. It works as the foundation for your application development.</h4>
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

      </div>
      <div class="index-page__features__feature-list">
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
        </div>
        <div class="index-page__features__feature-list__feature-item">
          <div class="feature-item__icon"></div>
          <div class="feature-item__header"></div>
          <div class="feature-item__text"></div>
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
    title: 'Vue Design System',
    htmlAttrs: {
      lang: 'en'
    }
  },
  methods: {
    goToDocs () {
      window.location.href = 'http://localhost:6060'
    }
  }
}
</script>

<style lang="scss" scoped>
  .index-page__above-the-fold {
    background: $color-blue-dark;
    height: 100vh;
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
    font-size: $display_medium;
    font-weight: 300;
  }

  .index-page__above-the-fold___buttons-container {
    margin: 0 auto;
    width: 120px;
  }

</style>