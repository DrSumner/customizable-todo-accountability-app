
import './style/App.css';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Goals from './components/Goals';
import { Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> until i get this finished*/}
        <Route path="/" element={<Goals />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </div>
  );
}

export default App;
