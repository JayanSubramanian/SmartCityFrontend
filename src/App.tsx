import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Tumor from './components/Tumor';
import Pipeline from './components/Pipeline';
import NutriBot from './components/Nutribot';
import FoodCorrection from './components/FoodCorrection';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/tumor" element={<Tumor />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/nutribot" element={<NutriBot />} />
      <Route path="/foodcorrection" element={<FoodCorrection />} />
    </Routes>
  );
}

export default App;
