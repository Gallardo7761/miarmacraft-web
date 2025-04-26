import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from './context/ConfigContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import './css/index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<ConfigProvider>
      <AuthProvider>
        
      </AuthProvider>
    </ConfigProvider> */}
    <BrowserRouter basename='/miarmacraft'>
      <App />
    </BrowserRouter>
  </StrictMode>
)