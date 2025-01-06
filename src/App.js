import React from "react";
import OserDemoLanding from "./pages/OserDemoLanding.js";
import { Route, Routes } from 'react-router-dom';
import BusinessChatBot from "./pages/BusinessChatBot.js";
import UserChatBot from "./pages/UserChatBot.js";
import LoginSignup from "./pages/Startup.js";

const App = () => {
  return (
      <div className="App">
        <Routes>
          <Route element={<LoginSignup />} path="/" exact />
          <Route element={<OserDemoLanding />} path="/home" exact />
          <Route element={<BusinessChatBot />} path="/electrify-ev-chatbot" />
          <Route element={<UserChatBot />} path="/user-ev-assist-chatbot" />
        </Routes>
      </div>
  );
}

export default App;
