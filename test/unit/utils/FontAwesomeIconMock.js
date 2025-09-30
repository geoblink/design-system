export const FontAwesomeIconMock = {
  name: 'font-awesome-icon',
  props: ['icon'],
  template: '<div></div>'
}

export function expectFontAwesomeIconProp (elem, icon) {
  expect(elem.props().icon).toStrictEqual(icon)
}
