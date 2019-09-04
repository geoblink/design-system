`GeoTooltip` is a component used to display a tooltip.
Using this component you can render complex HTML tooltips in a safe and reactive way.

### Basic

```jsx live
<button>
  <geo-tooltip>This is button's tooltip content</geo-tooltip>

  This button has a tooltip
</button>
```

```jsx live
<p>This text has tooltips in <strong><geo-tooltip>Bold affirmation!</geo-tooltip>some words</strong>.</p>
<p>A <strong><geo-tooltip>W!</geo-tooltip>w</strong><strong><geo-tooltip>O!</geo-tooltip>o</strong><strong><geo-tooltip>R!</geo-tooltip>r</strong><strong><geo-tooltip>D!</geo-tooltip>d</strong> might have several tooltips.</p>
```

### Position

```jsx live
<p>Tooltips can be placed
  <button>
    <geo-tooltip
      :delay="0"
      position="top"
    >
      Tooltip on top!
    </geo-tooltip>

    on top
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="bottom"
    >
      Tooltip on bottom!
    </geo-tooltip>

    on bottom
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="leading"
    >
      Tooltip on leading!
    </geo-tooltip>

    on leading
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      position="trailing"
    >
      Tooltip on trailing!
    </geo-tooltip>

    on trailing
  </button>
</p>
```

### Alignment

```jsx live
<p>Tooltips can be aligned. When top positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="top"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="top"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="top"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When bottom positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="bottom"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="bottom"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="bottom"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When leading positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="leading"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="leading"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="leading"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```

```jsx live
<p>Tooltips can be aligned. When trailing positioned:
  <button>
    <geo-tooltip
      :delay="0"
      alignment="start"
      position="trailing"
    >
      Tooltip start is aligned with button start!
    </geo-tooltip>

    on the start of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="end"
      position="trailing"
    >
      Tooltip start is aligned with button end!
    </geo-tooltip>

    on the end of the button
  </button>
  <button>
    <geo-tooltip
      :delay="0"
      alignment="middle"
      position="trailing"
    >
      Tooltip middle is aligned with button middle!
    </geo-tooltip>

    on the middle of the button
  </button>
</p>
```
