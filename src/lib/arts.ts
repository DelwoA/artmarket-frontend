// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get all arts
export const getArts = async (opts?: { category?: string }) => {
  try {
    const url = new URL(`${BACKEND_URL}/api/arts`);
    if (opts?.category && opts.category !== "all") {
      url.searchParams.set("category", opts.category);
    }
    const res = await fetch(url.toString(), {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch arts");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching arts:", error);
    throw error;
  }
};

// Get a single art by ID
export const getArtById = async (artId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch art");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching art:", error);
    throw error;
  }
};

// Create a new art
export const createArt = async (artData: unknown, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(artData),
    });
    if (!res.ok) {
      throw new Error("Failed to create art");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating art:", error);
    throw error;
  }
};

// Update an existing art
export const updateArt = async (
  artId: string,
  artData: unknown,
  token?: string
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(artData),
    });
    if (!res.ok) {
      throw new Error("Failed to update art");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating art:", error);
    throw error;
  }
};

// Delete an art
export const deleteArt = async (artId: string, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete art");
    }
    return true;
  } catch (error) {
    console.error("Error deleting art:", error);
    throw error;
  }
};

// Get featured arts
export const getFeaturedArts = async () => {
  try {
    const arts = await getArts();
    return arts.filter((art: any) => art.featured === true);
  } catch (error) {
    console.error("Error fetching featured arts:", error);
    throw error;
  }
};

// Toggle like for an art (requires auth token)
export const toggleArtLike = async (artId: string, token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to toggle like");
    }
    const data = (await res.json()) as { likes: number; liked: boolean };
    return data;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};

// Increment art view (public)
export const incrementArtView = async (artId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}/view`, {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error("Failed to increment view");
    }
    const data = (await res.json()) as { views: number };
    return data;
  } catch (error) {
    console.error("Error incrementing view:", error);
    throw error;
  }
};

// Admin: list and moderation
export const getAdminArts = async (visible?: boolean, token?: string) => {
  const url = new URL(`${BACKEND_URL}/api/arts/admin`);
  if (typeof visible === "boolean")
    url.searchParams.set("visible", String(visible));
  const res = await fetch(url.toString(), {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to load admin arts");
  return res.json();
};

export const banArtAdmin = async (id: string, token: string) => {
  const res = await fetch(`${BACKEND_URL}/api/arts/admin/${id}/ban`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to ban art");
  return res.json();
};

export const unbanArtAdmin = async (id: string, token: string) => {
  const res = await fetch(`${BACKEND_URL}/api/arts/admin/${id}/unban`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to unban art");
  return res.json();
};
