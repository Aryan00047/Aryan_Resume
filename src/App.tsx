import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import AboutMe from "./components/AboutMe";
import Certifications from "./components/Certifications";
import CodingProfiles from "./components/CodingProfiles";
import ConnectWithMe from "./components/ConnectWithMe";
import CursorGlow from "./components/CursorGlow";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import Skills from "./components/Skills";
import Work from "./components/Work";
import WorkExp from "./components/WorkExp";

/**
 * Every section reads from `src/data/content.json` and hides itself when it has
 * nothing to show, so the page shape follows the data you enter at /admin.
 */
function App() {
  return (
    <div className="page">
      <Loader />
      <CursorGlow />
      <Header />
      <HomePage />
      <Work />
      <WorkExp />
      <Skills />
      <CodingProfiles />
      <Certifications />
      <AboutMe />
      <ConnectWithMe />
      <Footer />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default App;
