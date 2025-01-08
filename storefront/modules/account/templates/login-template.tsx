"use client";

import Login from "@/modules/account/components/login";
import Register from "@/modules/account/components/register";
import {useState} from "react";

export enum LOGIN_VIEW {
  REGISTER = "register",
  SIGN_IN = "sign-in",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in");

  return (
    <div className="flex w-full justify-start px-8 py-8">
      {currentView === "sign-in" ? (
        <Login setCurrentView={setCurrentView} />
      ) : (
        <Register setCurrentView={setCurrentView} />
      )}
    </div>
  );
};

export default LoginTemplate;
