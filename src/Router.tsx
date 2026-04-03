import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Home from './routes/Home';
import Play from './routes/Play';
import Rules from './routes/Rules';
import About from './routes/About';

export default function Router() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play" element={<Play />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
