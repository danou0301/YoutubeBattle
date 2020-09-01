import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";


ReactDOM.render(

<HashRouter>
  <Helmet>
        <title>yt-views</title>
        <meta name="description" content="How many views ?" />
  
    </Helmet>
  <App/>
</HashRouter>, document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
