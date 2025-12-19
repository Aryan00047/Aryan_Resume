import './App.css'
import AboutMe from './components/AboutMe'
import ConnectWithMe from './components/ConnectWithMe'
import Education from './components/Education'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Skills from './components/Skills'
import WorkExp from './components/WorkExp'
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from "@vercel/analytics/next"

function App() {

  return (
    <div className=''>
      <Header/>
      <HomePage/>
      <AboutMe/>
      <WorkExp/>
      <Skills/>
      <Education/>
      <ConnectWithMe/>
      <Footer/>
      <SpeedInsights/>
      <Analytics />
    </div>
  )
}

export default App
