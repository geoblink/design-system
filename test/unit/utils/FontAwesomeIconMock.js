const FontAwesomeIconMock = {
    props: ['icon'],
    template: '<div></div>'
}

export {FontAwesomeIconMock} 
  
export function expectFontAwesomeIconProp (elem, icon) {
    expect(elem.props().icon).toStrictEqual(icon)
}