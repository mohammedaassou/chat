import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css"
import { ContextProvider } from './context/context';
import { Auth0Provider } from '@auth0/auth0-react';


const domain = "dev-mdmdx0vyozv452hh.us.auth0.com";
const clientId = "vQwEzW25M92QBwDbtLAdPfi7icn4T6ip";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ContextProvider>
        <Auth0Provider
                domain={domain}
                clientId={clientId}
                redirectUri={window.location.origin}>
        <App/>
        </Auth0Provider>   
    </ContextProvider>

);