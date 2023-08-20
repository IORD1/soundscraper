import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './components/home';

function App() {
  const[username, setUsername] = useState('');
  const[password, setPassword] = useState('');

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/"  element={ <Home  /> }/>
        <Route path="/login"  element={ <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} /> }/>
      </Routes>
    </Router>
    </div>  
  );
}

export default App;
