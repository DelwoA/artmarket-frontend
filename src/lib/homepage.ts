// Backend server URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type HomeConfig = {
  featuredArtistIds: string[];
  featuredArtIds: string[];
  featuredBlogIds: string[];
};

export const getHomepageConfig = async (): Promise<HomeConfig> => {
  const res = await fetch(`${BACKEND_URL}/api/homepage`);
  if (!res.ok) throw new Error("Failed to load homepage config");
  return res.json();
};

export const saveHomepageConfig = async (
  payload: HomeConfig
): Promise<HomeConfig> => {
  const res = await fetch(`${BACKEND_URL}/api/homepage`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to save homepage config");
  return res.json();
};
