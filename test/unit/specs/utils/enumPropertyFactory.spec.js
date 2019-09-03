import enumPropertyFactory from 'src/utils/enumPropertyFactory.js'

describe('#enumPropertyFactory', function () {
  const componentName = 'MyDemoComponent'
  const propertyName = 'preferredOption'
  const enumDictionary = {
    optionA: 'optionA',
    optionB: 'optionB'
  }

  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('Should return a valid prop declaration', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumProperty).toHaveProperty('type', String)
    expect(enumProperty).toHaveProperty('defaultValue', undefined)
    expect(enumProperty).toHaveProperty('validator')
  })

  it('Should set default value', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName, defaultValue: enumDictionary.optionA })
    expect(enumProperty).toHaveProperty('default', enumDictionary.optionA)
  })

  it('Should accept values in enum', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumProperty.validator(enumDictionary.optionA)).toBeTruthy()
    expect(enumProperty.validator(enumDictionary.optionB)).toBeTruthy()
  })

  it('Should reject values not in enum', function () {
    jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumProperty.validator('unknown value')).toBeFalsy()
  })

  it('Should log a warning when a value is rejected', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName })
    enumProperty.validator('unknown value')
    expect(consoleWarnSpy).toHaveBeenCalledWith('MyDemoComponent [component] :: Unsupported value («unknown value») for «preferredOption» property. Use one of «optionA», «optionB»')
  })
})

