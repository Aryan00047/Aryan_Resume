import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";

const CONTENT_PATH = "src/data/content.json";
const PUBLIC_DIR = "public";
const MAX_BODY = 25 * 1024 * 1024; // a résumé PDF, base64-encoded, with room to spare

const readBody = (req: IncomingMessage) =>
  new Promise<string>((resolve, reject) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const send = (res: ServerResponse, status: number, payload: unknown) => {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(payload));
};

/**
 * Dev-only backing store for the admin page.
 *
 * `apply: "serve"` keeps this out of production builds entirely — there is no
 * write endpoint on the deployed site, which is the whole point of the
 * local-admin approach. Saving writes straight to the working tree; publishing
 * is a git commit.
 */
export function adminPlugin(): Plugin {
  return {
    name: "portfolio-admin",
    apply: "serve",
    configureServer(server) {
      const root = server.config.root;
      const contentFile = path.resolve(root, CONTENT_PATH);

      server.middlewares.use("/__admin", (req, res) => {
        void (async () => {
          try {
            const url = (req.url ?? "/").split("?")[0];

            if (url === "/content" && req.method === "GET") {
              const json = await readFile(contentFile, "utf8");
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.end(json);
              return;
            }

            if (url === "/content" && req.method === "POST") {
              const body = await readBody(req);
              // Parse before writing so a malformed payload can never corrupt
              // the file the whole site reads from.
              const parsed: unknown = JSON.parse(body);
              await writeFile(contentFile, `${JSON.stringify(parsed, null, 2)}\n`, "utf8");
              send(res, 200, { ok: true, path: CONTENT_PATH });
              return;
            }

            if (url === "/resume" && req.method === "POST") {
              const body = await readBody(req);
              const { filename, data } = JSON.parse(body) as {
                filename?: string;
                data?: string;
              };

              if (!data) {
                send(res, 400, { ok: false, error: "No file data received." });
                return;
              }

              // basename() strips any path the browser reported, so a crafted
              // filename cannot escape public/.
              const safeName = path.basename(filename ?? "resume.pdf");
              if (!safeName.toLowerCase().endsWith(".pdf")) {
                send(res, 400, { ok: false, error: "Résumé must be a PDF." });
                return;
              }

              const target = path.resolve(root, PUBLIC_DIR, safeName);
              const publicRoot = path.resolve(root, PUBLIC_DIR);
              if (target !== publicRoot && !target.startsWith(publicRoot + path.sep)) {
                send(res, 400, { ok: false, error: "Invalid destination." });
                return;
              }

              await writeFile(target, Buffer.from(data.split(",").pop() ?? "", "base64"));
              send(res, 200, { ok: true, path: `/${safeName}` });
              return;
            }

            send(res, 404, { ok: false, error: "Unknown admin route." });
          } catch (error) {
            send(res, 500, {
              ok: false,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        })();
      });
    },
  };
}
