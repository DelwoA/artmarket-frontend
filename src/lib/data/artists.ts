export type Artist = {
  id: number;
  name: string;
  location: string;
  likes: number;
  views: number;
  avatarUrl: string;
  bio?: string;
  profileUrl: string;
  artworksUrl: string;
};

export const ARTISTS: readonly Artist[] = [
  {
    id: 1,
    name: "Aisha Patel",
    location: "Mumbai, India",
    likes: 631,
    views: 7383,
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop",
    bio: "Textile artist creating vibrant patterns inspired by cultural heritage",
    profileUrl: "/artists/aisha-patel",
    artworksUrl: "/artists/aisha-patel/artworks",
  },
  {
    id: 2,
    name: "David Chen",
    location: "Vancouver, Canada",
    likes: 575,
    views: 6847,
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
    bio: "Nature photographer capturing landscapes across North America",
    profileUrl: "/artists/david-chen",
    artworksUrl: "/artists/david-chen/artworks",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    likes: 790,
    views: 10031,
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
    bio: "Contemporary abstract painter exploring emotion through color",
    profileUrl: "/artists/elena-rodriguez",
    artworksUrl: "/artists/elena-rodriguez/artworks",
  },
  {
    id: 4,
    name: "James Wilson",
    location: "London, UK",
    likes: 792,
    views: 9755,
    avatarUrl:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=256&auto=format&fit=crop",
    bio: "Urban artist blending traditional techniques with digital elements",
    profileUrl: "/artists/james-wilson",
    artworksUrl: "/artists/james-wilson/artworks",
  },
  {
    id: 5,
    name: "Michael Johnson",
    location: "New York, USA",
    likes: 0,
    views: 0,
    avatarUrl:
      "https://images.unsplash.com/photo-1583195763986-0231686dcd43?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2076",
    bio: "Portrait photographer capturing urban stories",
    profileUrl: "/artists/michael-johnson",
    artworksUrl: "/artists/michael-johnson/artworks",
  },
  {
    id: 6,
    name: "Sophia Lee",
    location: "Seoul, South Korea",
    likes: 0,
    views: 0,
    avatarUrl:
      "https://images.unsplash.com/photo-1475823678248-624fc6f85785?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Mixed‑media artist exploring minimal forms",
    profileUrl: "/artists/sophia-lee",
    artworksUrl: "/artists/sophia-lee/artworks",
  },
  {
    id: 7,
    name: "Lucas Martin",
    location: "Paris, France",
    likes: 455,
    views: 5401,
    avatarUrl:
      "https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    bio: "Oil painter focused on light and atmosphere",
    profileUrl: "/artists/lucas-martin",
    artworksUrl: "/artists/lucas-martin/artworks",
  },
  {
    id: 8,
    name: "Maria Rossi",
    location: "Rome, Italy",
    likes: 388,
    views: 4899,
    avatarUrl:
      "https://images.unsplash.com/photo-1740436119728-c67320872deb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532",
    bio: "Ceramic artist crafting modern vessels",
    profileUrl: "/artists/maria-rossi",
    artworksUrl: "/artists/maria-rossi/artworks",
  },
  {
    id: 9,
    name: "Hana Kim",
    location: "Busan, South Korea",
    likes: 264,
    views: 3411,
    avatarUrl:
      "https://images.unsplash.com/photo-1631284443960-8de62bb38bdc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Illustrator blending folklore and modernity",
    profileUrl: "/artists/hana-kim",
    artworksUrl: "/artists/hana-kim/artworks",
  },
  {
    id: 10,
    name: "Omar Saleh",
    location: "Cairo, Egypt",
    likes: 312,
    views: 4210,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
    bio: "Calligraphy artist exploring Arabic scripts",
    profileUrl: "/artists/omar-saleh",
    artworksUrl: "/artists/omar-saleh/artworks",
  },
  {
    id: 11,
    name: "Emma Thompson",
    location: "Sydney, Australia",
    likes: 501,
    views: 6120,
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Landscape photographer inspired by coastlines",
    profileUrl: "/artists/emma-thompson",
    artworksUrl: "/artists/emma-thompson/artworks",
  },
  {
    id: 12,
    name: "Noah Brown",
    location: "Toronto, Canada",
    likes: 289,
    views: 3302,
    avatarUrl:
      "https://images.unsplash.com/photo-1631603630984-81019825df8a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Street artist mixing collage and spray paint",
    profileUrl: "/artists/noah-brown",
    artworksUrl: "/artists/noah-brown/artworks",
  },
  {
    id: 13,
    name: "Arjun Mehta",
    location: "Delhi, India",
    likes: 678,
    views: 8345,
    avatarUrl:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&auto=format&fit=crop",
    bio: "Painter exploring bold geometric forms",
    profileUrl: "/artists/arjun-mehta",
    artworksUrl: "/artists/arjun-mehta/artworks",
  },
  {
    id: 14,
    name: "Isabella Garcia",
    location: "Barcelona, Spain",
    likes: 345,
    views: 4780,
    avatarUrl:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?q=80&w=256&auto=format&fit=crop",
    bio: "Sculptor working with reclaimed materials",
    profileUrl: "/artists/isabella-garcia",
    artworksUrl: "/artists/isabella-garcia/artworks",
  },
  {
    id: 15,
    name: "Chen Wei",
    location: "Shanghai, China",
    likes: 412,
    views: 5201,
    avatarUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=256&auto=format&fit=crop",
    bio: "Photographer capturing urban abstraction",
    profileUrl: "/artists/chen-wei",
    artworksUrl: "/artists/chen-wei/artworks",
  },
  {
    id: 16,
    name: "Anna Schmidt",
    location: "Berlin, Germany",
    likes: 233,
    views: 2981,
    avatarUrl:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?q=80&w=256&auto=format&fit=crop",
    bio: "Printmaker inspired by Bauhaus shapes",
    profileUrl: "/artists/anna-schmidt",
    artworksUrl: "/artists/anna-schmidt/artworks",
  },
  {
    id: 17,
    name: "Fatima Noor",
    location: "Karachi, Pakistan",
    likes: 158,
    views: 2003,
    avatarUrl:
      "https://images.unsplash.com/photo-1665414779210-ac1667a81418?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532",
    bio: "Textile designer weaving cultural motifs",
    profileUrl: "/artists/fatima-noor",
    artworksUrl: "/artists/fatima-noor/artworks",
  },
  {
    id: 18,
    name: "Rafael Silva",
    location: "Rio de Janeiro, Brazil",
    likes: 377,
    views: 4122,
    avatarUrl:
      "https://images.unsplash.com/photo-1536548665027-b96d34a005ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Colorist painter inspired by tropical rhythms",
    profileUrl: "/artists/rafael-silva",
    artworksUrl: "/artists/rafael-silva/artworks",
  },
  {
    id: 19,
    name: "Zoe Nguyen",
    location: "Hanoi, Vietnam",
    likes: 141,
    views: 1754,
    avatarUrl:
      "https://images.unsplash.com/photo-1587115203801-cbf58ecd3cf3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071",
    bio: "Ink painter balancing tradition and modern life",
    profileUrl: "/artists/zoe-nguyen",
    artworksUrl: "/artists/zoe-nguyen/artworks",
  },
  {
    id: 20,
    name: "Liam O'Connor",
    location: "Dublin, Ireland",
    likes: 264,
    views: 3210,
    avatarUrl:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=256&auto=format&fit=crop",
    bio: "Photographer documenting city textures",
    profileUrl: "/artists/liam-oconnor",
    artworksUrl: "/artists/liam-oconnor/artworks",
  },
  {
    id: 21,
    name: "Sofia Almeida",
    location: "Lisbon, Portugal",
    likes: 299,
    views: 3442,
    avatarUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=256&auto=format&fit=crop",
    bio: "Watercolorist painting coastal light",
    profileUrl: "/artists/sofia-almeida",
    artworksUrl: "/artists/sofia-almeida/artworks",
  },
  {
    id: 22,
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    likes: 521,
    views: 7004,
    avatarUrl:
      "https://images.unsplash.com/photo-1696084086051-bbbf8acc9d2c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Contemporary sculptor exploring shadow and form",
    profileUrl: "/artists/yuki-tanaka",
    artworksUrl: "/artists/yuki-tanaka/artworks",
  },
  {
    id: 23,
    name: "Priya Shah",
    location: "Colombo, Sri Lanka",
    likes: 184,
    views: 2205,
    avatarUrl:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=256&auto=format&fit=crop",
    bio: "Painter inspired by island flora and textiles",
    profileUrl: "/artists/priya-shah",
    artworksUrl: "/artists/priya-shah/artworks",
  },
  {
    id: 24,
    name: "Peter Novak",
    location: "Prague, Czech Republic",
    likes: 203,
    views: 2617,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop",
    bio: "Illustrator of whimsical urban scenes",
    profileUrl: "/artists/peter-novak",
    artworksUrl: "/artists/peter-novak/artworks",
  },
  {
    id: 25,
    name: "Amara Diallo",
    location: "Dakar, Senegal",
    likes: 342,
    views: 4098,
    avatarUrl:
      "https://images.unsplash.com/photo-1596960198491-fc2ed81c55ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    bio: "Textile and pattern artist celebrating West African craft",
    profileUrl: "/artists/amara-diallo",
    artworksUrl: "/artists/amara-diallo/artworks",
  },
] as const;
