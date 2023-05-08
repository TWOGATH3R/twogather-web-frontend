import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/common/Header";
import Main from "./pages/Main";
import EnrollShop from "./pages/EnrollShop";
import Login from "./pages/Login";
import RegisterType from "./components/RegisterPage/RegisterType";
import EmailConfirm from "./components/RegisterPage/EmailConfirm";
import Register from "./pages/Register";
import InfoInput from "./components/RegisterPage/InfoInput";
import StoreInfo from "./components/RegisterPage/StoreInfo";
import FindId from "./pages/FindId";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/enrollshop" element={<EnrollShop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/register" element={<Register />}>
          <Route path="selectType" element={<RegisterType />} />
          <Route path="/register/:RegisterType" element={<EmailConfirm />} />
          <Route path="/register/:RegisterType/privacy" element={<InfoInput />} />
          <Route path="/register/:RegisterType/storeInfo" element={<StoreInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
