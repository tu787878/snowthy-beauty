import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://snowthy-beauty.de/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Snowthy Beauty homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="de">/i);
  assert.match(html, /<title>Snowthy Beauty \| Maniküre, Wimpern &amp; Pediküre<\/title>/i);
  assert.match(html, /Deine Auszeit\./);
  assert.match(html, /Wunschtermin anfragen/);
  assert.match(html, /id="leistungen"/);
  assert.match(html, /id="termin"/);
  assert.doesNotMatch(html, /chatgpt\.site|codex-preview|Building your site/i);
});

test("uses an independent Cloudflare Workers configuration", async () => {
  const [wranglerConfig, viteConfig, packageJson] = await Promise.all([
    readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const wrangler = JSON.parse(wranglerConfig);
  assert.equal(wrangler.name, "snowthy-beauty");
  assert.equal(wrangler.main, "./worker/index.ts");
  assert.equal(wrangler.assets.binding, "ASSETS");
  assert.equal(wrangler.images.binding, "IMAGES");
  assert.match(viteConfig, /@cloudflare\/vite-plugin/);
  assert.doesNotMatch(viteConfig, /hostingConfig|sites\(\)|sites-vite-plugin/);
  assert.match(packageJson, /"deploy": "vinext deploy --name snowthy-beauty"/);
});
