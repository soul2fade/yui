import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from '../App'

// vite-react-ssg's <Head> is react-helmet-async under the hood; in the real app
// ViteReactSSG supplies the provider, so tests have to supply their own.
export function renderRoute(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  return render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
