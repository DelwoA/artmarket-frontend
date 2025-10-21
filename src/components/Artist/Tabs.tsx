import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArtworkCard from "./ArtworkCard";
import BlogCardMini from "./BlogCardMini";

type Artwork = {
  title: string;
  artistName: string;
  price: number;
  likes: number;
  views: number;
  imageUrl?: string;
  availability: "For Sale" | "Not for Sale" | "Sold";
};

type BlogPost = {
  title: string;
  subtitle: string;
  author: string;
  coverUrl?: string;
  views: number;
};

type Props = {
  artworksCount: number;
  blogPostsCount: number;
  artworks: Artwork[];
  blogPosts: BlogPost[];
};

const ArtistTabs = ({
  artworksCount,
  blogPostsCount,
  artworks,
  blogPosts,
}: Props) => {
  return (
    <Tabs defaultValue="artworks" className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="artworks">Artworks ({artworksCount})</TabsTrigger>
        <TabsTrigger value="blogs">Blog Posts ({blogPostsCount})</TabsTrigger>
      </TabsList>
      <TabsContent value="artworks">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.map((a, i) => (
            <ArtworkCard key={i} item={a} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="blogs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.map((b, i) => (
            <BlogCardMini key={i} post={b} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ArtistTabs;
