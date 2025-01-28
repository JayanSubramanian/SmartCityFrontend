import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Chat from './components/Chat';
import Risk from './components/Risk';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/risk" element={<Risk />} />
    </Routes>
  );
}

export default App;
