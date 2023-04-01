import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: '9f431983-beba-4932-9344-158917c5df87',
        authority: 'https://login.microsoftonline.com/66d8b4e2-c5c4-4cf5-a676-9066c1562871',
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storageAuthStateInCookie: false,
    },
    system:  {
        loggerOptions: {
            loggerCallback: (level, message, containsPII) => {
                console.log(message)
            },
            logLevel: "Info"
        }
    }
})

pca.addEventCallback(event => {
    if(event.eventType === EventType.LOGIN_SUCCESS){
        console.log(event)
        pca.setActiveAccount(event.payload.account)
    }

})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
