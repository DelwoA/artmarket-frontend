// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Get all blogs
export const getBlogs = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

// Get a single blog by ID
export const getBlogById = async (blogId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blog");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

// Create a new blog
export const createBlog = async (blogData: unknown, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(blogData),
    });
    if (!res.ok) {
      throw new Error("Failed to create blog");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Update an existing blog
export const updateBlog = async (
  blogId: string,
  blogData: unknown,
  token?: string
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(blogData),
    });
    if (!res.ok) {
      throw new Error("Failed to update blog");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Delete a blog
export const deleteBlog = async (blogId: string, token?: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/blogs/${blogId}`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    if (!res.ok) {
      throw new Error("Failed to delete blog");
    }
    return true;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Get featured blogs
export const getFeaturedBlogs = async () => {
  try {
    const blogs = await getBlogs();
    return blogs.filter((blog: any) => blog.featured === true);
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    throw error;
  }
};

// Admin: list blogs by status
export const getAdminBlogs = async (
  status?: "pending" | "approved" | "rejected",
  token?: string
) => {
  const url = new URL(`${BACKEND_URL}/api/blogs/admin`);
  if (status) url.searchParams.set("status", status);
  const res = await fetch(url.toString(), {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) throw new Error("Failed to load admin blogs");
  return res.json();
};

export const approveBlogAdmin = async (id: string, token: string) => {
  const res = await fetch(`${BACKEND_URL}/api/blogs/admin/${id}/approve`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to approve blog");
  return res.json();
};

export const rejectBlogAdmin = async (
  id: string,
  reason: string | undefined,
  token: string
) => {
  const res = await fetch(`${BACKEND_URL}/api/blogs/admin/${id}/reject`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ reason }),
  });
  if (!res.ok) throw new Error("Failed to reject blog");
  return res.json();
};
