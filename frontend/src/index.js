import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 50; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDelay = Math.random() * 15 + 's';
  particle.style.animationDuration = (15 + Math.random() * 10) + 's';
  if (Math.random() > 0.5) {
    particle.style.background = '#ff2d75';
  }
  particlesContainer.appendChild(particle);
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
