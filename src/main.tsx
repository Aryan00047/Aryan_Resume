import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = createRoot(document.getElementById('root')!)

// The admin page exists only while running `npm run dev`. In a production
// build `import.meta.env.DEV` is replaced with `false`, so this whole branch —
// including the dynamic import — is dropped as dead code and never ships.
if (import.meta.env.DEV && window.location.pathname.startsWith('/admin')) {
  void import('./admin/AdminApp').then(({ default: AdminApp }) => {
    root.render(
      <StrictMode>
        <AdminApp />
      </StrictMode>,
    )
  })
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
