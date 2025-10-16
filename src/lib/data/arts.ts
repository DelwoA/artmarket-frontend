export type ArtItem = {
  id: number;
  title: string;
  artistName: string;
  priceUsd: number;
  likes: number;
  views: number;
  imageUrl: string;
  artworkUrl: string;
  artistUrl: string;
};

export const ARTS: readonly ArtItem[] = [
  {
    id: 1,
    title: "Serenity in Blue",
    artistName: "Elena Rodriguez",
    priceUsd: 1200,
    likes: 143,
    views: 1892,
    imageUrl:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/serenity-in-blue",
    artistUrl: "/artists/elena-rodriguez",
  },
  {
    id: 2,
    title: "Mountain Sunrise",
    artistName: "David Chen",
    priceUsd: 850,
    likes: 98,
    views: 1245,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/mountain-sunrise",
    artistUrl: "/artists/david-chen",
  },
  {
    id: 3,
    title: "Urban Jungle",
    artistName: "James Wilson",
    priceUsd: 1500,
    likes: 215,
    views: 2780,
    imageUrl:
      "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    artworkUrl: "/art/urban-jungle",
    artistUrl: "/artists/james-wilson",
  },
  {
    id: 4,
    title: "Vibrant Patterns",
    artistName: "Aisha Patel",
    priceUsd: 950,
    likes: 167,
    views: 1932,
    imageUrl:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/vibrant-patterns",
    artistUrl: "/artists/aisha-patel",
  },
  {
    id: 5,
    title: "Abstract Emotions",
    artistName: "Elena Rodriguez",
    priceUsd: 1800,
    likes: 189,
    views: 2341,
    imageUrl:
      "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/abstract-emotions",
    artistUrl: "/artists/elena-rodriguez",
  },
  {
    id: 6,
    title: "Coastal Dreams",
    artistName: "David Chen",
    priceUsd: 1100,
    likes: 132,
    views: 1567,
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/coastal-dreams",
    artistUrl: "/artists/david-chen",
  },
  {
    id: 7,
    title: "City Lights",
    artistName: "James Wilson",
    priceUsd: 1350,
    likes: 176,
    views: 2089,
    imageUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/city-lights",
    artistUrl: "/artists/james-wilson",
  },
  {
    id: 8,
    title: "Heritage Threads",
    artistName: "Aisha Patel",
    priceUsd: 780,
    likes: 121,
    views: 1432,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/heritage-threads",
    artistUrl: "/artists/aisha-patel",
  },
  {
    id: 9,
    title: "Golden Fields",
    artistName: "Sofia Almeida",
    priceUsd: 990,
    likes: 88,
    views: 1233,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/golden-fields",
    artistUrl: "/artists/sofia-almeida",
  },
  {
    id: 10,
    title: "Harbor Mist",
    artistName: "Liam O'Connor",
    priceUsd: 880,
    likes: 76,
    views: 1120,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/harbor-mist",
    artistUrl: "/artists/liam-oconnor",
  },
  {
    id: 11,
    title: "Night Boulevard",
    artistName: "Chen Wei",
    priceUsd: 1400,
    likes: 210,
    views: 2766,
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/night-boulevard",
    artistUrl: "/artists/chen-wei",
  },
  {
    id: 12,
    title: "Forest Path",
    artistName: "Maria Rossi",
    priceUsd: 960,
    likes: 134,
    views: 1875,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/forest-path",
    artistUrl: "/artists/maria-rossi",
  },
  {
    id: 13,
    title: "City Geometry",
    artistName: "Emma Thompson",
    priceUsd: 1250,
    likes: 199,
    views: 2504,
    imageUrl:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/city-geometry",
    artistUrl: "/artists/emma-thompson",
  },
  {
    id: 14,
    title: "Sunlit Alley",
    artistName: "Lucas Martin",
    priceUsd: 1020,
    likes: 121,
    views: 1677,
    imageUrl:
      "https://images.unsplash.com/photo-1506459225024-1428097a7e18?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/sunlit-alley",
    artistUrl: "/artists/lucas-martin",
  },
  {
    id: 15,
    title: "Quiet Library",
    artistName: "Peter Novak",
    priceUsd: 870,
    likes: 72,
    views: 1088,
    imageUrl:
      "https://images.unsplash.com/photo-1496302662116-35cc4f36df92?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/quiet-library",
    artistUrl: "/artists/peter-novak",
  },
  {
    id: 16,
    title: "Coral Reef",
    artistName: "Zoe Nguyen",
    priceUsd: 980,
    likes: 115,
    views: 1722,
    imageUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/coral-reef",
    artistUrl: "/artists/zoe-nguyen",
  },
  {
    id: 17,
    title: "Citrus Still Life",
    artistName: "Priya Shah",
    priceUsd: 760,
    likes: 64,
    views: 1012,
    imageUrl:
      "https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/citrus-still-life",
    artistUrl: "/artists/priya-shah",
  },
  {
    id: 18,
    title: "Rainy Window",
    artistName: "Anna Schmidt",
    priceUsd: 890,
    likes: 86,
    views: 1299,
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/rainy-window",
    artistUrl: "/artists/anna-schmidt",
  },
  {
    id: 19,
    title: "Desert Dunes",
    artistName: "Omar Saleh",
    priceUsd: 1320,
    likes: 148,
    views: 2104,
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/desert-dunes",
    artistUrl: "/artists/omar-saleh",
  },
  {
    id: 20,
    title: "Seaside Rocks",
    artistName: "Sofia Almeida",
    priceUsd: 920,
    likes: 97,
    views: 1380,
    imageUrl:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/seaside-rocks",
    artistUrl: "/artists/sofia-almeida",
  },
  {
    id: 21,
    title: "Market Colors",
    artistName: "Amara Diallo",
    priceUsd: 840,
    likes: 81,
    views: 1205,
    imageUrl:
      "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/market-colors",
    artistUrl: "/artists/amara-diallo",
  },
  {
    id: 22,
    title: "Neon Night",
    artistName: "Chen Wei",
    priceUsd: 1450,
    likes: 230,
    views: 2891,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/neon-night",
    artistUrl: "/artists/chen-wei",
  },
  {
    id: 23,
    title: "Old Port",
    artistName: "Liam O'Connor",
    priceUsd: 930,
    likes: 99,
    views: 1403,
    imageUrl:
      "https://images.unsplash.com/photo-1451188502541-13943edb6acb?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/old-port",
    artistUrl: "/artists/liam-oconnor",
  },
  {
    id: 24,
    title: "Lavender Fields",
    artistName: "Sofia Almeida",
    priceUsd: 1010,
    likes: 118,
    views: 1644,
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/lavender-fields",
    artistUrl: "/artists/sofia-almeida",
  },
  {
    id: 25,
    title: "City Rain",
    artistName: "Noah Brown",
    priceUsd: 970,
    likes: 125,
    views: 1711,
    imageUrl:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600&auto=format&fit=crop",
    artworkUrl: "/art/city-rain",
    artistUrl: "/artists/noah-brown",
  },
] as const;
