# Changelog

## 35.0.1
New:
- Added `disable` property in `GeoCollapsableBox`
## 35.0.0
Breaking:
- Drop support for nodejs 18. The latest supported version is now 16.

## 34.0.0
Breaking:
- Support up to nodejs 18
- Earlier nodejs versions will still be supported for users of this package but for developing it we need to have nodejs 17 or newer. That's because we use vuepress 1.X which uses webpack 4 which doesn't work with nodejs 17 or newer without the `NODE_OPTIONS=--openssl-legacy-provider` flag. By adding this flag to our build scripts we limit the developers to use nodejs >= 17 since this flag was introduced in version 17.

## 33.2.0
New:
- `GeoTree` and `GeoTreeItem`: Add support for single select mode UX. Added prop `is-single-select-mode` to use it. When this is true the input will be radio instead of checkbox

## 33.1.1
Changed:
- `GeoMarquee`: Set the default duration property as 7

## 33.1.0
New:
- `GeoTree` and `GeoTreeItem`: Add support for drag and drop behaviour. Added events for `drag-start`, `drag-end` and `change-drag` events when using `draggableGroup` prop

## 33.0.1
New:
- `GeoLineChart`: Add isInteractive property to chart config to allow to disable interactions with line groups

## 33.0.0
Breaking:
- `GeoTree` and `GeoTreeItem`: Change `check` event for `check-item`

New:
- `GeoTree` and `GeoTreeItem`: Add `check-folder` event

## 32.0.4
Fix:
- `GeoTree` and `GeoTreeItem`: Fix description in subcategories, allow custom sorting and wrap text in overflowing labels
## 32.0.3
Fix:
- `GeoTree` and `GeoTreeItem`: Fix empty folders input state with nested subfolders and long names

## 32.0.2
Fix:
- `GeoTree` and `GeoTreeItem`: Fix empty folders input state

## 32.0.1
New:
- `GeoTree` and `GeoTreeItem`: Add support for empty folders

## 32.0.0
New:
- `GeoTree`: Add new prop `collapsedIcon` to use custom collapsed icon
- `GeoTreeItem`: Add new prop `expandedIcon` to use custom expanded icon

Changed:
- `GeoTree`: Slot `actionButton` now is always visible.
- `GeoTreeItem`: Slot `trailingAccessoryAction` now is always visible, is set recursively to children and receive the category as prop.

## 31.0.0
Breaking:
- `GeoTree`: Renamed prop from `inital-expanded-categories` to `dynamic-expanded-categories`.

Changed
- `GeoTree`: Fix visual issues and add send more params on click event
## 30.0.17
Tests:
- `GeoChartLabels`: Added tests for geo chart labels
## 30.0.16
Fix:
- `GeoListItem`: Improved the list item to make it adapt to parent width.
## 30.0.15
New:
- `GeoChartLabels`: Added 'idHorizontalAxis' and the key values of the axis props to get the horizontal and vertical labels in the end of the bar charts according to their values.
- `GeoChartBars`: Added 'isPositioningLabelsInBars' props to set the labels for bar groups.
## 30.0.14
Fix:
  - `GeoCalendar`: Changed logic to validate ranges to take equal day range as valid
## 30.0.13
Fix:
  - `GeoTrimmedContent`: Improved logic to detect if content is trimmed to display tooltip
## 30.0.12
Fix:
  - Updated dependencies to remove critical issues
## 30.0.11
New:
- `GeoCalendar`: Added 'isToDateDisabled' and 'isFromDateDisabled' props to force to select only one side of the range
- `GeoCalendarDropdown`: Added 'isToDateDisabled' and 'isFromDateDisabled' props to force to select only one side of the range
## 30.0.10
Changed:
- Update to node 14
## 30.0.9
Fix:
- `GeoTable`: Remove unnecessary height: 100% attribute in table-row-headers styles that could break header border lines in some situations
## 30.0.8
Fix:
- Replace deprecated node-sass library
## 30.0.7
New:
- `GeoMultiSelect`: Now pagination is applied on grouped items not on groups
## 30.0.6
Fix:
- `GeoChart`: Fix negative width for axis ticks
## 30.0.5
New:
- `GeoSelect`: Added slots with scope to customise header and footer
- `GeoMultiselect`: Added slots with scope to customise header and footer
- `GeoListItem`: Added options to add trailing icon and tooltip
## 30.0.4
Fix:
- `GeoCalendar`: Fix bug on selected date time so we don't change the date when transforming to ISO
## 30.0.3

Fix:

- `GeoCalendar`: Fix bug that allowed to select a date outside the earliestDate-latestDate range
## 30.0.2

Fix:

- `Geochart`: Fix axis bug in local

## 30.0.1

New:

- `GeoTooltip` warn logs throttled

## 30.0.0
Breaking:

- `GeoBorderedBoxHeader`: changed close icon prop name for trailing icon

Changed:

- `GeoSelectToggleButton`: changed icon rotation direction
- `GeoDropdownSelectButton`: changed icon rotation direction

## 29.11.0

New:

- `GeoCalendar` allows to select multiple quarters and weeks

## 29.10.2

New:

- Added `tokens/system.tokens.scss` file to be able to import only variables, mixins and functions

## 29.10.1

Fix:

- `GeoTable`: check for existing ref before accessing it
- `GeoDropdownRegularButton`: removed empty div when no content in slot
- Block publish attempt when build fails
## 29.10.0

Changed:

- `GeoDropdownRegularButton`: Added iconPosition prop
- `GeoDropdownSelectButton` component
## 29.9.17

Changed:

- `GeoPill`: Added outline variant
## 29.9.16

Changed:

- `GeoChart`: Added margin to vertical axis text

## 29.9.15

Changed:

- Version to fix bugged previous publish

## 29.9.14

Changed:

- `GeoChart`: Replace vertical axis text with html to allow using css to add ellipsis

## 29.9.13

Changed:

- `GeoValue`: Update geo-value primary & secondary styles

## 29.9.12

Changed:

- `GeoValue`: Update geo-value secondary styles

## 29.9.11

- Fix:

- `GeoCalendarNavigation`: Modify margin to use padding to avoid problems rendering it inside a dropdown.

## 29.9.10

Fix:

- `GeoChartQuadrant`: Allow date as threshold value.

## 29.9.9

- Fix `geo-dropdown`, made test more complex.

## 29.9.8

- Fix `geo-dropdown` component to prevent emit outside click on popup children click.

## 29.9.7

- Fix `geo-list-item` components: not emit click event if the component is disabled.

## 29.9.6

- Fix `geo-bordered-box-header-search-form`, emit the value without deburr it.

## 29.9.5

- Removed outdated prop in `geo-button`

## 29.9.4

- Fix `geo-tree` component: not emit a category as a check if has subcategories.

## 29.9.3

- Fixed deployment issue

## 29.9.2

- Ignore flaky test to avoid failing deployments. (This will fix in next versions)

## 29.9.1

- Fixed deployment issue

## 29.9.0

New:

- Added `geo-tree` component.
- Added `geo-tree-item` component to work with `geo-tree`

## 29.8.7

New:

- Listening to native click event in `geo-segmented-control-item` to avoid errors using it with testing tools.

## 29.8.6

New:

- Fix `geo-segmented-control-item` styles

## 29.8.5

New:

- Fix `geo-segmented-control-item` to work right with `geo-trimmed-content`

## 29.8.4

New:

- Fix check if $refs exists in `geo-dropdown` to avoid errors.

## 29.8.3

New:

- Fix check if $refs exists in `geo-dropdown` to avoid errors.

## 29.8.2

New:

- Fix `geo-segmented-control-item` styles


## 29.8.1

New:

- Fix `geo-segmented-control-item` styles

## 29.8.0

New:

- Add `geo-trimmed-content` component in `geo-segmented-control-item` component slot

## 29.7.0

Fix:

- Add readOnly prop to `geo-input`
- Fix `geo-calendar` selection dates
- `geo-calendar` uses readOnly input if selected granularity is not daily

## 29.6.3

Fix:

- Fix build error

## 29.6.2

New:

- Add ref to `geo-dropdown` in `GeoCalendarDropdown`

## 29.6.1

New:

- Added classes to `GeoExternalLinkButton` to access easier to "a" and "svg" tags.

## 29.6.0

New:

- `GeoValue` component

## 29.5.5

Fix:

- date inputs are disabled in `GeoCalendar` when granularity is non-daily

## 29.5.4

New:

- `animationsDuration` prop to have a specific animation time for `GeoScatterPlot`

## 29.5.3

Fix:

- cursor is `not-allowed` when `GeoDropdownRegularButton` is `disabled`

## 29.5.2

Fix:

- `cursor` is `default` when `onDotClicked` isn't defined in `GeoScatterPlot`

New:

- `getOpacity` prop in `GeoScatterPlot`
- `blockMouseEvents` prop in `GeoScatterPlot`
- `trailingItems` slot in `GeoCollapsableBox`

## 29.5.1

New:

- `GeoChartScatterPlot` returns coordinates on click event

## 29.4.3

Changed:

-`GeoTableSort` is now always visible

## 29.4.2

Fix:

- label position in `GeoChartQuadrant`
- handle click event from external component in `GeoChartScatterPlot`

New:

- `forceTickCount` in `ticks` property of `GeoChartAxis`

## 29.4.1

New:

- `GeoCalendar` Row containing day names is now properly aligned

## 29.4.0

New:

- `GeoChartScatterPlot` component
- `GeoChartQuadrant` component

## 29.3.0

New:

- `GeoChartStackedBars` component

## 29.2.1

Fix:

- `GeoDropdown` Add `repositionOnUpdate` prop to reposition popup on update hook

## 29.2.0

New:

- `GeoTooltip` position and alignment can be passed to `GeoTrimmedContent`

## 29.1.5

Fix:

- Align description when `GeoListItem` has icon

## 29.1.4

Fix:

- Use `enumPropertyFactory` validator in several components

## 29.1.3

Fix:

- `GeoInput` width doesn't change when delete icon appears
- `GeoCalendar` day icons are correctly displayed when creating an interval

## 29.1.2

Fix:

- Place $slots calculation directly in template and remove them from computed property in `geoWizardLayout`

## 29.1.1

Fix:

- `@fortawesome/free-solid-svg-icons` is no longer required if not mocking pro icons.

Changed:

- Updated most dependencies to their latest versions.
- Added Greenkeeper to the repo.

## 29.1.0

New:

- Export `mockFontAwesomeProIcons` to make it easier to use the Design System without FontAwesome Pro.

## 29.0.0

Breaking:

- Remove `css-modifier` mixin and prop.
- Do not embed `d3` library.

## 28.2.0

New:

- `static` prop for `GeoTooltip` with actions inside

Fixed:

- Show only one `GeoTooltip` when fast hovering

## 28.1.1

Fixed:

- `GeoTable` will compute column size faster.
- `GeoTable` will compute page size faster.

## 28.1.0

New:

- `GeoSidebarLayout` component
- `GeoVerticalLayout` component
- `GeoWizardLayout` component
- `GeoTooltipButton` component

## 28.0.0

Changed:

- Include `date-fns` as peerDependency

Fixed:

- Import `date-fns` functions separately

## 27.2.1

Fixed:

- `GeoTable` will compute column size faster.
- `GeoTable` will compute page size faster.

## 27.2.0

New:

- `GeoTable` emits event `column-width-changed` when columns width changes.

## 27.1.0

New:

- `GeoTooltip` can have a `forcedTriggerTarget`

Fixed:

- Remove `GeoTooltip` from the DOM when parent is removed
- Remove previous event handlers

Changed:

- `label` prop in `GeoBorderedToken` is optional
- new default `slot` in `GeoBorderedToken`

## 27.0.1

Fixed:

- `GeoDropdown` won't make positionioning computations when scrolling a container inside its popup content.

## 27.0.0

Breaking:

- `GeoInput` renamed `suffix` and `prefix` slots to `leadingAccessoryItem` and `trailingAccessoryItem`

New:

- `GeoInputSuffix` component
- `GeoInputPrefix` component
- `GeoSelectToggleButton` can have variant `inputAccessorySuffix` and `inputAccessoryPrefix`

## 26.2.0

New:

- `GeoDropdown` supports `popupClass` prop to customize popup class
- `GeoCalendarDropdown` supports `popupClass` prop to customize popup class
- `GeoEditableInput` supports `popupClass` prop to customize popup class
- `GeoSelect` supports `popupClass` prop to customize popup class
- `GeoSelectBase` supports `popupClass` prop to customize popup class

## 26.1.8

Changed:

- `GeoTrimmedContent` uses `GeoTooltip` instead of `v-tooltip`

## 26.1.7

Fixed:

- `GeoListItem` keep class passed to component.

## 26.1.6

Fixed:

- `GeoListGroup` add separator between groups.

## 26.1.5

Changed:

- Default value for `GeoTooltip` delay is 0

## 26.1.4

Fixed :

- `deleteIcon` displayed when `GeoSelectToggleButton` is not empty

## 26.1.3

Fixed:

- `GeoDropdown` will be properly right-aligned when its width changes.
- `GeoInput` use 100% width.

## 26.1.2

Fixed:

- `GeoTrimmedContent` revert changes in component.

## 26.1.1

Fixed:

- `GeoTrimmedContent` fixed version for `v-tooltip` lib.
- `GeoTrimmedContent` save in data the selected html.

## 26.1.0

New:

- `GeoInput` added `accessoryItem` slot
- `GeoCompactButton` added `inputAccessory` variant
- `GeoInputAccessoryCompactButton` component
- `GeoEditableInput`,  `GeoInput` updated focus box-shadow style

## 26.0.0

Breaking:

- `GeoBorderedBoxHeaderSearchForm` now uses `GeoInput`

## 25.6.0

New:

- Add support for aliases in `GeoCalendar`

## 25.5.0

New:

- `GeoDropdown` has access to the available height for the popup

## 25.4.3

Changed:

- `GeoEditableInput` inherits component `$attrs`

## 25.4.2

Fixed:

- Add condition for deleteIcon in `GeoInput`

## 25.4.1

-`GeoListFooterButton` uses `GeoTertiaryButton`

## 25.4.0

New:

- `GeoEditableInput` now accepts `type` prop `number` or `text`

Fixed:

- `GeoEditableInput` pass down loading prop to `GeoCompactButton`

## 25.3.0

New:

- `GeoMarkdownContent` now accepts vue events with syntax `[link](@event)`

## 25.2.0

New:

- `GeoInput` now accepts attribute `autofocus` to automatically focus the input

## 25.1.0

- `GeoListItem` accepts a new prop `wrapperTag` that changed the html tag that is wrapping the whole component

## 25.0.0

Breaking:

- `GeoButton` removed `destructive` type
- `GeoFeedbackBox` removed `warn` variant
- `GeoDropdown` Removed `GeoDropdownHeader` (use `GeoBorderedBoxHeader` instead)
- `GeoDropdown` Removed `GeoDropdownFooter` (use `GeoBorderedBoxFooter` instead)
- `GeoDropdown` Removed `GeoDropdownGroup` (use `GeoListGroup` instead)
- `GeoDropdown` Removed `GeoDropdownListItem` (use `GeoListItem` instead)
- `GeoSelect` Removed `GeoSelectReadOnlyEntry` (use `GeoListClearItem` instead)
- `GeoSelect` Removed `GeoSelectMoreResultsFooterButton` (use `GeoListFooterButton` instead)
- `GeoSelect` Removed `GeoSelectSearchEntryForm` (use `GeoBorderedBoxHeaderSearchForm` instead)

## 24.15.0

New:

- Add `suffix` and `prefix` for `GeoInput`

## 24.14.0

New:

- Add fonts for `GeoTable`

## 24.13.1

Changed:

- Changed tooltips style in `GeoTooltip` and `GeoChart`

## 24.13.0

New:

- `GeoCompactButton` component
- `GeoPrimaryCompactButton` component
- `GeoSecondaryCompactButton` component
- `GeoDangerCompactButton` component

## 24.12.0

Changed:

- `GeoEditableInput` now works with `GeoCompactButton`
- `GeoBorderedBoxColumn` component
- `GeoHorizontalLayout` component

## 24.11.2

Fixed:

- `GeoDropdown` Add logging error messages when passing an invalid property

## 24.11.1

Changed:

- Prevent form submission when pressing enter in `GeoBorderedBoxHeaderSearchForm`

## 24.11.0

New:

- `GeoListItem` has new `disabled` property to style it as a disabled item

## 24.10.3 (Backport)

Fixed:

- `GeoDropdown` Add logging error messages when passing an invalid property

## 24.10.2

Fixed:

- `GeoNotificationBar` Fix crashes when no icon is given

## 24.10.1

Changed:

- `GeoCalendar` Update `GeoCalendar` tests with flow variations

## 24.10.0

Changed:

- `GeoCalendar` Upgrade date-fns to v2.2.1

## 24.9.0

New:

- `GeoCollapsableBox` component.

## 24.8.0

New:

- `GeoSelectToggleButton` delete icon with `delete-value` event.

## 24.7.0

New:

- `GeoExternalLinkButton`

## 24.6.1

Fixed:

- Restore `GeoInput` icon's color

## 24.6.0

Changed:

- `GeoInput` accepts a new prop for leading icons

## 24.5.0

Changed:

- `GeoCalendar` now uses more intuitive flows for the user when selecting dates.

New:

- `GeoInput` includes a delete icon when hovering on it that allows the user to remove the text on the said input field.

## 24.4.0

New:

- `GeoTooltip` component

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
