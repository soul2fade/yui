import { screen, fireEvent, waitFor } from '@testing-library/react'
import { renderRoute } from './renderRoute'
import { WORKSHEET_HREF, WORKSHEET_ONLINE_HREF } from '../pages/WebinarPage'

describe('webinar registration', () => {
  afterEach(() => vi.restoreAllMocks())

  it('shows both dates and asks where the business is based', () => {
    renderRoute('/webinar')
    const page = screen.getByTestId('webinar-page')
    expect(page).toHaveTextContent('November 4')
    expect(page).toHaveTextContent('November 5')
    expect(page).toHaveTextContent('11:45am to 12:30pm PT')
    expect(screen.getByLabelText(/city where your business is based/i)).toBeRequired()
  })

  it('does not show the worksheet link before registering', () => {
    renderRoute('/webinar')
    expect(screen.queryByRole('link', { name: /download the worksheet/i })).toBeNull()
  })

  it('posts to Netlify Forms and then reveals the worksheet', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true })
    vi.stubGlobal('fetch', fetchMock)
    renderRoute('/webinar')
    fireEvent.click(screen.getByLabelText(/Thursday, November 5/))
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Pat' } })
    fireEvent.change(screen.getByLabelText(/^email/i), { target: { value: 'pat@example.com' } })
    fireEvent.change(screen.getByLabelText(/business name/i), { target: { value: 'Pat HVAC' } })
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Elk Grove' } })
    fireEvent.click(screen.getByRole('button', { name: /save my seat/i }))

    const link = await screen.findByRole('link', { name: /download the worksheet/i })
    expect(link).toHaveAttribute('href', WORKSHEET_HREF)
    expect(screen.getByRole('link', { name: /fill it in online/i })).toHaveAttribute(
      'href',
      WORKSHEET_ONLINE_HREF,
    )
    const body = new URLSearchParams(fetchMock.mock.calls[0][1].body)
    expect(body.get('form-name')).toBe('webinar')
    expect(body.getAll('form-name')).toHaveLength(1)
    expect(body.get('session')).toBe('Thu Nov 5, 11:45am PT')
    expect(body.get('city')).toBe('Elk Grove')
    await waitFor(() => expect(screen.getByText(/See you Thu Nov 5/)).toBeInTheDocument())
  })
})
