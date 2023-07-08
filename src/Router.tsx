import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../src/components/common/Header";
import Main from "./pages/Main";
import EnrollShop from "./pages/EnrollShop";
import EditEnrollShop from "./components/resgistration/EditEnrollShop";
import Login from "./pages/Login";
import SignUpType from "./components/SignUpPage/SignUpType";
import EmailConfirm from "./components/SignUpPage/EmailConfirm";
import SignUp from "./pages/SignUp";
import InfoInput from "./components/SignUpPage/InfoInput";
import FindId from "./pages/FindId";
import FindPw from "./pages/FindPw";
import VerificationPw from "./components/FindPwPage/Verification";
import MyPage from "./pages/MyPage";
import Info from "./components/myPage/Info";
import Review from "./components/myPage/Review";
import Withdraw from "./components/myPage/Withdraw";
import DetailShop from "./pages/DetailShop";
import SearchResult from "./components/mainPage/SearchResult";
import DefaultContents from "./components/mainPage/DefaultContents";
import ContentsEnroll from "./components/resgistration/ContentsEnroll";
import Like from "./components/myPage/Like";
import MyStore from "./components/myPage/MyStore";
import VerificationId from "./components/findIdPage/Verification";
import Check from "./components/findIdPage/Check";
import Stores from "./pages/Stores";
import EditContentsEnroll from "./components/resgistration/EditContentsEnroll";
import ApprovedList from "./pages/ApprovedList";
import WaitingList from "./pages/WaitingList";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="" element={<DefaultContents />} />
          <Route path="search" element={<SearchResult />} />
        </Route>
        <Route path="/waitingList" element={<WaitingList />} />
        <Route path="/approvedList" element={<ApprovedList />} />
        <Route path="/detailShop" element={<DetailShop />} />
        <Route path="/enrollshop" element={<EnrollShop />}>
          <Route path="contents" element={<ContentsEnroll />} />
        </Route>
        <Route path="/editenrollshop" element={<EditEnrollShop />}>
          <Route path="contents" element={<EditContentsEnroll />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/findid" element={<FindId />}>
          <Route path="verification" element={<VerificationId />} />
          <Route path="check" element={<Check />} />
        </Route>
        <Route path="/findPw" element={<FindPw />}>
          <Route path="verification" element={<VerificationPw />} />
        </Route>
        <Route path="/stores" element={<Stores />}></Route>
        <Route path="/signUp" element={<SignUp />}>
          <Route path="selectType" element={<SignUpType />} />
          <Route path="/signUp/:signUpType" element={<EmailConfirm />} />
          <Route path="/signUp/:signUpType/privacy" element={<InfoInput />} />
        </Route>
        <Route path="/mypage" element={<MyPage />}>
          <Route path="info" element={<Info />} />
          <Route path="mystore" element={<MyStore />} />
          <Route path="review" element={<Review />} />
          <Route path="like" element={<Like />} />
          <Route path="withdraw" element={<Withdraw />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
