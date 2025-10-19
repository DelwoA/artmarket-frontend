import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Link } from "react-router";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

const Navigation = () => {
  // Authentication state from Clerk
  const { user, isLoaded } = useUser();

  // Mobile menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle mobile menu with propagation stopped to prevent document handler conflicts
  const handleMenuClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside of it
  useEffect(() => {
    const closeMenu = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Only attach listener when menu is open to improve performance
    if (isMenuOpen) {
      document.addEventListener("click", closeMenu);
    }

    // Clean up event listener on unmount or when dependencies change
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* ===== Left side: Brand and admin links ===== */}

          <div className="flex items-center h-9">
            {/* Brand logo/name with link to homepage */}
            <Link to="/" className="font-bold text-2xl">
              ArtMarket
            </Link>
            <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
              <Link to="/">Home</Link>
            </div>
            <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
              <Link to="/artist">Artists</Link>
            </div>
            <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
              <Link to="/art">Arts</Link>
            </div>
            <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
              <Link to="/blog">Blogs</Link>
            </div>
            <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
              <Link to="/buy-now">Buy Now</Link>
            </div>

            {/* Artist-only navigation - visible only on tablet and larger screens */}
            {isLoaded && user?.publicMetadata?.role === "artist" && (
              <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
                <Link to={"/myprofile/createnewart"}>Create New Art</Link>
              </div>
            )}

            {/* Artist-only navigation - visible only on tablet and larger screens */}
            {isLoaded && user?.publicMetadata?.role === "artist" && (
              <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
                <Link to={"/myprofile/createnewblog"}>Create New Blog</Link>
              </div>
            )}

            {/* Admin-only navigation - visible only on tablet and larger screens */}
            {isLoaded && user?.publicMetadata?.role === "admin" && (
              <div className="hidden sm:block ml-8 font-medium hover:text-slate-500 transition-colors">
                <Link to={"/admin"}>Admin</Link>
              </div>
            )}
          </div>

          {/* ===== Right side: Actions and user controls ===== */}

          <div className="flex items-center space-x-2 sm:space-x-4 h-9">
            {/* Authentication buttons for signed-out users */}
            {isLoaded && (
              <SignedOut>
                <Button
                  variant="ghost"
                  className="font-semibold text-xs sm:text-sm h-9"
                  asChild
                >
                  <Link to={"/signin"}>Log In</Link>
                </Button>
                <Button
                  className="font-semibold text-xs sm:text-sm h-9"
                  asChild
                >
                  <Link to={"/signup"}>Sign Up</Link>
                </Button>
              </SignedOut>
            )}

            {/* User profile and profile access for signed-in users */}
            {isLoaded && (
              <SignedIn>
                <UserButton />
                <Button
                  className="font-semibold text-xs sm:text-sm h-9"
                  asChild
                >
                  <Link to={"/myprofile"}>My Profile</Link>
                </Button>
              </SignedIn>
            )}

            {/* Mobile menu with dropdown - visible only on small screens */}

            <div className="sm:hidden relative">
              {/* Mobile menu toggle button with animation */}

              <div
                className={`flex items-center justify-center h-7 w-7 rounded-full transition-colors duration-200 ${
                  isMenuOpen ? "bg-slate-50" : "hover:bg-slate-50/50"
                }`}
                onClick={handleMenuClick}
              >
                <EllipsisVertical className="h-4 w-4 text-slate-800 cursor-pointer" />
              </div>

              {/* Dropdown menu with smooth animation */}
              <div
                className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200
              transition-all duration-200 ease-in-out transform origin-top-right
              ${
                isMenuOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it
              >
                {/* Navigation menu items */}
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/artist"
                  className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Artists
                </Link>
                <Link
                  to="/art"
                  className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Arts
                </Link>
                <Link
                  to="/blog"
                  className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blogs
                </Link>
                {isLoaded && user?.publicMetadata?.role === "artist" && (
                  <Link
                    to="/createnewart"
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create New Art
                  </Link>
                )}
                {isLoaded && user?.publicMetadata?.role === "artist" && (
                  <Link
                    to="/createnewblog"
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Create New Blog
                  </Link>
                )}
                {isLoaded && user?.publicMetadata?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block px-4 py-2 text-sm text-slate-800 hover:bg-slate-50 transition-colors duration-150"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
