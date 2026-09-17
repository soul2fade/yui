import { Navigate } from 'react-router-dom'
import Layout from './Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import AuditPage from './pages/AuditPage'
import BottleneckPage from './pages/BottleneckPage'
import FreeAuditPage from './pages/FreeAuditPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import SecurityPage from './pages/SecurityPage'

// Route table in vite-react-ssg's data-router format. Every static path here is
// crawled and prerendered at build time. The catch-all is client-only.
export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'audit', element: <AuditPage /> },
      { path: 'bottleneck', element: <BottleneckPage /> },
      { path: 'free-audit', element: <FreeAuditPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'security', element: <SecurityPage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]
