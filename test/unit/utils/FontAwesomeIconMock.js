export const FontAwesomeIconMock = {
  props: ['icon'],
  template: '<div></div>'
}

export function expectFontAwesomeIconProp (elem, icon) {
  expect(elem.props().icon).toStrictEqual(icon)
}
