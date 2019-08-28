---
title: Changelog
---

# Changelog

## 24.3.0

New:

- `GeoListItem` new slot `description`.

## 24.2.2

Changed:

- `GeoCalendar` uses now `GeoInputs` for the navigation.
- Changes on `GeoCalendar` navigations happen on blur and not on input.
- `GeoCalendar` regex for navigation inputs only accepts numbers from 01 to 31 in days and from 01 to 12 in months.

## 24.2.1

Changed:

- `GeoCalendar` CSS refactor. Partitioned stylesheet in several files and pass `cssModifier` down to child components

## 24.2.0

New:

- `GeoChart` `SCALE_TYPES` new supported scale `CONSTANTS.SCALES.SCALE_TYPES.time`

## 24.1.1

Changed:

- `GeoCalendar` accept default ranges

## 24.1.0

New:

- `GeoInput` component

## 24.0.0

Breaking:

- `GeoInput` has been renamed to `GeoEditableInput`

## 23.2.0

New:

- `GeoCalendar` component

## 23.1.0

New:

- `debugUpdatedHookMixin`, mixin to log which property triggered an `updated` hook
- `inferPageSizeMixin`, mixin with an algorithm to infer page size of collection-based components

Changed:

- Refactored `GeoTable` to use new `inferPageSizeMixin` mixin

## 23.0.2

Changed:

- `GeoTable` now uses `offsetHeight`/`offsetWidth` for calculations instead
of getBoundingClientRect()

## 23.0.1

Changed:

- `GeoSelect` `keyForLabel` with default as `label`

## 23.0.0

Changed:

- Added common mixin for `GeoSelect` and `GeoMultiSelect`.

Breaking:

- `GeoSelect` items no longuer need to have a property called `label` and now the
property to be used as label need to be passed with `keyForLabel`.
- `GeoSelect` removed deprecated prop `isOptSelect`, `grouped` must be used.

## 22.2.4

Changed:

- `GeoAlert` export variants as constants.

## 22.2.3

Changed:

- `GeoHighlightedString` `highlightedChars` no longuer required and set default to `[]`

## 22.2.2

Changed:

- `GeoLinkButton` Use inline-flex instead of display: inline in button container

## 22.2.1

Changed:

- `GeoLinkButton` has been made inline by default

## 22.2.0

New:

`GeoDropdownRegularButton` add support for `active` and `disabled` props

## 22.1.0

New:

- `GeoMultiSelect` component

## 22.0.0

Breaking:

- `GeoAlertCallout` has been renamed to `GeoAlert` (this also affects all subcomponents)

## 21.0.0

Breaking:

- `GeoAlert` has been renamed to `GeoFeedbackBox` (this also affects all subcomponents)

## 20.1.5

Changed:

- `GeoTableBodyRowCell` inherit static classes

## 20.1.4

New:

- `$z-index-over-modal` add z-index variable to ensure it's always over the modal

## 20.1.4-beta.0

New:

- `$z-index-over-modal` add z-index variable to ensure it's always over the modal

## 20.1.3

Fixed:

- `GeoFileUpload` emits events if same file is picked twice

## 20.1.2

Fixed:
- `GeoHighlightedString` fix spacing between matches

## 20.1.1

Fixed:
- `GeoChartTextDescription` update textOrigin of all texts

## 20.1.0

New:

- `GeoSegmentedControlItem` support for variant
- `GeoInfoSegmentedControlItem`
- `GeoSuccessSegmentedControlItem`
- `GeoWarningSegmentedControlItem`
- `GeoDangerSegmentedControlItem`

Changed:

- `GeoBorderedBoxHeader` use `heading-small` for title style

Fixed:

- Use `600` as `font-weight` in `heading-small`

## 20.1.0-beta.5

- Build without non-commited changes.

## 20.1.0-beta.4

Fixed:

- `GeoAlertCallout` prevent content from overflowing parent container

## 20.1.0-beta.3

Fixed:

- `GeoAlertCallout` prevent content from overflowing parent container

## 20.1.0-beta.2

Changed:

- Pass `ref` to `GeoSegmentedControlItem` children components

## 20.1.0-beta.1

Changed:

- `GeoBorderedBoxHeader` use `heading-small` for title style

## 20.1.0-beta.0

New:

- `GeoSegmentedControlItem` support for variant
- `GeoInfoSegmentedControlItem`
- `GeoSuccessSegmentedControlItem`
- `GeoWarningSegmentedControlItem`
- `GeoDangerSegmentedControlItem`

Changed:

- `GeoBorderedBoxHeader` use `heading-small` for title style

Fixed:

- Use `600` as `font-weight` in `heading-small`

## 20.0.0

Changed:

- `GeoActivityIndicator` expose slot to add content in the middle of the indicator
- `GeoActivityIndicator` customisable inner radius

Breaking:

- `GeoActivityIndicator` change inner class names

## 19.1.2

New:

- `GeoAlertCallout` component
- `GeoDangerLinkButton` component
- `GeoButton` `dangerLink` variant

Changed:

- `GeoSelect` expose slots to customize how items are displayed.

## 19.1.1

Fixes:

- `GeoListItem` inherit refs as functional component

## 19.1.1-beta.0

Fixes:

- Inherit refs in functional component `GeoListItem`

## 19.1.0

New:

- `GeoAlertCallout` component
- `GeoDangerLinkButton` component
- `GeoButton` `dangerLink` variant

Changed:

- `GeoSelect` expose slots to customize how items are displayed.

## 19.0.0

Breaking:

- `GeoInput` change name of `GeoInputConstants` from `INPUT_TYPES` to `VARIANTS`

## 19.0.0-beta.1

Breaking:

- `GeoInput` change name of `GeoInputConstants` from `INPUT_TYPES` to `VARIANTS`

## 19.0.0-beta.0

Breaking:

- `GeoInput` change name of `GeoInputConstants` TYPE

## 18.4.0 (Backdrop)

New:

- `GeoAlertCallout` component
- `GeoDangerLinkButton` component
- `GeoButton` `dangerLink` variant

Changed:

- `GeoSelect` expose slots to customize how items are displayed.

## 18.3.0-beta.1

- Incorporate previous versions changes

## 18.3.0-beta.0

New:

- `GeoInput` add `leadingAccessoryItem` and `trailingAccessoryItem`

## 18.2.0

New:

- `GeoButton` added `link` variant.
- `GeoDropdown` exported `geoDropdownMixinFactory` function which returns a mixin to reduce boilerplate when adding `GeoDropdown` components.
- `GeoFileUpload` added `loading` status.

## 18.2.0-beta.4

New:

- `GeoFileUpload` added `loading` status.

## 18.2.0-beta.3

Changed:

- Merged master.

## 18.2.0-beta.2

New:

- `GeoDropdown` exported `geoDropdownMixinFactory` function which returns a mixin to reduce boilerplate when adding `GeoDropdown` components.

## 18.2.0-beta.1

Fix:

- `GeoLinkButton` fix flex content justification.

## 18.2.0-beta.0

New:

- `GeoButton` added `link` variant.

## 18.1.0

New:

- `GeoSelect` added `disabled` boolean property to allow disabling user interaction
- `GeoSelectToggleButton` added `disabled` boolean property to allow disabling user interaction

## 18.0.1

Fixes:

- `GeoListItem` extend component classes to parent

## 18.0.0

Breaking:

- `GeoTableBodyRowCell` children won't inherit `cssModifier` property

New:

- `GeoTableBodyRowCell` refactored into a functional component
- `GeoListItem` refactored into a functional component
- Upgraded internal Vue version to 2.5.22

Changed:

- `GeoTableBodyRowCell` render function moved back to functional template

Fixes:

- `GeoMarquee` won't attempt to compute label size if element not added to DOM

## 18.0.0-beta.3

Fixes:

- `GeoTableBodyRowCell` propagate HTML attributes to component's root
- `GeoListItem` propagate HTML attributes to component's root

## 18.0.0-beta.2

Changed:

- `GeoTableBodyRowCell` render function moved back to functional template

Fixes:

- `GeoMarquee` won't attempt to compute label size if element not added to DOM

## 18.0.0-beta.1

New:

- `GeoListItem` refactored into a functional component
- Upgraded internal Vue version to 2.5.22

## 18.0.0-beta.0

New:

- `GeoTableBodyRowCell` refactored into a functional component

Breaking:

- `GeoTableBodyRowCell` children won't inherit `cssModifier` property

## 17.0.0

Breaking:

- Use `@geoblink/ajv-extra` instead of vanilla `ajv`
- `GeoChart` `dimension` renamed to `mainDimension`
  - `colorBarGroups`
  - `barGroups`
  - `lineSegmentsGroups`
  - `lineGroups`
  - `anchoredShapesGroups`

- `GeoChart` renamed all `*Data` properties to `data`:
  - `lineSegmentsGroups` `circleData` renamed to `data`
  - `lineGroups` `lineData` renamed to `data`
  - `anchoredShapesGroups` `shapeData` renamed to `data`

- `GeoChart` `BARS_DIMENSIONS` named export renamed to `DIMENSIONS.DIMENSIONS_2D`
- `GeoChart` `SCALE_TYPES` named export renamed to `CONSTANTS.SCALES.SCALE_TYPES`
- `GeoChart` `POSITIONS` named export renamed to `AXIS.POSITIONS`
- `GeoChart` new `DIMENSIONS.ANCHORED_POSITIONS_1D` named export

## 17.0.0-beta.3

Fixes:

- `GeoChart` fix errors in axis label positioning

## 17.0.0-beta.2

Breaking:

- Use `@geoblink/ajv-extra` instead of vanilla `ajv`
- `GeoChart` `dimension` renamed to `mainDimension`
  - `colorBarGroups`
  - `barGroups`
  - `lineSegmentsGroups`
  - `lineGroups`
  - `anchoredShapesGroups`

- `GeoChart` renamed all `*Data` properties to `data`:
  - `lineSegmentsGroups` `circleData` renamed to `data`
  - `lineGroups` `lineData` renamed to `data`
  - `anchoredShapesGroups` `shapeData` renamed to `data`

- `GeoChart` `BARS_DIMENSIONS` named export renamed to `DIMENSIONS.DIMENSIONS_2D`
- `GeoChart` `SCALE_TYPES` named export renamed to `CONSTANTS.SCALES.SCALE_TYPES`
- `GeoChart` `POSITIONS` named export renamed to `AXIS.POSITIONS`
- `GeoChart` new `DIMENSIONS.ANCHORED_POSITIONS_1D` named export

## 17.0.0-beta.1

Breaking:

- `GeoChart` `dimension` renamed to `mainDimension`
  - `colorBarGroups`
  - `barGroups`
  - `lineSegmentsGroups`
  - `lineGroups`
  - `anchoredShapesGroups`

- `GeoChart` renamed all `*Data` properties to `data`:
  - `lineSegmentsGroups` `circleData` renamed to `data`
  - `lineGroups` `lineData` renamed to `data`
  - `anchoredShapesGroups` `shapeData` renamed to `data`

- `GeoChart` `BARS_DIMENSIONS` named export renamed to `DIMENSIONS.DIMENSIONS_2D`
- `GeoChart` `SCALE_TYPES` named export renamed to `CONSTANTS.SCALES.SCALE_TYPES`
- `GeoChart` `POSITIONS` named export renamed to `AXIS.POSITIONS`
- `GeoChart` new `DIMENSIONS.ANCHORED_POSITIONS_1D` named export

## 17.0.0-beta.0

Breaking:

- Use `@geoblink/ajv-extra` instead of vanilla `ajv`

## 16.2.0

New:

- `GeoSwitch` component

## 16.1.0

New:

- `GeoChartLine` component

## 16.0.0

Migration guide:

1. SCSS imports of `dist/system/system.utils.scss` should now import `dist/system.utils.scss`
2. SCSS imports of `dist/system/system.css` should now import `dist/system.css`
3. JS imports of `dist/system/system.js` should now import `dist/system.js`

Breaking:

- New file structure. Generated bundled are available at:
  - `node_modules/@geoblink/design-system/system.css`
  - `node_modules/@geoblink/design-system/system.js`
  - `node_modules/@geoblink/design-system/system.utils.scss`
  - `node_modules/@geoblink/design-system/tokens/tokens.(json|map.scss|raw.json|scss)`

Changed:

- Add `d3` as direct dependency.
- Add `d3-tip` as direct dependency.

Fixed:

- Remove unneded files from dist bundle
- Reduce bundle size to <240kb
- `GeoMarquee` wait for nextTick to get the width of the content.
- `GeoTrimmedContent` don't attempt to remove tooltip DOM elements if content is not trimmed.
- `GeoTrimmedContent` avoid errors when trimming content which was initially visible.

## 16.0.0-beta.6

Fixed:

- `GeoTrimmedContent` avoid errors when trimming content which was initially visible.

## 16.0.0-beta.5

Fixed:

- `GeoTrimmedContent` avoid errors when trimming content which was initially visible.

## 16.0.0-beta.4

Fixed:

- `d3-tip` is now a dependency instead of a peerDependency.

## 16.0.0-beta.3

Fixed:

- `GeoMarquee` wait for nextTick to get the width of the content.

## 16.0.0-beta.2

Fixed:

- `GeoTrimmedContent` don't attempt to remove tooltip DOM elements if content is not trimmed.

## 16.0.0-beta.1

Changed:

- Add d3 as direct dependency.

## 16.0.0-beta.0

Migration guide:

1. SCSS imports of `dist/system/system.utils.scss` should now import `dist/system.utils.scss`
2. SCSS imports of `dist/system/system.css` should now import `dist/system.css`
3. JS imports of `dist/system/system.js` should now import `dist/system.js`

Breaking:

- New file structure. Generated bundled are available at:
  - `node_modules/@geoblink/design-system/system.css`
  - `node_modules/@geoblink/design-system/system.js`
  - `node_modules/@geoblink/design-system/system.utils.scss`
  - `node_modules/@geoblink/design-system/tokens/tokens.(json|map.scss|raw.json|scss)`

Fixed:

- Remove unneded files from dist bundle
- Reduce bundle size to <240kb

## 15.0.2 (Backport)

Fixed:

- `GeoMarquee` wait for nextTick to get the width of the content.

## 15.0.1 (Backport)

Fixed:

- `GeoTrimmedContent` don't attempt to remove tooltip DOM elements if content is not trimmed.

## 15.0.0

Breaking:

- `dist/system/system.utils.scss` no longer generates any CSS code, to allow requiring CSS mixins from several places without duplicating CSS code.

Migration guide:

- Add at least one import to `dist/system.css` in order to get default CSS code.

## 14.1.4 (Backport)

Fixed:

- `GeoTrimmedContent` don't attempt to remove tooltip DOM elements if content is not trimmed.

## 14.1.3

Fixed:

- `GeoDropdown` don't render popup content unless it's opened.
- `GeoTrimmedContent` don't add DOM elements for tooltips unless content requires so.

## 14.1.2

Fixed:

- `GeoTable` will infer automatic page size based on content starting from first page instead of previously displayed page

## 14.1.1

Fixed:

- `GeoSelect` make sure options `:key` is unique for adding/removing options from the list

## 14.1.0

- `GeoTableHeaderRowCell` exports `GeoTableHeaderRowCellMixin` as constant to help building custom header cells

## 14.0.2

Fixed:

- `GeoChartAnchoredShapes` fix positioning bug that caused text and shape overlapping

## 14.0.1

Fixed:

- `GeoChartAnchoredShapes` and `GeoChartLineSegments` pass track property by optional function

## 14.0.0

Breaking:

- `GeoChartAnchoredShapes` and `GeoChartLineSegments` track data by `id`

## 13.0.5

Fixed:

- `GeoBorderedBoxHeader` set `overflow: hidden` by default

## 13.0.4

- `GeoAxis` center labels of X axes

## 13.0.3

- `GeoTableSort` buttons closer to each other

## 13.0.2

- `GeoPill` fix mixin name and styles
- `GeoTableSort` fix active button

## 13.0.1

- `GeoTable` refactored and simplified algorithm to compute columns width

## 13.0.0

New:

- `GeoChartAxis` support for axis labels

Breaking:

- Remove fixed `height` and `width` props from `GeoChart`

## 12.5.0

- `GeoTablePagination` exports `GeoTablePaginationMixin` as constant

## 12.4.1

- `GeoChart` enforce `axisGroups` in all charts but `pie` ones

## 12.4.0

- `GeoClickOutside` and `GeoContextMenuClickOutside` will pass as second parameter a function that will force the rest of handlers in the chain from being called.

## 12.3.0

New:

- `yarn new:component` template generation with hygen

## 12.2.0

New:

- `GeoChartTextDescription` component
- `GeoChartPie` labels

## 12.1.0

New:

- `GeoChartLineSegments` component
- `GeoChartAnchoredShapes` component

## 12.0.0

New:

- `GeoTableBodyRow` variant support

Breaking:

- `GeoTableBodyRow` CSS classes include variant

## 11.3.0

New:

- `GeoPill` component
- `GeoTable` variant `multiLine` for header rows and cells
- `GeoTable` add `disableGrowing` property to header cells

## 11.2.2

Fixed:

- `GeoModal` is repositioned after attached-to element size changes

## 11.2.1

Fixed:

- `GeoActivityIndicator` only SVG inner children will be transform when animating, to avoid overflow issues with SVG parent.

## 11.2.0

New:

- `GeoChartAxisGuidelines` component

## 11.1.0

New:

- `GeoChartColorBar` component

## 11.0.1

Fixed:

- `GeoMarkdownContent` variables are properly interpolated in Internet Explorer
- `GeoMarkdownContent` multiple variables are properly interpolated when used inside a single tag

## 11.0.0

New:

- `GeoChart` support for customizing tooltips offset

Breaking:

- `GeoChart` bars and pie `tooltip` property is no longer a function but an
object with a property `content` (what previosly was `tooltip`) and an optional
property `offset`

## 10.3.1

Fixed:

- `GeoMarkdownContent` variables are properly interpolated in Internet Explorer
- `GeoMarkdownContent` multiple variables are properly interpolated when used inside a single tag

## 10.3.0

New:

- `GeoChartPie` component

## 10.2.0

New:

- `GeoChart` support for tooltips in bar chart

## 10.1.2

Fixed:

- `GeoTable` Fix exception when attempting to render table before DOM is ready.

## 10.1.1

Fixed:

- `GeoTable` Properly layout table when container width is not divisible by amount of columns.

## 10.1.0

New:

- `GeoTable` component
- `GeoTrimmedContent` component

## 10.0.0

Changed:

- `GeoModal` default content with `GeoBorderedBox`

New:

- `GeoTabBar` new variant to use the component in `GeoModal`
- `GeoTabBarItem` new variant to use the component in `GeoModal`

Breaking:

- `GeoTabBar` CSS classes now include variant.
- `GeoTabBarItem` CSS classes now include variant.

## 9.4.0

New:

- `GeoChart` component

## 9.3.1

Fixed:

- `GeoBorderedToken` Improve styling of component
- `GeoBorderedToken` Fix component icon optional property

## 9.3.0

New:

- `GeoBorderedToken` component

## 9.2.3

Changed:

- Spacing properties

## 9.2.2

Fixed:

- `GeoHighlightedString` Fix highlighting of long strings

## 9.2.1

Changed:

- Use of hyphen for variable names

## 9.2.0

New:

- `GeoSelect` allows using non-fixed width for its dropdown
- `GeoSelectBase` allows using non-fixed width for its dropdown

## 9.1.0

New:

- `GeoNotificationBar` component

## 9.0.3

Fixed:

- `GeoHighlightedString` scss selector with css-modifier

## 9.0.2

Changed:

- `GeoHighlightedString` without span tags

## 9.0.1

Fixed:

- Several components with wrong font-size after fonts refactor

## 9.0.0

Breaking:

- `GeoSelect` subcomponents CSS selectors are now namespaced

New:

- `GeoCircle` component
- `GeoInput` can be styled up depending on its type
- Complete overhaul of font styles

Changed:

- `GeoInput` increased spacing of buttons in normal mode

Fixed:

- `GeoInput` now exports constants

Security:

- Removed `event-stream` dependency

## 8.5.0

New:

- `GeoTabBar` component
- `GeoTabBarItem` component

## 8.4.4

Fixed:

- Dist build with markdown-it included

## 8.4.3

Fixed:

- GeoTertiaryButton font size and weight

## 8.4.2

Fixed:

- Bundle non-scoped CSS.

## 8.4.1

Fixed:

- Bundle `dist/assets` folder in NPM package.

## 8.4.0

New:

- `GeoContextMenuClickOutside` directive
- Register directives in the install

Fixed:

- Correctly export directives from Design System

## 8.3.0

New:

- `GeoMarkdownContent` component

Fixed:

- [GeoButton] shadow opacity is animated

## 8.2.1

Fixed:

- [GeoSelect] Make sure the dropdown toggle arrow is always on the right side of the dropdown

## 8.2.0

New:

- [GeoSelect] Add GeoMarquee for too long options or opt-groups headers

## 8.1.0

New:

- `GeoListActionableItem` component

Fixed:

- `GeoButton` hover style to match invision design

## 8.0.8

Fixed:

- [GeoDropdown] Expand dropdown from left to right by default

## 8.0.7

Fixed:

- [GeoAlert] Do not shrink content when displayed in a flex environment

## 8.0.6

Fixed:

- [GeoListItem] Do not force maximum height

## 8.0.5

Fixed:

- [GeoSelect] Add missing cssModifier to GeoListGroup

## 8.0.4

Fixed:

- [GeoSelect] Use forceYAxisPosition as an optional prop for all GeoSelect components

## 8.0.3

Fixed:

- [GeoModal] `backdrop-click` event is now named `click-backdrop`

## 8.0.2

Fixed:

- [GeoSelect] Remove unnecessary if/else logic in embeded GeoHighlightedString component

## 8.0.1

Fixed:

- [GeoModal] Content is vertically and horizontally centered

## 8.0.0

Breaking:

- [GeoDropdown] No longer embeds popup content in a bordered box. Use `GeoBorderedBox` to achieve the same results as in older versions.
- [GeoScrollableContainer] Renamed slot `scrollableList` to default slot.
- [GeoSelect] Removed `GeoSelectReadOnlyEntry` (use `GeoListClearItem` instead)
- [GeoSelect] Removed `GeoSelectMoreResultsFooterButton` (use `GeoListFooterButton` instead)
- [GeoSelect] Removed `GeoSelectSearchEntryForm` (use `GeoBorderedBoxHeaderSearchForm` instead)

New:

- `GeoListClearItem` component
- `GeoListFooterButton` component
- `GeoBorderedBoxHeaderSearchForm` component

Fixed:

- [GeoDropdown] Exposes constants properly
- [GeoDropdown] Horizontal axis position when there's no space on the right is computed properly
- [GeoSelect] Search is properly throttled

## 7.3.0

New:

- `GeoModal` component
- `GeoBorderedBox` component
- `GeoBorderedBoxHeader` component
- `GeoBorderedBoxFooter` component

Deprecated:

- [GeoDropdown] `GeoDropdownHeader` (use `GeoBorderedBoxHeader` instead)
- [GeoDropdown] `GeoDropdownFooter` (use `GeoBorderedBoxFooter` instead)

## 7.2.2

Fixes:

- [GeoSelectBase] Propagate cssModifier to geoScrollableContainer

## 7.2.1

Fixes:

- Fix height issues with scrollable content in GeoSelect

## 7.2.0

New:

- Add flag to force GeoSelect dropdown position and change max height accordingly
- Add flag to GeoDropdown to sync options list width with that of the toggle button

Fixes:

- Propagate GeoSelect cssModifier to inner GeoDropdown
- Don't emit click-outside event if GeoDropdown popup is open

## 7.1.2

Fixes:

- SCSS modifier refactor in `GeoButton`.

## 7.1.1

Fixes:

- Icons as props in `GeoSelect`.

## 7.1.0

New:

- `GeoScrollableContainer` component.

## 7.0.1

Fixes:

- `GeoSegmentedControlItem` content is properly centered.

## 7.0.0

New:

- `GeoDropdownListItem` `header` and `footer` slots.

Breaking:

- Renamed some CSS classes in `GeoDropdownListItem`.

## 6.2.0

New:

- `GeoSegmentedControl`
- `GeoFileUpload`

## Previous versions

Changelog was not tracked yet.