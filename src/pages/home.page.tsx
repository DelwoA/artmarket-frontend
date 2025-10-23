import Hero from "@/components/Home/Hero";
import FeaturedArtists from "@/components/Home/FeaturedArtists";
import FeaturedArts from "@/components/Home/FeaturedArts";
import FeaturedBlogs from "@/components/Home/FeaturedBlogs";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedArtists />
      <FeaturedArts />
      <FeaturedBlogs />
    </>
  );
};

export default HomePage;
