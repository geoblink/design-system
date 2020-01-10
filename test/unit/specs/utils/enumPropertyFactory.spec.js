import { enumDefaultPropertyFactory, enumRequiredPropertyFactory } from 'src/utils/enumPropertyFactory.js'

describe('#enumPropertyFactory', function () {
  const componentName = 'MyDemoComponent'
  const propertyName = 'preferredOption'
  const required = true
  const enumDictionary = {
    optionA: 'optionA',
    optionB: 'optionB'
  }

  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('Should return a valid prop declaration', function () {
    const enumDefaultProperty = enumDefaultPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumDefaultProperty).toHaveProperty('type', String)
    expect(enumDefaultProperty).toHaveProperty('defaultValue', undefined)
    expect(enumDefaultProperty).toHaveProperty('validator')

    const enumRequiredProperty = enumRequiredPropertyFactory({ enumDictionary, componentName, propertyName, required })
    expect(enumRequiredProperty).toHaveProperty('type', String)
    expect(enumRequiredProperty).toHaveProperty('required', true)
    expect(enumRequiredProperty).toHaveProperty('validator')
  })

  it('Should set default value', function () {
    const enumProperty = enumDefaultPropertyFactory({ enumDictionary, componentName, propertyName, defaultValue: enumDictionary.optionA })
    expect(enumProperty).toHaveProperty('default', enumDictionary.optionA)
  })

  it('Should set default required to false', function () {
    const enumProperty = enumRequiredPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumProperty).toHaveProperty('required', false)
  })

  it('Should accept values in enum', function () {
    const enumDefaultProperty = enumDefaultPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumDefaultProperty.validator(enumDictionary.optionA)).toBeTruthy()
    expect(enumDefaultProperty.validator(enumDictionary.optionB)).toBeTruthy()

    const enumRequiredProperty = enumRequiredPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumRequiredProperty.validator(enumDictionary.optionA)).toBeTruthy()
    expect(enumRequiredProperty.validator(enumDictionary.optionB)).toBeTruthy()
  })

  it('Should reject values not in enum', function () {
    jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const enumDefaultProperty = enumDefaultPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumDefaultProperty.validator('unknown value')).toBeFalsy()

    const enumRequiredProperty = enumRequiredPropertyFactory({ enumDictionary, componentName, propertyName })
    expect(enumRequiredProperty.validator('unknown value')).toBeFalsy()
  })

  it('Should log a warning when a value is rejected', function () {
    const consoleWarnSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { })

    const enumDefaultProperty = enumDefaultPropertyFactory({ enumDictionary, componentName, propertyName })
    enumDefaultProperty.validator('unknown value')
    expect(consoleWarnSpy).toHaveBeenCalledWith('MyDemoComponent [component] :: Unsupported value («unknown value») for «preferredOption» property. Use one of «optionA», «optionB»')

    const enumRequiredProperty = enumRequiredPropertyFactory({ enumDictionary, componentName, propertyName })
    enumRequiredProperty.validator('unknown value')
    expect(consoleWarnSpy).toHaveBeenCalledWith('MyDemoComponent [component] :: Unsupported value («unknown value») for «preferredOption» property. Use one of «optionA», «optionB»')
  })
})
