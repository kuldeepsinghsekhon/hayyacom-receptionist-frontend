import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store'
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ar_EG from 'antd/lib/locale/ar_EG';
import en_US from 'antd/lib/locale/en_US';
import './index.css';
import { ConfigProvider } from 'antd';
import {IntlProvider} from "react-intl";
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl';

ReactDOM.render(
   <Provider store={store} locale={ar_EG}>
    <BrowserRouter>
 <IntlProvider locale='en'>
    <App />
	</IntlProvider>
  </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
