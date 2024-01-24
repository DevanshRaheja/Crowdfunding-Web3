import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains";
import { StateContextProvider } from './context';

import App from "./App";
import "./index.css";

const root= ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider activeChain={ Sepolia } 
      // clientId="6213a44c02716f89577b96d7ce47bd8f"
  >
    <Router>
      <StateContextProvider>
        <App />
      </StateContextProvider>
      
    </Router>
  </ThirdwebProvider>
)