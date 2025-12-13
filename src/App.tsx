import './App.css'
import AboutMe from './components/AboutMe'
import ConnectWithMe from './components/ConnectWithMe'
import Contact from './components/Contact'
import Education from './components/Education'
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './components/HomePage'
import Skills from './components/Skills'
import WorkExp from './components/WorkExp'

function App() {

  return (
    <div className=''>
      <Header/>
      <HomePage/>
      <AboutMe/>
      <WorkExp/>
      <Skills/>
      <Education/>
      <Contact/>
      <ConnectWithMe/>
      <Footer/>
    </div>
  )
}

export default App
