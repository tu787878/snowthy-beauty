import { cookies } from "next/headers";

const COOKIE_NAME = "snowthy-admin";
const MAX_AGE = 60 * 60 * 8;

type AdminEnvironment = {
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
};

async function credentials() {
  const { env } = await import("cloudflare:workers");
  const runtime = env as unknown as AdminEnvironment;
  return {
    username: runtime.ADMIN_USERNAME || "",
    password: runtime.ADMIN_PASSWORD || "",
    secret: runtime.ADMIN_SESSION_SECRET || "",
  };
}

function equal(a: string, b: string) {
  const left = new TextEncoder().encode(a);
  const right = new TextEncoder().encode(b);
  let mismatch = left.length ^ right.length;
  for (let index = 0; index < Math.max(left.length, right.length); index++) {
    mismatch |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return mismatch === 0;
}

async function signature(value: string) {
  const { secret } = await credentials();
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signed = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signed), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function validLogin(username: string, password: string) {
  const expected = await credentials();
  return Boolean(expected.username && expected.password && expected.secret)
    && equal(username, expected.username)
    && equal(password, expected.password);
}

export async function createSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const payload = String(expires);
  return `${payload}.${await signature(payload)}`;
}

export async function isAdmin() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  const [expires, suppliedSignature] = token.split(".");
  if (!expires || !suppliedSignature || Number(expires) < Date.now() / 1000) return false;
  return equal(suppliedSignature, await signature(expires));
}

export const adminCookie = { name: COOKIE_NAME, maxAge: MAX_AGE };
