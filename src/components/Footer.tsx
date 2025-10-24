import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white">
      <div className="container mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          <div>
            <h3 className="text-base font-semibold">ArtMarket</h3>
            <p className="mt-2 text-sm text-white/70 max-w-xs">
              Connecting artists and art lovers since 2024
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold">Explore</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li>
                <Link to="/art" className="hover:underline hover:text-white">
                  Browse Art
                </Link>
              </li>
              <li>
                <Link to="/artist" className="hover:underline hover:text-white">
                  Find Artists
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:underline hover:text-white">
                  Read Blogs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Join</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/sign-up"
                  className="hover:underline hover:text-white"
                >
                  Sign up as User
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up?role=artist"
                  className="hover:underline hover:text-white"
                >
                  Sign up as Artist
                </Link>
              </li>
              <li>
                <Link to="/signin" className="hover:underline hover:text-white">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold">Legal</h3>
            <ul className="mt-2 space-y-2 text-sm text-white/70">
              <li>
                <Link
                  to="/privacy"
                  className="hover:underline hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:underline hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookies"
                  className="hover:underline hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs md:text-sm text-white/60">
            © 2025 ArtMarket. All rights reserved.
          </p>
          <nav className="flex items-center gap-6 text-sm text-white/70">
            <Link to="#" className="hover:text-white">
              Instagram
            </Link>
            <Link to="#" className="hover:text-white">
              Twitter
            </Link>
            <Link to="#" className="hover:text-white">
              Facebook
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
