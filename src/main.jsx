import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Navbar from './components/Navbar.jsx'
import Offer from './Offer.jsx'
import Footer from './footer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <App />
    <div id="Offers">
    <Offer />
    </div>
    <div>
      <Footer />
    </div>
  

  </StrictMode>,
)
