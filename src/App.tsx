import React from 'react';
import './styles/flow.css';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Auth from './routes/Auth';
import ActionFlow from './routes/ActionFlow';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ActionFlow />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
    // <div className="App">
    //   <ActionFlow />
    // </div>
  );
}

export default App;
