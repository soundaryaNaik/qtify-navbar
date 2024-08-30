// src/App.js
import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Section from './components/Section/Section';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Section title="Top Albums" endpoint="https://qtify-backend-labs.crio.do/albums/top" />
      <Section title="New Albums" endpoint="https://qtify-backend-labs.crio.do/albums/new" />
      <Section title="Songs" endpoint="https://qtify-backend-labs.crio.do/songs" />
    </div>
  );
}

export default App;
