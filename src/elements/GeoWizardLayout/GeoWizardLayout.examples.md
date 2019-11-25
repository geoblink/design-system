`GeoWizardLayout` is a component that displays a complete structure of what a step from a wizard should look like.
It comprehends an optional sidebar with an optional header and footer and main content.
The main content of the wizard is an horizontal container that can also display a header and a footer along with its main displayed info.
```jsx live
<template>
  <div class="element-demo">
    <h3 class="element-demo__header">Wizard with sidebar example</h3>
    <div class="element-demo__block" style="justify-content: space-around;">
      <geo-wizard-layout>
        <geo-sidebar-layout slot="sidebar">
          <template slot="header">
            <h6> Sidebar header </h6>
            <geo-primary-button> Sidebar header button </geo-primary-button>
          </template>
          <template>
            <p>Sidebar step 1</p>
            <p>Sidebar step 2</p>
            <p>Sidebar step 3</p>
            <p>SIdebar step 4</p>
          </template>
          <template slot="footer">
            <geo-tertiary-button> Sidebar's footer </geo-tertiary-button>
          </template>
        </geo-sidebar-layout>
        <h5 slot="header">Header</h5>
        <geo-secondary-button>Element 1</geo-secondary-button>
        <geo-secondary-button>Element 2</geo-secondary-button>
        <geo-secondary-button>Element 3</geo-secondary-button>
        <geo-primary-button slot="footer-trailing">Footer button</geo-primary-button>
      </geo-wizard-layout>
    </div>
  </div>
</template>
```
