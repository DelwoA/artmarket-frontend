import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";

import RootLayout from "./layouts/root.layout";
import MainLayout from "./layouts/main.layout";
import ProtectedLayout from "./layouts/protected.layout";

import HomePage from "./pages/home.page";
import ArtPage from "./pages/art.page";
import ArtistPage from "./pages/artist.page";
import BlogPage from "./pages/blog.page";
import BuyNowPage from "./pages/buy-now.page";
import AdminPage from "./pages/admin.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import MyProfilePage from "./pages/my-profile.page";
import CreateNewArtPage from "./pages/create-new-art";
import CreateNewBlogPage from "./pages/create-new-blog";

// Initialize Clerk
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// Check if PUBLISHABLE_KEY is defined
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/art" element={<ArtPage />} />
              <Route path="/artist" element={<ArtistPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/buy-now" element={<BuyNowPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/myprofile" element={<MyProfilePage />} />
                <Route
                  path="/myprofile/createnewart"
                  element={<CreateNewArtPage />}
                />
                <Route
                  path="/myprofile/createnewblog"
                  element={<CreateNewBlogPage />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
