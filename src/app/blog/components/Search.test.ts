import { describe, expect, it } from 'vitest'

import { nextSearch, syncText } from './Search'

describe('nextSearch', () => {
	it('sets the trimmed keyword and keeps other params', () => {
		expect(nextSearch({ tag: 'react' }, '  hooks ')).toEqual({ tag: 'react', s: 'hooks' })
	})

	it('drops the keyword when the input is blank', () => {
		expect(nextSearch({ s: 'old', tag: 'css' }, '   ')).toEqual({ s: undefined, tag: 'css' })
	})
})

describe('syncText', () => {
	it('takes the URL value after back/forward', () => {
		expect(syncText({ text: 'react', urlValue: 'css', pending: false })).toBe('css')
		expect(syncText({ text: 'react', urlValue: '', pending: false })).toBe('')
	})

	it('keeps what was typed when it already matches the URL, including spaces', () => {
		expect(syncText({ text: 'react ', urlValue: 'react', pending: false })).toBe('react ')
	})

	it('never overwrites text that has not been sent yet', () => {
		expect(syncText({ text: 'reac', urlValue: 're', pending: true })).toBe('reac')
	})
})
