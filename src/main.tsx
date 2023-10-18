import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Home from './Home/Home.tsx'
import { ClerkProvider, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Form from './form/Form.tsx'
import Myblogs from './myblogs/Myblogs.tsx';
import { Toaster } from "react-hot-toast";
import Blog from './blog/Blog.tsx'
import Updateblogpage from './updateblog/Updateblog.tsx'
import Category from './category/Category.tsx'

if (!import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

export const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in"
          element={
            <div className='flex h-[100vh] w-full justify-center items-center'>
              <SignIn redirectUrl={'/home'} routing="path" path="/sign-in" />
            </div>
        }
        />
        <Route
          path="/sign-up"
          element={
            <div className='flex h-[100vh] w-full justify-center items-center'>
              <SignUp redirectUrl={'/home'} routing="path" path="/sign-up" />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <>
            <SignedIn>
              <Home />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
        <Route
          path="/form"
          element={
            <>
            <SignedIn>
              <Form />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
        <Route
          path="/blogs/:username"
          element={
            <>
            <SignedIn>
              <Myblogs />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <>
            <SignedIn>
              <Blog />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
        <Route
          path="/blog/update/:id"
          element={
            <>
            <SignedIn>
              <Updateblogpage />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
        <Route
          path="/category/:category"
          element={
            <>
            <SignedIn>
              <Category />
            </SignedIn>
            <SignedOut>
              <div className='flex h-[100vh] w-full justify-center items-center'>
                <App />
              </div>
            </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>,
)
