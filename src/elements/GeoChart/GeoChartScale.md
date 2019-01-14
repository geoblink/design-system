Scales provide a way to map values from a domain (using units from a specific
context) into a range (using the units of our drawing canvas - an SVG). They
are used in several internal parts of `GeoChart` but they are only defined on a
per-[axis](./#/Elements/Charts?id=axes) basis.

All the axis must have a `type` property which must be a value of `SCALE_TYPES`
named export. Depending on the `type` they have additional requirements.

## Linear scales

- `type`: must be `SCALE_TYPES.linear`.
- `domain`: must be either an array of numbers (the domain will be formed by all
of those numbers) or an object with an `start` and an `end` property, both of
them numbers. A domain may be decreasing.
- `valueForOrigin`: value at which the axis corresponding to this scale is
considered to start. This is usually `0` although might be a different value.
This affect each data representation in a different way, for instance, in a bar
chart using this axis for its dimension, the bar's growth will be proportional
to the difference between the item value and this `valurForOrigin`. If you want
to represent temperatures in Celsius degrees this `valueForOrigin` would
probably by `0` but if you want to use Fahrenheit degrees it would be `32`.

### Example

```json
{
  "type": "linear",
  "domain": {
    "start": -273.15,
    "end": 10000
  },
  "valueForOrigin": 0
}
```

## Logarithmic scales

Almost identical to `linear` scales, but:

- `type`: must be `SCALE_TYPES.logarithmic`.
- `domain`: it's lowest end must be `> 0`.
- `base`: (_optional_) the base of the logarithm, defaults to `10`.

### Example

```json
{
  "type": "logarithmic",
  "domain": {
    "start": 1,
    "end": 1024
  },
  "valueForOrigin": 1,
  "base": 2
}
```

## Categorical scales

Similar to `linear` scales, but:

- `type`: must be `SCALE_TYPES.categorical`.
- `domain`: must be an array of values which can be either strings or numbers.
- `valueForOrigin`: must be one of the values of `domain` array.

### Optional properties

- `padding`: object allowing defining the separation between categories. All its
properties are optional:
  - `inner`: space between two consecutive categories, in the range `[0, 1]`.
  - `outer`: space before the first category and after the last one, in the
  range `[0, 1]`.

### Example

```json
{
  "type": "categorical",
  "domain": ["First category", "Second category", "Third category"],
  "valueForOrigin": "First category",
  "padding": {
    "inner": 0.1,
    "outer": 0.2
  }
}
```
