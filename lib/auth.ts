import { SignJWT, jwtVerify } from "jose";

const AUTH_SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";
export const SESSION_COOKIE = "neosite_session";

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
    .setExpirationTime("7d")
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
