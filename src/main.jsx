import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { TranslateProvider } from './core/components/TranslateProvide'
import PageProvider from './hooks/usePage'
import store from './store'
import vi from './locales/en-vi.js'
import cn from './locales/en-cn.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <TranslateProvider translate={{vi, cn}}>
      <PageProvider>
        <Provider store={store}>
            <App />
          </Provider>
      </PageProvider>
    </TranslateProvider>
  </BrowserRouter>
)
