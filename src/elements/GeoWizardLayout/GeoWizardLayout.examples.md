### Complete wizard

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-wizard-layout>
      <template #sidebar>
        <geo-sidebar-layout>
          <template #header>
            <h6> Sidebar header </h6>
            <geo-primary-button> Sidebar header button </geo-primary-button>
          </template>
          <template>
            <p>Sidebar step 1</p>
            <p>Sidebar step 2</p>
            <p>Sidebar step 3</p>
            <p>SIdebar step 4</p>
          </template>
          <template #footer>
            <geo-tertiary-button> Sidebar's footer </geo-tertiary-button>
          </template>
        </geo-sidebar-layout>
      </template>
      <template #header>
        <h5>Header</h5>
      </template>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
      <template #footerTrailing>
        <geo-primary-button>Footer button</geo-primary-button>
      </template>
    </geo-wizard-layout>
  </div>
</div>
```

### Wizard without header nor footer

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-wizard-layout>
      <template #sidebar>
        <geo-sidebar-layout>
          <template #header>
            <h6> Sidebar header </h6>
            <geo-primary-button> Sidebar header button </geo-primary-button>
          </template>
          <template>
            <p>Sidebar step 1</p>
            <p>Sidebar step 2</p>
            <p>Sidebar step 3</p>
            <p>SIdebar step 4</p>
          </template>
          <template #footer>
            <geo-tertiary-button> Sidebar's footer </geo-tertiary-button>
          </template>
        </geo-sidebar-layout>
      </template>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
    </geo-wizard-layout>
  </div>
</div>
```

### Wizard without sidebar

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-wizard-layout>
      <template #header>
        <h5>Header</h5>
      </template>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
      <template #footerTrailing>
        <geo-primary-button>Footer button</geo-primary-button>
      </template>
    </geo-wizard-layout>
  </div>
</div>
```
