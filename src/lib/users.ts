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

export type UserProfile = {
  displayName: string;
  bio: string;
  country: string; // canonical name (e.g., "Spain")
  city: string;
  website: string;
  instagram: string;
  facebook: string;
  avatarUrl?: string;
};

export const getMyProfile = async (
  token: string
): Promise<Partial<UserProfile>> => {
  const res = await fetch(`${BACKEND_URL}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to load profile");
  return res.json();
};

export const updateMyProfile = async (
  payload: UserProfile,
  token: string
): Promise<UserProfile> => {
  const res = await fetch(`${BACKEND_URL}/api/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "Failed to save profile";
    try {
      const err = await res.json();
      if (err && typeof err.message === "string") message = err.message;
    } catch {}
    throw new Error(message);
  }
  return res.json();
};
