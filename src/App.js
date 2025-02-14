import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaksi';
import Profile from './pages/Profiles';

function App() {
  return (
    <Router>
      <Navbar />
      <div className='App-content'>
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div >
    </Router>
  )
}

export default App;
