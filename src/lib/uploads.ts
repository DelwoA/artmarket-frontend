const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getUploadSignature = async (
  kind: "blogs" | "arts",
  token: string
): Promise<{
  timestamp: number;
  signature: string;
  apiKey: string;
  folder: string;
  cloudName: string;
}> => {
  const folder = kind === "blogs" ? "artmarket/blogs" : "artmarket/arts";
  const res = await fetch(`${BACKEND_URL}/api/uploads/sign`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ folder }),
  });
  if (!res.ok) throw new Error("Failed to get upload signature");
  return res.json();
};
