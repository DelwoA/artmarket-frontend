const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type HomeConfig = {
  featuredArtistIds: string[];
  featuredArtIds: string[];
  featuredBlogIds: string[];
  updatedAt?: string;
};

export const getHomepageConfig = async (): Promise<HomeConfig> => {
  const res = await fetch(`${BACKEND_URL}/api/homepage`, { method: "GET" });
  if (!res.ok) throw new Error("Failed to fetch homepage config");
  return (await res.json()) as HomeConfig;
};

export const saveHomepageConfig = async (
  payload: HomeConfig,
  token?: string
): Promise<HomeConfig> => {
  const res = await fetch(`${BACKEND_URL}/api/homepage`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save homepage config");
  return (await res.json()) as HomeConfig;
};
