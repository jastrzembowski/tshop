import React from 'react'
import { createRoot } from 'react-dom/client'
import "./index.scss"
import { Provider } from 'react-redux'
import { store } from './api/configureStore.ts'
import { AppRoutes } from './routing/AppRoutes.tsx'
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router> 
        <AppRoutes/>
        </Router>
      </Provider>
  </React.StrictMode>,
)
