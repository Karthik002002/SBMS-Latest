import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import Main from './Main';
import 'helpers/initFA';
import { WebSocketProvider } from 'context/SocketContext';

const container = document.getElementById('main');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Main>
      <App />
    </Main>
  </React.StrictMode>
);
