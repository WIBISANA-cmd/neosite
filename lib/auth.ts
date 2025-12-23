import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";
export const SESSION_COOKIE = "neosite_session";
export const SESSION_ACTIVITY_COOKIE = "neosite_session_last_active";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 2; // 2 hour session window
export const SESSION_IDLE_TIMEOUT_MS = SESSION_MAX_AGE_SECONDS * 1000;

export type AuthToken = {
  sub: number;
  email: string;
  name?: string | null;
};

const getSecretKey = () => new TextEncoder().encode(AUTH_SECRET);

export async function signAuthToken(payload: AuthToken) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifyAuthToken(token: string): Promise<AuthToken | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey());
    return payload as AuthToken;
  } catch {
    return null;
  }
}
