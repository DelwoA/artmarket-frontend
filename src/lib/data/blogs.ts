export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  coverUrl?: string;
  publishedAt: string; // ISO date string
  views: number;
};

// 25 mock blog posts (covers unsplash IDs for variety)
export const BLOGS: readonly BlogPost[] = [
  {
    id: 1,
    title: "Capturing the Perfect Landscape: A Photographer's Guide",
    excerpt:
      "Learn the secrets to capturing stunning landscape photographs, from planning to post‑processing.",
    author: "David Chen",
    coverUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2023-02-11",
    views: 2874,
  },
  {
    id: 2,
    title: "The Psychology of Color in Art and Design",
    excerpt:
      "Explore the powerful ways colors influence our emotional responses to artwork.",
    author: "Elena Rodriguez",
    coverUrl:
      "https://images.unsplash.com/photo-1646044043838-9da415b79b79?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2023-01-14",
    views: 2731,
  },
  {
    id: 3,
    title: "The Evolution of Abstract Art in the Digital Age",
    excerpt:
      "How digital tools and platforms are transforming abstract art, creating new possibilities.",
    author: "Elena Rodriguez",
    coverUrl:
      "https://images.unsplash.com/photo-1541959833400-049d37f98ccd?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2022-08-21",
    views: 3452,
  },
  {
    id: 4,
    title: "Traditional Textiles in Contemporary Art",
    excerpt:
      "Discover how contemporary artists are incorporating traditional textile techniques in new ways.",
    author: "Aisha Patel",
    coverUrl:
      "https://images.unsplash.com/photo-1726207285900-7de8a4d8855e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    publishedAt: "2022-06-03",
    views: 1985,
  },
  {
    id: 5,
    title: "Collecting Art on a Budget: A Beginner's Guide",
    excerpt:
      "Practical advice for aspiring art collectors with limited budgets, focusing on value and discovery.",
    author: "Sophia Lee",
    coverUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2022-05-19",
    views: 3142,
  },
  {
    id: 6,
    title: "NFTs and Digital Art: Revolution or Bubble?",
    excerpt:
      "A deep dive into how NFTs are transforming the digital art landscape, and what comes next.",
    author: "James Wilson",
    coverUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2022-04-27",
    views: 5126,
  },
  {
    id: 7,
    title: "Cultural Appropriation vs. Appreciation in Art",
    excerpt:
      "A thoughtful exploration of the complex ethical questions surrounding cultural inspiration.",
    author: "Aisha Patel",
    coverUrl:
      "https://images.unsplash.com/photo-1650783756107-739513b38177?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2022-04-01",
    views: 4218,
  },
  {
    id: 8,
    title: "The Art of Creative Collaboration",
    excerpt:
      "How artistic collaboration fosters innovation, breaking down genre boundaries and methods.",
    author: "James Wilson",
    coverUrl:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2022-03-10",
    views: 1876,
  },
  {
    id: 9,
    title: "Finding Your Style: An Artist's Journey",
    excerpt:
      "Practical steps and mindsets to help artists develop a unique and authentic voice.",
    author: "Lucas Martin",
    coverUrl:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2022-02-20",
    views: 2231,
  },
  {
    id: 10,
    title: "Sculpting with Reclaimed Materials",
    excerpt:
      "Techniques and inspiration for building sustainable sculptures from found objects.",
    author: "Isabella Garcia",
    coverUrl:
      "https://images.unsplash.com/photo-1719694227134-0b38c6b1b330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2022-02-02",
    views: 1620,
  },
  {
    id: 11,
    title: "Photographing City Textures",
    excerpt:
      "Tips for capturing the subtle patterns and textures that make cityscapes compelling.",
    author: "Chen Wei",
    coverUrl:
      "https://images.unsplash.com/photo-1575649212536-13a4528f44d2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2086",
    publishedAt: "2022-01-15",
    views: 2056,
  },
  {
    id: 12,
    title: "Minimalism at Home: Curating with Purpose",
    excerpt:
      "How to curate your living space with artworks that embody clarity and intent.",
    author: "Maria Rossi",
    coverUrl:
      "https://images.unsplash.com/photo-1596793999621-cbbbc1cf0048?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2021-12-12",
    views: 1769,
  },
  {
    id: 13,
    title: "From Sketch to Canvas: Building a Workflow",
    excerpt:
      "A structured approach to taking ideas from quick sketches to finished paintings.",
    author: "Arjun Mehta",
    coverUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2021-11-18",
    views: 2314,
  },
  {
    id: 14,
    title: "Watercolor Techniques for Coastal Light",
    excerpt:
      "Exercises to capture shifting light and color using watercolor media.",
    author: "Sofia Almeida",
    coverUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
    publishedAt: "2021-10-02",
    views: 1422,
  },
  {
    id: 15,
    title: "The Ethics of Street Art",
    excerpt:
      "Considering permission, context, and legacy when painting in public spaces.",
    author: "Noah Brown",
    coverUrl:
      "https://images.unsplash.com/photo-1489421931051-521ec235bbca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2458",
    publishedAt: "2021-09-22",
    views: 1680,
  },
  {
    id: 16,
    title: "Ink and Tradition: A Modern Balance",
    excerpt:
      "Blending classical ink techniques with modern subject matter and composition.",
    author: "Zoe Nguyen",
    coverUrl:
      "https://images.unsplash.com/photo-1525260471287-a19a9c85bb15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2021-08-11",
    views: 1908,
  },
  {
    id: 17,
    title: "Weaving Stories: Textiles in Modern Design",
    excerpt:
      "The resurgence of textile craft and its role in contemporary visual culture.",
    author: "Fatima Noor",
    coverUrl:
      "https://images.unsplash.com/photo-1542044801-30d3e45ae49a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2021-07-02",
    views: 1398,
  },
  {
    id: 18,
    title: "Tropical Color Theory",
    excerpt:
      "Lessons in color drawn from tropical environments and everyday scenes.",
    author: "Rafael Silva",
    coverUrl:
      "https://images.unsplash.com/photo-1468413253725-0d5181091126?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2021-06-14",
    views: 2013,
  },
  {
    id: 19,
    title: "Portraits: Capturing Personality",
    excerpt:
      "Strategies for revealing a subject's personality through light and gesture.",
    author: "Michael Johnson",
    coverUrl:
      "https://images.unsplash.com/photo-1610290495827-173a06499a4e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
    publishedAt: "2021-05-01",
    views: 1766,
  },
  {
    id: 20,
    title: "City Abstraction: Frames within Frames",
    excerpt:
      "Using architectural elements to build layered, abstract images in the city.",
    author: "Chen Wei",
    coverUrl:
      "https://images.unsplash.com/photo-1635191361291-48c4c0cdea03?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    publishedAt: "2021-04-20",
    views: 2210,
  },
  {
    id: 21,
    title: "Island Botanicals: Painting from Life",
    excerpt:
      "Observational studies that translate tropical plants into expressive forms.",
    author: "Priya Shah",
    coverUrl:
      "https://images.unsplash.com/photo-1622818171279-fe0b6a336835?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2098",
    publishedAt: "2021-03-10",
    views: 1540,
  },
  {
    id: 22,
    title: "From Studio to Street: Presenting Your Work",
    excerpt:
      "A guide to preparing, presenting, and promoting artwork in public contexts.",
    author: "Anna Schmidt",
    coverUrl:
      "https://images.unsplash.com/photo-1758614078676-81fa028dd2f7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2533",
    publishedAt: "2021-02-20",
    views: 1701,
  },
  {
    id: 23,
    title: "Studio Productivity for Busy Creatives",
    excerpt:
      "Routines and systems to maintain momentum without sacrificing creativity.",
    author: "Isabella Garcia",
    coverUrl:
      "https://images.unsplash.com/photo-1758522275592-7e528b322f43?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532",
    publishedAt: "2021-01-28",
    views: 1294,
  },
  {
    id: 24,
    title: "Lighting for Small Studios",
    excerpt: "Practical lighting setups for compact spaces and budget gear.",
    author: "Michael Johnson",
    coverUrl:
      "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2532",
    publishedAt: "2020-12-05",
    views: 1150,
  },
  {
    id: 25,
    title: "Chasing Light: Coastal Photography",
    excerpt:
      "Field notes on photographing changing light across coastal landscapes.",
    author: "Emma Thompson",
    coverUrl:
      "https://images.unsplash.com/photo-1462400362591-9ca55235346a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2032",
    publishedAt: "2020-11-11",
    views: 1987,
  },
];
