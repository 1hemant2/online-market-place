import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: "2px",
            colorPrimary: '#405138',

            Button: {
              colorPrimary: '#405138',
              colorPrimaryHover: "#405138",
              borderRadius: "2px",
            },
          }
        }}
      >
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
