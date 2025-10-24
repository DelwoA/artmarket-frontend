const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type AdminOverviewCounts = {
  pendingArtists: number;
  pendingBlogs: number;
  bannedArtworks: number;
  totalArtists: number;
  totalArtworks: number;
};

export const getAdminOverviewCounts = async (
  token?: string
): Promise<AdminOverviewCounts> => {
  const res = await fetch(`${BACKEND_URL}/api/admin/overview`, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to load admin overview counts");
  return (await res.json()) as AdminOverviewCounts;
};
