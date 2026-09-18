import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'

// House rule: "we" everywhere except the About section and the About page, which
// use "I". These tests guard the boundary rather than every sentence.
const FIRST_PERSON_SINGULAR = /\b(I|I'm|I’m|I've|I’ve|my)\b/

// "Find My Bottleneck" is a product name, not the voice.
const stripProductNames = (text) => text.replace(/find my bottleneck/gi, '')

describe('voice', () => {
  it('uses "I" in the homepage About section', () => {
    renderRoute('/')
    const about = document.getElementById('about')
    expect(about.textContent).toMatch(FIRST_PERSON_SINGULAR)
  })

  it('uses "we" in the homepage sections outside About', () => {
    renderRoute('/')
    for (const id of ['name', 'problem', 'diagnostics', 'services', 'how-it-works', 'work', 'pricing']) {
      const section = document.getElementById(id)
      expect(
        stripProductNames(section.textContent),
        `${id} should not speak as "I"`
      ).not.toMatch(FIRST_PERSON_SINGULAR)
    }
  })

  it('uses "I" on the About page, including the name story', () => {
    renderRoute('/about')
    const page = screen.getByTestId('about-page')
    expect(page.textContent).toMatch(FIRST_PERSON_SINGULAR)
    expect(page.textContent).toMatch(/YOO-ee/)
    expect(page.textContent).toMatch(/Japanese/)
  })
})
