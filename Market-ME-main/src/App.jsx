import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AgencyProfile from './components/AgencyProfile'
import About from './components/About'
import GuidelinesAndRules from './components/GuidelinesAndRules'
import AgenciesPage from './components/AgenciesPage'
import ContactForm from './components/ContactForm'
import ConfirmationPage from './components/ConfirmationPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="relative flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/agencies" element={<AgenciesPage />} />
            <Route path="/agency/:id" element={<AgencyProfile />} />
            <Route path="/contact/:id" element={<ContactForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/guidelines" element={<GuidelinesAndRules />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
