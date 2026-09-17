import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './App.jsx'

// vite-react-ssg renders every route in `routes` to real HTML at build time and
// hydrates in the browser, so each marketing page ships as a static document.
export const createRoot = ViteReactSSG({ routes })
