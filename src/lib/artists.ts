// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { buildUrl } from "./http";

// Get all artists
export const getArtists = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/artists`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch artists");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};

// Get a single artist by ID
export const getArtistById = async (artistId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch artist");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
};

// Create a new artist
export const createArtist = async (artistData: unknown, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/artists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(artistData),
    });
    if (!res.ok) {
      throw new Error("Failed to create artist");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating artist:", error);
    throw error;
  }
};

// Update an existing artist
export const updateArtist = async (
  artistId: string,
  artistData: unknown,
  token?: string
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(artistData),
    });
    if (!res.ok) {
      throw new Error("Failed to update artist");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating artist:", error);
    throw error;
  }
};

// Delete an artist
export const deleteArtist = async (artistId: string, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete artist");
    }
    return true;
  } catch (error) {
    console.error("Error deleting artist:", error);
    throw error;
  }
};

// Get featured artists
export const getFeaturedArtists = async () => {
  try {
    const artists = await getArtists();
    return artists.filter((artist: any) => artist.featured === true);
  } catch (error) {
    console.error("Error fetching featured artists:", error);
    throw error;
  }
};

// Admin: list artists by status
export const getAdminArtists = async (
  status?: "pending" | "approved" | "rejected",
  token?: string
) => {
  const url = buildUrl("/api/artists/admin", { status });
  const res = await fetch(url, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to load admin artists");
  return res.json();
};

export const approveArtistAdmin = async (id: string, token: string) => {
  const res = await fetch(`${BACKEND_URL}/api/artists/admin/${id}/approve`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to approve artist");
  return res.json();
};

export const rejectArtistAdmin = async (
  id: string,
  reason: string | undefined,
  token: string
) => {
  const res = await fetch(`${BACKEND_URL}/api/artists/admin/${id}/reject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error("Failed to reject artist");
  return res.json();
};

// Artist application by user
export const applyToBecomeArtist = async (payload: unknown, token: string) => {
  const res = await fetch(`${BACKEND_URL}/api/artists/apply`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let message = "Failed to apply as artist";
    try {
      const err = await res.json();
      if (err && typeof err.message === "string") message = err.message;
    } catch {
      // ignore json parse error, fall back to default message
    }
    throw new Error(message);
  }
  return res.json();
};
