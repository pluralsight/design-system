import { dashify } from '../dashify'

it('handles undefined gracefully', () => {
  expect(dashify()).toEqual(undefined)
})

it('keeps lowercase', () => {
  expect(dashify('select')).toEqual('select')
})

it('converts to lowercase', () => {
  expect(dashify('Select')).toEqual('select')
})

it('converts camelCase to kebab-case', () => {
  expect(dashify('selectMe')).toEqual('select-me')
})

describe('dash exceptions', () => {
  it('appends dash to numbers', () => {
    expect(dashify('select1')).toEqual('select-1')
    expect(dashify('select2again')).toEqual('select-2-again')
  })

  it('does not dashify x (extra) abbreviations', () => {
    expect(dashify('xSmall')).toEqual('xsmall')
    expect(dashify('buttonXSmall')).toEqual('button-xsmall')
    expect(dashify('buttonXSmallTailPosition')).toEqual(
      'button-xsmall-tail-position'
    )
  })
})
