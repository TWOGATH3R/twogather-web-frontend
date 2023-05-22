import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/common/Header";
import Main from "./pages/Main";
import EnrollShop from "./pages/EnrollShop";
import Login from "./pages/Login";
import SignUpType from "./components/SignUpPage/SignUpType";
import EmailConfirm from "./components/SignUpPage/EmailConfirm";
import SignUp from "./pages/SignUp";
import InfoInput from "./components/SignUpPage/InfoInput";
import StoreInfo from "./components/SignUpPage/StoreInfo";
import FindId from "./pages/FindId";
import FindPw from "./pages/FindPw";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/enrollshop" element={<EnrollShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findPw" element={<FindPw />} />
        <Route path="/signUp" element={<SignUp />}>
          <Route path="selectType" element={<SignUpType />} />
          <Route path="/signUp/:signUpType" element={<EmailConfirm />} />
          <Route path="/signUp/:signUpType/privacy" element={<InfoInput />} />
          <Route path="/signUp/:signUpType/storeInfo" element={<StoreInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
