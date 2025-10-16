import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";

import RootLayout from "./layouts/root.layout";
import MainLayout from "./layouts/main.layout";

import HomePage from "./pages/home.page";
import ArtPage from "./pages/art.page";
import ArtistPage from "./pages/artist";
import BlogPage from "./pages/blog.page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
  </StrictMode>
);
