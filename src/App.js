import React from 'react';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
function App() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
