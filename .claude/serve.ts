// Minimal static server for previewing the rendered _site folder locally.
// (quarto preview trips over Dropbox file locks, so we serve the built output.)
const root = new URL("../_site/", import.meta.url);
const types: Record<string, string> = {
  html: "text/html; charset=utf-8", css: "text/css", js: "text/javascript",
  json: "application/json", svg: "image/svg+xml", png: "image/png",
  jpg: "image/jpeg", jpeg: "image/jpeg", woff: "font/woff", woff2: "font/woff2",
  pdf: "application/pdf", xml: "application/xml",
};
Deno.serve({ port: 4321 }, async (req) => {
  let path = decodeURIComponent(new URL(req.url).pathname).replace(/^\/+/, "");
  if (path === "" || path.endsWith("/")) path += "index.html";
  try {
    const body = await Deno.readFile(new URL(path, root));
    const ext = path.split(".").pop()!.toLowerCase();
    return new Response(body, { headers: { "content-type": types[ext] ?? "application/octet-stream" } });
  } catch {
    return new Response("Not found", { status: 404 });
  }
});
