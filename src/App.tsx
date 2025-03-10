import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Tumor from './components/Tumor';
import Pipeline from './components/Pipeline';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/tumor" element={<Tumor />} />
      <Route path="/pipeline" element={<Pipeline />} />
    </Routes>
  );
}

export default App;
