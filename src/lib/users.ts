const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type PublicUser = {
  id: string;
  fullName: string | null;
  imageUrl: string | null;
};

export const getUsersPublic = async (ids: string[]): Promise<PublicUser[]> => {
  if (!ids.length) return [];
  const params = new URLSearchParams({ ids: ids.join(",") });
  const res = await fetch(
    `${BACKEND_URL}/api/users/public?${params.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch users public info");
  return res.json();
};
