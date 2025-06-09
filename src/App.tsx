import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignIn,
  SignUp,
  UserButton,
} from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PrivacyPage from './pages/PrivacyPage';
import './index.css';
import OurMissionPage from './pages/OurMissionPage';
function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          {/* Add more routes as needed */}
          <Route path="/our-mission" element={<OurMissionPage/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App