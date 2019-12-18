### Simple vertical layout

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-vertical-layout>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
    </geo-vertical-layout>
  </div>
</div>
```

### Vertical with header and footer

```jsx live
<div class="element-demo">
  <div class="element-demo__block" style="justify-content: space-around;">
    <geo-vertical-layout>
      <h5 slot="header">Header</h5>
      <geo-secondary-button>Element 1</geo-secondary-button>
      <geo-secondary-button>Element 2</geo-secondary-button>
      <geo-secondary-button>Element 3</geo-secondary-button>
      <geo-primary-button slot="footer">Footer button</geo-primary-button>
    </geo-vertical-layout>
  </div>
</div>
```
