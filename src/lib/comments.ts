// Backend server URL obtained from environment variable
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export type AuthorRole = "User" | "Admin";

export type CreateCommentPayload = {
  comment: string;
  authorId: string;
  authorUsername: string;
  authorDisplayName: string;
  authorImage: string;
  authorRole: AuthorRole;
};

export type UpdateCommentPayload = {
  comment: string;
};

// Get all comments for a specific art
export const getCommentsByArtId = async (artId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}/comments`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch comments for art");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments for art:", error);
    throw error;
  }
};

// Optionally fetch a single comment by its id (direct comment route)
export const getCommentById = async (commentId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/comments/${commentId}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch comment");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching comment:", error);
    throw error;
  }
};

// Create a new comment on an art
export const createComment = async (
  artId: string,
  commentData: CreateCommentPayload,
  token?: string
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/arts/${artId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(commentData),
    });
    if (!res.ok) {
      throw new Error("Failed to create comment");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Update an existing comment on an art
export const updateComment = async (
  artId: string,
  commentId: string,
  commentData: UpdateCommentPayload,
  token?: string
) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/arts/${artId}/comments/${commentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(commentData),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to update comment");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// Delete a comment from an art
export const deleteComment = async (
  artId: string,
  commentId: string,
  token?: string
) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/arts/${artId}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to delete comment");
    }
    return true;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
