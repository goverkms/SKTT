import { getStore } from "@netlify/blobs";

export default async (req) => {
  const store = getStore("visits");
  const current = Number((await store.get("count")) || 0);
  const next = current + 1;
  await store.set("count", String(next));

  return new Response(JSON.stringify({ count: next }), {
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
    },
  });
};

export const config = { path: "/api/visits" };
