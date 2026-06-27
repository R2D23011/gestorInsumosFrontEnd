import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Landing from './pages/Landing.jsx';
import NeedsPage from './pages/NeedsPage.jsx';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-teal-100">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/necesidades" element={<NeedsPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
