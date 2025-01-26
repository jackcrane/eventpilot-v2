import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks";
import { Login } from "./routes/auth/login";
import { Header } from "../components/header/Header";
import { Page } from "../components/page/Page";
import { Register } from "./routes/auth/register";
import { Verify } from "./routes/auth/verify";
import { UserProfile } from "./routes/auth/me";
import { ForgotPassword } from "./routes/auth/forgot-password";
import { useFavicon } from "react-use";
import favicon from "../assets/ico.png";
import { Index } from "./routes";
import { NewOrganization } from "./routes/organization/new";

export default () => {
  const { loggedIn, loading, login, user } = useAuth();
  useFavicon(favicon);

  if (loading) return null;

  if (user && user.suspended) {
    return (
      <div>
        {/* <Header /> */}
        <div style={{ padding: "20px" }}>
          <h1>Your account has been suspended</h1>
          <p>Please contact support@eventpilot.com for assistance.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Index />} />
              <Route path="/me" element={<UserProfile />} />
              <Route path="/organization/new" element={<NewOrganization />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </>
          )}
          <Route path="/verify" element={<Verify />} />
          {/* 404 error */}
          <Route
            path="*"
            element={
              <Page>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "70vh",
                  }}
                >
                  <h1>Error 404</h1>
                  <p>Page not found</p>
                </div>
              </Page>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};
