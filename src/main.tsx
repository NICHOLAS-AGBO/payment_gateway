import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Theme from "../src/components/Theme";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Theme>
    <App />
      </Theme>
  </React.StrictMode>,
)
