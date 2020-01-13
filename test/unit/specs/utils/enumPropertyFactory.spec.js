import { enumPropertyFactory } from 'src/utils/enumPropertyFactory.js'

describe('#enumPropertyFactory', function () {
  const componentName = 'MyDemoComponent'
  const propertyName = 'preferredOption'
  const required = true
  const checkUndefined = true
  const defaultValue = 'optionDefault'
  const enumDictionary = {
    optionA: 'optionA',
    optionB: 'optionB'
  }

  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('Should return a valid prop declaration', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName, defaultValue, required })
    expect(enumProperty).toHaveProperty('type', String)
    expect(enumProperty).toHaveProperty('default', 'optionDefault')
    expect(enumProperty).toHaveProperty('validator')
    expect(enumProperty).toHaveProperty('required', true)
  })

  it('Should set default value when given', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName, defaultValue: enumDictionary.optionA })
    expect(enumProperty).toHaveProperty('default', enumDictionary.optionA)
  })

  it('Should set default required when given', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName, required })
    expect(enumProperty).toHaveProperty('required', true)
  })

  it('Should accept values in enum', function () {
    const enumProperty = enumPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumProperty.validator(enumDictionary.optionA)).toBeTruthy()
    expect(enumProperty.validator(enumDictionary.optionB)).toBeTruthy()
    expect(enumProperty.validator(undefined)).toBeFalsy()

    const enumPropertyWithUndefined = enumPropertyFactory({ enumDictionary, componentName, propertyName, checkUndefined })
    expect(enumPropertyWithUndefined.validator(undefined)).toBeTruthy()
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
