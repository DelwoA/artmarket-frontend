import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";

import RootLayout from "./layouts/root.layout";
import MainLayout from "./layouts/main.layout";

import HomePage from "./pages/home.page";
import ArtPage from "./pages/art.page";
import ArtistPage from "./pages/artist";
import BlogPage from "./pages/blog.page";

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
              <Route path="art" element={<ArtPage />} />
              <Route path="artist" element={<ArtistPage />} />
              <Route path="blog" element={<BlogPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
