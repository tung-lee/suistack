import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ProvidersAndLayout } from './components/Authentication/ProvidersAndLayout.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <ProvidersAndLayout>
      <App />
    </ProvidersAndLayout>
  </BrowserRouter>,
)
