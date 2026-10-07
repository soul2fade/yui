import { screen } from '@testing-library/react'
import { renderRoute } from './renderRoute'
import { SESSIONS } from '../pages/WebinarPage'
import { WORKSHEET_HREF, WORKSHEET_ONLINE_HREF } from '../pages/WebinarRegisteredPage'

describe('webinar', () => {
  it('shows both dates with their times', () => {
    renderRoute('/webinar')
    const page = screen.getByTestId('webinar-page')
    expect(page).toHaveTextContent('November 4')
    expect(page).toHaveTextContent('11:00 to 11:45am PT')
    expect(page).toHaveTextContent('November 5')
    expect(page).toHaveTextContent('1:00 to 1:45pm PT')
  })

  it('sends each date to its own Cal.com event', () => {
    renderRoute('/webinar')
    expect(screen.getByRole('link', { name: /register for wed, nov 4/i })).toHaveAttribute(
      'href',
      'https://cal.com/stop-lists',
    )
    expect(screen.getByRole('link', { name: /register for thu, nov 5/i })).toHaveAttribute(
      'href',
      'https://cal.com/stop-lists2',
    )
    expect(SESSIONS).toHaveLength(2)
  })

  it('does not hand out the worksheet before registering', () => {
    renderRoute('/webinar')
    expect(screen.queryByRole('link', { name: /download the worksheet/i })).toBeNull()
  })

  it('hands out the worksheet both ways after registering', () => {
    renderRoute('/webinar/registered')
    expect(screen.getByRole('link', { name: /download the worksheet/i })).toHaveAttribute(
      'href',
      WORKSHEET_HREF,
    )
    expect(screen.getByRole('link', { name: /fill it in online/i })).toHaveAttribute(
      'href',
      WORKSHEET_ONLINE_HREF,
    )
  })
})
