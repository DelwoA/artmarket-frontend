import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Hero = () => {
  return (
    <main className="relative mt-16 w-full bg-background flex items-center">
      <div className="container mx-auto px-4 md:px-8 h-full">
        <div className="flex h-full items-center gap-8 md:gap-12 flex-col md:flex-row">
          {/* LEFT: TEXT */}
          <div className="flex-1 w-full max-w-[720px]">
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="space-y-2">
                <Badge variant="secondary" className="mb-4">
                  New
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                  Discover Original Art. Support Living Artists.
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-prose mt-4">
                  Explore handpicked works for sale and stunning showcases
                  across styles—curated, authentic, and ready to inspire.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="lg" className="rounded-md">
                  <Link to="/art">Explore Art</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-md"
                >
                  <Link to="/artists">Meet Artists</Link>
                </Button>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link
                  to="/blogs"
                  className="hover:underline hover:text-foreground transition-colors"
                >
                  Read our blog
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 mt-3">
                <Badge variant="outline" className="bg-muted/50">
                  2.1k+ artworks
                </Badge>
                <Badge variant="outline" className="bg-muted/50">
                  500+ artists
                </Badge>
              </div>
            </div>
          </div>
          {/* RIGHT: IMAGE */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 h-[40vh] md:h-[60vh] lg:h-full">
              <img src="https://images.unsplash.com/photo-1578321270951-88bd84d09a64?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2007$0" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-background/10 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
